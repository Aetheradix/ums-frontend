import PubSubService from '../pub-sub';

const titles: Record<number, Api.EventMessage> = {
  404: { title: 'Not Found', messages: ['The API url is invalid.'] },
  400: { title: 'Bad Request', messages: [''] },
  401: {
    title: 'Login Required',
    messages: ['You must log in'],
    requiresLogin: true,
  },
  403: {
    title: 'Access Denied',
    messages: ['You cannot access this resource.'],
  },
  409: { title: 'Conflict', messages: ['A conflict occurred.'] },
  500: {
    title: 'Server Issue',
    messages: ['There seems to be a server issue.'],
  },
  503: {
    title: 'API Service Unavailable',
    messages: ['API service seems to be not available.'],
  },
};

function getValidationErrors(errors: Api.TypedValidationError[]) {
  return {
    title: 'Validation problem',
    errors: errors.map(e => ({
      field: e.identifier,
      text: e.errorMessage,
    })),
  };
}

function getUnknowError(status: number): Api.EventMessage {
  const message = titles[status];

  return message ?? { title: 'Unknown error', messages: [] };
}

export async function handleNotOkResponse(response: Response) {
  if (response.headers.get('content-length') === '0') {
    PubSubService.publish('@event/api-not-ok', getUnknowError(response.status));
    return;
  }

  const json = await response.json();
  if (!json) {
    return;
  }

  const typedJson = json as Api.TypedError;

  if (!typedJson.code) {
    PubSubService.publish('@event/api-error', json as string);
    return typedJson;
  }

  if (typedJson.code === 'validation_failure') {
    const errors = getValidationErrors(typedJson.errors!);
    PubSubService.publish('@event/api-validation-error', errors.errors);
    return typedJson;
  }

  if (typedJson.code === 'unauthorized') {
    PubSubService.publish('@event/api-unauthorized', typedJson.detail);
    return typedJson;
  }

  if (typedJson.code === 'conflict') {
    PubSubService.publish(
      '@event/api-error',
      typedJson.detail || 'A conflict occurred.'
    );
    return typedJson;
  }

  PubSubService.publish(
    '@event/api-error',
    typedJson.detail || typedJson.title || 'An error occurred.'
  );
}

export async function handleError(error: string) {
  PubSubService.publish('@event/api-not-ok', {
    title: 'Unknown error',
    messages: [error],
  });
}

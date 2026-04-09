import { handleError, handleNotOkResponse } from './handle-error';

let apiRoot: string | undefined = undefined;

function setApiRoot(value: string) {
  apiRoot = value;
}

async function get<T>(url: string) {
  return await request<T>('get', url);
}

async function getList<T>(url: string): Promise<T[]> {
  return request<T>('get', url).then(result => (result?.data as T[]) ?? []);
}

async function post<T>(url: string, body: unknown) {
  return await request<T>('post', url, body);
}

async function put<T>(url: string, body: unknown) {
  return await request<T>('put', url, body);
}

async function del<T>(url: string) {
  return await request<T>('delete', url);
}
async function patch<T>(url: string, body: unknown) {
  return await request<T>('patch', url, body);
}

async function putFormData<T>(url: string, formData: FormData) {
  return await requestFormData<T>('put', url, formData);
}

async function postFormData<T>(url: string, formData: FormData) {
  return await requestFormData<T>('post', url, formData);
}

async function patchFormData<T>(url: string, formData: FormData) {
  return await requestFormData<T>('patch', url, formData);
}

async function requestFormData<T>(
  method: string,
  url: string,
  formData: FormData
): Promise<Api.ApiResult<T>> {
  if (!apiRoot) {
    throw Error('Api Root not available.');
  }

  try {
    const response = await fetch(`${apiRoot}${url}`, {
      method: method,
      body: formData,
      credentials: 'include',
      headers: {
        Origin: window.location.host,
      },
    });

    if (!response.ok) {
      await handleNotOkResponse(response);
      const apiResult: Api.ApiResult<T> = {
        error: true,
      };

      return apiResult;
    }

    const result = await getJsonOrUndefined<T>(response);
    return { error: false, data: result };
  } catch (error) {
    handleError(error instanceof Error ? error.message : String(error));
    return { error: true };
  }
}

async function request<T>(
  method: string,
  url: string,
  body?: unknown
): Promise<Api.ApiResult<T>> {
  if (!apiRoot) {
    throw Error('Api Root not available.');
  }

  try {
    const response = await fetch(`${apiRoot}${url}`, {
      method: method,
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include',
      headers: {
        Origin: window.location.host,
        'Content-Type': 'application/json; charset=utf-8',
      },
    });

    if (!response.ok) {
      await handleNotOkResponse(response);
      const apiResult: Api.ApiResult<T> = {
        error: true,
      };

      return apiResult;
    }

    const result = await getJsonOrUndefined<T>(response);
    return { error: false, data: result };
  } catch (error) {
    handleError(error instanceof Error ? error.message : String(error));
    return { error: true };
  }
}

async function getJsonOrUndefined<T>(response: Response) {
  try {
    const result = await response.json();
    return result as T;
  } catch {
    return undefined;
  }
}

function getApiRoot() {
  return apiRoot;
}

async function getFile(url: string, body?: unknown) {
  if (!apiRoot) {
    throw Error('Api Root not available.');
  }

  try {
    const method = body ? 'post' : 'get';
    const headers: HeadersInit = {
      Origin: window.location.host,
      ...(body ? { 'Content-Type': 'application/json; charset=utf-8' } : {}),
    };

    const response = await fetch(`${apiRoot}${url}`, {
      method: method,
      credentials: 'include',
      headers: headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      await handleNotOkResponse(response);
      const apiResult: Api.ApiResult<Blob> = {
        error: true,
      };

      return apiResult;
    }

    const result = await response.blob();
    return { error: false, data: result };
  } catch (error) {
    handleError(error instanceof Error ? error.message : String(error));
    return { error: true };
  }
}

export default {
  get,
  getList,
  post,
  put,
  del,
  patch,
  putFormData,
  postFormData,
  patchFormData,
  getFile,
  setApiRoot,
  getApiRoot,
};

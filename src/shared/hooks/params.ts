import { useParams } from 'react-router';

export function useParamsId(key: string = 'id') {
  const { [key]: id } = useParams<{ [key: string]: string }>();
  if (key == 'id') return id ? id : '';
  else return id ? parseInt(id, 10) : 0;
}

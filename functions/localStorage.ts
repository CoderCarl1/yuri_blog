export function set_LocalStorage(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function get_LocalStorage(key: string) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

export async function fetchJson<Value>(path: string): Promise<Value> {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`request to ${path} failed with status ${response.status}`);
  }
  return response.json() as Promise<Value>;
}

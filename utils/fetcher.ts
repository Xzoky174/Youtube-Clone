export const fetcher = (route: string) =>
  fetch(route).then((res) => res.json());

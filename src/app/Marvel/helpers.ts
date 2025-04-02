const fetchMarvel = (url: string) => fetch(url).then((res) => res.json());

export { fetchMarvel };
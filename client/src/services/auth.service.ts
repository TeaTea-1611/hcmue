export const storeLocalStorageToken = (token: string) => {
  localStorage.setItem("authorization", token);
};

export const deleteLocalStorageToken = (): void => {
  return localStorage.removeItem("authorization");
};

export const getLocalStorageToken = (): string | null => {
  return localStorage.getItem("authorization") || null;
};

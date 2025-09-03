import { useAuth } from "../context/AuthContext";

export function useApi() {
  const { accessToken, refreshToken } = useAuth();

  async function fetchWithAuth(url, options = {}) {
    let res = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${accessToken}`
      },
      credentials: "include"
    });

    if (res.status === 401) {
      await refreshToken();
      res = await fetch(url, {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${accessToken}`
        },
        credentials: "include"
      });
    }

    return res;
  }

  return { fetchWithAuth };
}

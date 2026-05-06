const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    if (response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("accessToken");
      localStorage.removeItem("tokenType");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }

  return data as T;
}

export const apiTenantService = {
  get: async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
    console.log("url==========================", BASE_URL);
    // const url = new URL(`${endpoint}`);
    // if (options.params) {
    //   Object.keys(options.params).forEach((key) =>
    //     url.searchParams.append(key, options.params![key]),
    //   );
    // }
    console.log("url================baseurl+endpoint==========", `${BASE_URL}${endpoint}`);
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...apiTenantService.getHeaders(),
        ...options.headers,
      },
    });
    return handleResponse<T>(response);
  },

  post: async <T>(
    endpoint: string,
    body: any,
    options: RequestOptions = {},
  ): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...apiTenantService.getHeaders(),
        ...options.headers,
      },
      body: JSON.stringify(body),
      ...options,
    });
    return handleResponse<T>(response);
  },

  put: async <T>(
    endpoint: string,
    body: any,
    options: RequestOptions = {},
  ): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...apiTenantService.getHeaders(),
        ...options.headers,
      },
      body: JSON.stringify(body),
      ...options,
    });
    return handleResponse<T>(response);
  },

  patch: async <T>(
    endpoint: string,
    body: any,
    options: RequestOptions = {},
  ): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...apiTenantService.getHeaders(),
        ...options.headers,
      },
      body: JSON.stringify(body),
      ...options,
    });
    return handleResponse<T>(response);
  },

  delete: async <T>(
    endpoint: string,
    options: RequestOptions = {},
  ): Promise<T> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        ...apiTenantService.getHeaders(),
        ...options.headers,
      },
      ...options,
    });
    return handleResponse<T>(response);
  },

  getHeaders: (): HeadersInit => {
    const token = localStorage.getItem("accessToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
};

export const apiOutletService = {

  get: async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
    console.log("url==========================", BASE_URL);
    // const url = new URL(`${endpoint}`);
    // if (options.params) {
    //   Object.keys(options.params).forEach((key) =>
    //     url.searchParams.append(key, options.params![key]),
    //   );
    // }
    console.log("url================baseurl+endpoint==========", `${BASE_URL}${endpoint}`);
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...apiOutletService.getHeaders(),
        ...options.headers,
      },
    });
    return handleResponse<T>(response);
  },

  getHeaders: (): HeadersInit => {
    const token = localStorage.getItem("accessToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  },

};


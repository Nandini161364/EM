import authStore from "../stores/authstore";

const API_BASE_URL = "http://127.0.0.1:8000";

const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authStore.accessToken}`,
});

export const apiUrl = (path: string) => `${API_BASE_URL}${path}`;

export const authenticatedFetch = async (
    url: string,
    options: RequestInit = {},
) => {
    const makeRequest = () => fetch(url, {
        ...options,
        headers: {
            ...getAuthHeaders(),
            ...options.headers,
        },
    });

    let response = await makeRequest();

    if (response.status !== 401) {
        return response;
    }

    const refreshed = await authStore.refreshAccessToken();

    if (!refreshed) {
        throw new Error("Session expired. Please login again.");
    }

    response = await makeRequest();
    return response;
};

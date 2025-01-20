const BASE_URL = 'http://localhost:5296/api/movies';


const apiRequest = async (endpoint, method = 'GET', body = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  // ***In case token authentication required in future***

  // const token = localStorage.getItem('token');
  // if (token) {
  //   headers['Authorization'] = `Bearer ${token}`;
  // }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Request failed');
    }

    return await response.json();
  } catch (error) {
    console.error(`API Request Error: ${error.message}`);
    throw error;
  }
};

export default {
  get: (endpoint) => apiRequest(endpoint, 'GET'),
  post: (endpoint, body) => apiRequest(endpoint, 'POST', body),
};

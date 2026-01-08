export const getProducts = async () => {
  return axios.get(import.meta.env.VITE_API_URL + "/products");
};

export const getProductById = (id) => {
  return axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
};

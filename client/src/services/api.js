export const getProducts = async () => {
  return axios.get("http://localhost:5000/products");
};

export const getProductById = (id) => {
  return axios.get(`http://localhost:5000/products/${id}`);
};

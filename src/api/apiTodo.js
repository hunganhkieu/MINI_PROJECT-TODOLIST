import api from ".";

const URL = "https://api-class-o1lo.onrender.com/api/anhkh/todos";

export const createTodo = async (formData) => {
  const { data } = await api.post(URL, formData);
  return data;
};

export const getTodoId = async (id) => {
  const { data } = await api.get(`${URL}/${id}`);
  return data;
};
export const updateTodo = async (id, formData) => {
  const { data } = await api.put(`${URL}/${id}`, formData);
  return data;
};
export const deleteTodo = async (id) => {
  const { data } = await api.delete(`${URL}/${id}`);
  return data;
};

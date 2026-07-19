
import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/tasks`;

export const getAllTasks = () => axios.get(API);

export const createTask = (task) => {
    return axios.post(API, task);
};

export const deleteTask = (id) => {
    return axios.delete(`${API}/${id}`);
};

export const updateTask = (id, task) => {
    return axios.put(`${API}/${id}`, task);
};

export const getTaskById = (id) => {
    return axios.get(`${API}/${id}`);
};
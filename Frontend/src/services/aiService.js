import axios from "axios";

const AI_API = `${import.meta.env.VITE_API_URL}/ai`;

export const generateSuggestion = () => {
    return axios.post(`${AI_API}/suggest`);
};

export const chatWithAI = (question) => {
    return axios.post(`${AI_API}/chat`, {
        question: question
    });
};
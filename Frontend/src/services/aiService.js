import axios from "axios";

const AI_API = "http://deadline-rescue-ps8b.onrender.com/ai";

export const generateSuggestion = () => {
    return axios.post(`${AI_API}/suggest`);
};

export const chatWithAI = (question) => {
    return axios.post(`${AI_API}/chat`, {
        question: question
    });
};
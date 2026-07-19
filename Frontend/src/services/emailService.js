import axios from "axios";

const API =`${import.meta.env.VITE_API_URL}/email`;

export const sendReminder = (id, email) => {

    return axios.post(

        `${API}/send/${id}?email=${email}`

    );

};
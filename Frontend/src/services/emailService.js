import axios from "axios";

const API = "http://deadline-rescue-ps8b.onrender.com/email";

export const sendReminder = (id, email) => {

    return axios.post(

        `${API}/send/${id}?email=${email}`

    );

};
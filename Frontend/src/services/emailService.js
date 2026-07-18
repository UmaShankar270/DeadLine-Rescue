import axios from "axios";

const API = "http://localhost:8080/email";

export const sendReminder = (id, email) => {

    return axios.post(

        `${API}/send/${id}?email=${email}`

    );

};
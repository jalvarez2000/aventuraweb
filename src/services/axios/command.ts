import axios from "axios";
import { auth } from "../../config/firebase";

const sendCommandPost = async (url: string, action: any) => {
    var data = null;
    var error = "";
    var loaded = false;
    const user = auth.currentUser;
    const token = user && (await user.getIdToken());

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }

    const commandRequest = {
        gameId: '6VgFHH0eftew5fVtqPQx',
        inputText: action
    }

    axios
        .post("http://127.0.0.1:8080/nlp/process", commandRequest, { headers })
        .then((response) => {
            console.log(response);
            data = response.data;
            loaded = true;
        })
        .catch((err) => {
            console.log(err);
            error = err;
            loaded = true;
        })


    return { data, error, loaded };
};

export default sendCommandPost;
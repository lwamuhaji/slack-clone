import axios from "axios";

const fetcher = (url: string) => {
    console.log(url);
    return axios.get(url, {withCredentials: true}).then((response) => response.data);
}

export default fetcher;
import axios from "axios";
export const API_URL = "http://13.125.120.108:8080/";

export async function fetchData(uri) {
    try {
        console.log("GET");
        const response = await axios.get(API_URL + uri);
        console.log("Okay");
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching data", error);
        return null;
    }
}

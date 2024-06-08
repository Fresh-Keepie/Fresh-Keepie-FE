import axios from "axios";
//import React, { useState, useEffect } from "react";
export const API_URL =
    "http://fresh-keepie-env.eba-kygb2spd.ap-northeast-2.elasticbeanstalk.com/";

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

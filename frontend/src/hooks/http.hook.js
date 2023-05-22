import { useState } from "react";

export const useHttp = () => {
    const [error, setError] = useState(null);

    const request = async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

        try {
            const response = await fetch(url, {method, body, headers});

            if(!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            return data;

        } catch (e) {
            setError(e.message);
            throw e;
        }
    }

    const clearError = () => setError(null);

    return {request, error, clearError};
}
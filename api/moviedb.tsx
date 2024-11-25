import { API_KEY, API_BASE_URL, API_HOST } from '@env';
import axios from 'axios';

const apiBaseUrl = `${API_BASE_URL}`;


const apiCall = async (endpoint: string, params: any) => {
    const requestUrl = `${apiBaseUrl}${endpoint}`;
    console.log('Full API Call URL:', requestUrl);

    const options = {
        method: 'GET',
        url: requestUrl,
        headers: {
            'x-rapidapi-key': `${API_KEY}`,
            'x-rapidapi-host': `${API_HOST}`,
        }
    }

    try {
        const response = await axios.request(options);
        console.log('API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
}

export const fetchUpcomingMovies = async () => {
    return apiCall('/getUpcomingMovies', {});
}

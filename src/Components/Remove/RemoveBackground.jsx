import axios from 'axios';

const removeBackground = async (imageUrl) => {
    const apiKey = 'WqEpN63ty6EwJqx5cKZ2jYHU';
    const formData = new FormData();
    formData.append('image_url', imageUrl);
    formData.append('size', 'auto');

    try {
        const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
            headers: {
                'X-Api-Key': apiKey,
            },
            responseType: 'blob',
        });

        const blob = response.data;
        const url = URL.createObjectURL(blob);
        return url;
    } catch (error) {
        console.error('Error removing background:', error);
        return imageUrl;
    }
};

export default removeBackground;
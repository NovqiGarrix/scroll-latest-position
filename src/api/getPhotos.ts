import { IResponse } from "../types";
import { PEXELS_API_KEY } from "../constant";

export default async function getPhotos(): Promise<IResponse> {

    if (!PEXELS_API_KEY) throw new Error('Missing PEXELS_API_KEY from .env file. Please add it and try again.');

    const url = new URL('https://api.pexels.com/v1/search?query=nature');
    url.searchParams.append('per_page', '18');
    url.searchParams.append('orientation', 'landscape');

    const resp = await fetch(url, {
        headers: {
            "Authorization": PEXELS_API_KEY,
            "Content-Type": "application/json"
        },
    });

    const data = await resp.json();
    return data


}
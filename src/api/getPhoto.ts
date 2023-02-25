import { Photo } from "../types";
import { PEXELS_API_KEY } from "../constant";

export default async function getPhoto(id: string): Promise<Photo> {

    if (!PEXELS_API_KEY) throw new Error('Missing PEXELS_API_KEY from .env file. Please add it and try again.');

    const resp = await fetch(`https://api.pexels.com/v1/photos/${id}`, {
        headers: {
            "Authorization": PEXELS_API_KEY,
            "Content-Type": "application/json",
        }
    });

    const data = await resp.json();
    return data;

}
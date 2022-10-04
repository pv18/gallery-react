import {Photo} from '../types/shared';

const API_URL = 'https://jsonplaceholder.typicode.com'

export const getPhotos = ():Promise<Photo[]> => {
    return fetch( API_URL + '/photos')
        .then(response => response.json())
}
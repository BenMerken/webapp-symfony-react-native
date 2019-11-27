import {handleResponse, handleError} from "./apiUtils";

const baseUrl = 'http://192.168.33.22/rooms/';

export const getRooms = () => fetch(baseUrl).then(handleResponse).catch(handleError);

import sendRequest from "./send-request";
const BASE_URL = '/api/notes';

export async function createNote(userData) {
  return sendRequest(BASE_URL, 'POST', userData);

}
export async function getAll() {
    return sendRequest(BASE_URL)
}
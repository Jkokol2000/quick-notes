import sendRequest from "./send-request";
const BASE_URL = '/api/notes';

export async function createNote(userData) {
  return sendRequest(BASE_URL, 'POST', userData);

}
export async function getAll() {
    return sendRequest(BASE_URL)
}

export async function deleteNote(note) {
    console.log(note)
    return sendRequest(`${BASE_URL}/${note}`, 'DELETE')
}
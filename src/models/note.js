const url = `${process.env.REACT_APP_API}/notes`
const token = localStorage.getItem('token');

class NoteModel {
  static getAllNotes = () => {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token,
      }
    })
      .then((response) => response.json())
  }

  static getNoteById = (noteId) => {
    return fetch(`${url}/${noteId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token,
      }
    })
      .then((response) => response.json())
  }

  static createNote = (note) => {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token,
      },
      body: JSON.stringify(note)
    })
      .then((response) => response.json())
  }

  static updateNote = (note) => {
    return fetch(`${url}/${note._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token,
      },
      body: JSON.stringify(note)
    })
      .then((response) => response.json())
  }

  static deleteNote = (note) => {
    return fetch(`${url}/${note._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token,
      }
    })
      .then((response) => response.json())
  }

}



export default NoteModel


import { useState } from "react"
import NotesCotext from "./notesContext"
import { confirmAlert } from 'react-confirm-alert';
const NotesState = (props) => {
  const noteInitial = []
  const host = "http://localhost:5000"
  const [Notes, setNotes] = useState(noteInitial)

  // =============================================
  // ========Get All Notes Method=================
  // =============================================
  const GetAllNOtes = async () => {
    const response = await fetch(`${host}/notes/fetchalldata`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });

    const jsonData = await response.json();
    setNotes(jsonData)
  }
  // =============================================
  // ========Add Notes Method=====================
  // =============================================
  const addNotes = async ({ title, description, tag }) => {

    const response = await fetch(`${host}/notes/add_note`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    setNotes(Notes.concat(note))
  }



  // =============================================
  // ========Delete Notes Method==================
  // =============================================
  const DeleteNotes = async (id) => {
    const response = await fetch(`${host}/notes/delete/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const jsonData = await response.json();
    console.log(jsonData)
    console.log(response)

    const newNotes = Notes.filter((data) => { return data._id !== id })
    setNotes(newNotes)
  }



  // =============================================
  // ========Edit Notes Method====================
  // =============================================
  const EditNotes = async (id, title, description, tag) => {
    const response = await fetch(`${host}/notes/update/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
    });
    const jsonData = await response.json();
    console.log(jsonData)
    // client side code for edit data===========
    const newNotes = JSON.parse(JSON.stringify(Notes))
    for (let index = 0; index < Notes.length; index++) {
      const element = Notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    console.log(newNotes)
    setNotes(newNotes)
  }
  return (
    <NotesCotext.Provider value={{ Notes, addNotes, DeleteNotes, EditNotes, GetAllNOtes }}>
      {props.children}
    </NotesCotext.Provider>
  )
}
export default NotesState
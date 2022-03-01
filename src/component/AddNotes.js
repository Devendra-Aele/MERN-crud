import React, { useContext, useState } from "react";
import NotesCotext from "../ContextApi/Notes/notesContext";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
function AddNotes(props) {
    const context = useContext(NotesCotext)
    const { addNotes } = context

    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handlerclick = async (e) => {
        e.preventDefault()
        addNotes(note)
        setNote({ title: "", description: "", tag: "" })
        await toast.success("New Notes Is Added Succesfully🧑");
    }
    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <div className='NotesForm my-5 '>
                <h2 className='text-center my-3  fs-1'>Your Notes</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title"  value={note.title}aria-describedby="emailHelp" onChange={onchange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description"  value={note.description}onChange={onchange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag"  value={note.tag}onChange={onchange} />
                    </div>
                    <button disabled={note.title.length<5 || note.description.length<5 ||note.tag.length<3} type="submit" className="btn btn-primary mb-3 " onClick={handlerclick}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddNotes
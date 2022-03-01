import React, { useContext } from 'react'
import NotesCotext from '../ContextApi/Notes/notesContext';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
function NotesItem(props) {
    const { note, UpdateNotes } = props;
    const context = useContext(NotesCotext)
    const { DeleteNotes } = context

    const CDELETE = () => {
        confirmAlert({
            title: 'Are you sure ?',
            message: 'Do you Want To Delete this Note ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        await toast.success(" Note Is Delete Succesfully🚮");
                        DeleteNotes(note._id)
                    },
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    }

    return (
        <div className='col-md-4 my-2 Note_card'>
            <div className="card" >
                <div className="card-body">
                    {/* translate-middle */}
                    <span className="position-absolute top-0 end-0 translate-end  badge p-2 bg-primary">
                        {note.tag}
                        <span className="visually-hidden">unread messages</span>
                    </span>
                    <h5 className="card-title title my-2"> {note.title}</h5>
                    <p className="card-text description"> {note.description}</p>
                    {/* <h5 className="card-title tag">{note.tag}</h5> */}
                    <div className='I_btn '>
                        <i className="fa-regular fa-pen-to-square " onClick={() => { UpdateNotes(note) }}></i>
                        <i className="fa-solid fa-trash " onClick={() => { CDELETE() }}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotesItem
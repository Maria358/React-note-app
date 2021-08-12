import {useContext, useState} from "react";
import {FirebaseContext} from "../context/firebase/firebaseContext";

export const Notes = ({notes, onRemove}) => {
    const [editMode, setEditMode] = useState([])
    const [value, setValue] = useState('')
    const firebase = useContext(FirebaseContext)

    const onSave = (id) => {
        firebase.updateNote(value, id).then(() => {

            console.log(value, id)
        })
        setEditMode(false)
    }
    const onMark = (id) => {
        console.log('in onMark', id)
        firebase.markNote(id)
    }
    const onNoMark = (id) => {
        console.log('in onNoMark', id)
        firebase.noMarkNote(id)
    }
    const onCancel = (id) => {
        setEditMode(false)
    }
    return (
        <>
            <ul className="list-group">
                {notes.map((note) => (
                    <li
                        className="list-group-item note"
                        key={note.id}
                    >
                        {!note.editMode
                            ? <div className="note-info">
                                <strong className="note-title">{note.title}</strong>
                                <small className="note-date">{note.date}</small>

                                <div className="note-btn">

                                    <button className="btn btn-success btn-sm rounded-0"
                                            type="button"
                                            onClick={() =>  onMark(note.id)}
                                            onDoubleClick={() => onNoMark(note.id)}
                                    >&#10003;
                                    </button>
                                    <button className="btn btn-primary btn-sm rounded-0"
                                            type="button"
                                            onClick={() => {
                                                setEditMode(note.id)
                                                note.editMode = !note.editMode
                                            }}
                                    >Edit
                                    </button>
                                    <button className="btn btn-danger btn-sm rounded-0"
                                            type="button"
                                            onClick={() => onRemove(note.id)}
                                    >&times;
                                    </button>
                                </div>
                            </div>
                            : <div>
                                <input type="text"
                                       className="form-control editInput"
                                       placeholder="Task"
                                       value={value}
                                       onChange={(event) => {
                                           setValue(event.target.value);
                                       }}
                                />
                                <button onClick={() => {onSave(note.id); note.editMode = !note.editMode}} className="btn btn-primary">Save</button>
                                <button onClick={() => {onCancel(note.id); note.editMode = !note.editMode}} className="btn btn-danger">Cancel</button>
                            </div>
                        }
                    </li>
                ))}
            </ul>
            <br/>
        </>
    )
}

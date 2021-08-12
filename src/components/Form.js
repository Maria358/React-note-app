import {useContext, useState} from "react";
import {AlertContext} from "../context/alert/alertContext";
import {FirebaseContext} from "../context/firebase/firebaseContext";

export const Form = () => {
    const [value, setValue] = useState('')
    const alert = useContext(AlertContext)
    const firebase = useContext(FirebaseContext)

    const submitHandler = (event) => {
        event.preventDefault()
        if(value.trim()){
            firebase.addNote(value.trim()).then( () => {
                alert.show('Note was created successfully','success')
            }).catch(() => {
                alert.show('Something went wrong','danger')
            })
            setValue('')
        }else{
            alert.show("Input name of note")
        }


    }
    return (
        <div className="form-group">
            <form onSubmit={submitHandler}>
                <div className="input-form">
                    <input type="text" className="form-control input"
                           placeholder="Input your task"
                           value={value}
                           onChange={e => setValue(e.target.value)} />
                </div>
            </form>
        </div>
    )
}
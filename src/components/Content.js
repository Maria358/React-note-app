import {Form} from "./Form";
import {Loader} from "./Loader";
import {Notes} from "../notes/Notes";
import {useContext} from "react";
import {FirebaseContext} from "../context/firebase/firebaseContext";

export const Content = () => {
    const {loading, notes, removeNote} = useContext(FirebaseContext)

    return (
        <div>
            <Form/>
            <hr/>
            {
                loading ? <Loader/> : <Notes notes={notes} onRemove={removeNote}/>
            }
        </div>
    )
}
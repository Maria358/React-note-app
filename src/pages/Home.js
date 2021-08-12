import {useContext, useEffect} from "react";
import {FirebaseContext} from "../context/firebase/firebaseContext";
import {Content} from "../components/Content";

export const Home = () => {
    const {fetchNotes} = useContext(FirebaseContext)
    const firebase = useContext(FirebaseContext)

    useEffect(() => {
        fetchNotes()
        // eslint-disable-next-line
    }, [])
    return(
        <div>
            <Content/>
            <hr/>
        </div>
    )
}
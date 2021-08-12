import {useEffect, useState} from "react";
import axios from "axios";
import {Notes} from "../notes/Notes";

const url = process.env.REACT_APP_DB_URL

export const Search = () => {
    const [notes, setNotes] = useState([])
    const [value, setValue] = useState('')

    const getNotes = async () => {
        await axios.get(`${url}/notes.json`).then((response) => {
            console.log(response.data)
            setNotes(response.data)
        })
    }

    useEffect(() => {
        getNotes()
        // eslint-disable-next-line
    }, [])


    const filteredNotes = notes.filter((note) => {
        return note.title.toLowerCase().includes(value.toLowerCase())
    })

    return (
        <form className="d-flex">
            <input className="form-control me-2"
                   type="search" placeholder="Search"
                   aria-label="Search"
                   onChange={(event) => {
                       setValue(event.target.value)
                   }}
            />
            <button className="btn btn-success" type="submit">Search</button>

            {
                filteredNotes.map((notes, index) => {
                    return (
                        <Notes notes={notes} key={index}/>
                    )
                })
            }
        </form>
    )
}
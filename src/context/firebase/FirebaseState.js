import {FirebaseContext} from "./firebaseContext";
import {useReducer} from "react";
import {firebaseReducer} from "./firebaseReducer";
import {FETCH_NOTES, HIDE_LOADER, MARK_NOTE, NO_MARK_NOTE, REMOVE_NOTE, SHOW_LOADER, UPDATE_NOTE} from "../types";
import axios from "axios";

const url = process.env.REACT_APP_DB_URL

export const FirebaseState = ({children}) => {
    const initialState = {
        notes: [],
        completed: false,
        disabled: true,
        userId: null,
        loading: false
    }

    const [state, dispatch] = useReducer(firebaseReducer, initialState)

    const showLoader = () => {
        return dispatch({type: SHOW_LOADER})
    }
    const hideLoader = () => {
        return dispatch({type: HIDE_LOADER})
    }

    const fetchNotes = async () => {
        showLoader()
        const res = await axios.get(`${url}/notes.json`)

        try {
            const payload = Object.keys(res.data).map(key => {
                return {
                    ...res.data[key],
                    id: key
                }
            })
            dispatch({
                type: FETCH_NOTES,
                payload: payload
            })
        } catch {
            hideLoader()
        }
    }
    const addNote = async (title) => {
        const note = {
            title,
            date: new Date().toJSON()
        }
        try {
            const res = await axios.post(`${url}/notes.json`, note)
            const payload = {
                ...note,
                id: res.data.name
            }
        } catch (e) {
            throw new Error(e.message)
        }
        fetchNotes()
    }
    const removeNote = async (id) => {
        const res = await axios.delete(`${url}/notes/${id}.json`)

        dispatch({type: REMOVE_NOTE, payload: id})
    }
    const updateNote = async (title, id) => {
        const payload = {
            id,
            title,
            editMode: false,
            date: new Date().toJSON()
        }
        const res = await axios.put(`${url}/notes/${id}.json`, payload)
        dispatch({type: UPDATE_NOTE, payload: payload})
    }

    const markNote = (id) => {
        console.log('in markNote')
        const payload = {
            id
        }
        dispatch({type: MARK_NOTE, payload: payload})
        fetchNotes()
    }
    const noMarkNote = (id) => {
        console.log('in noMarkNote')
        const payload = {
            id
        }
        dispatch({type: NO_MARK_NOTE, payload: payload})
    }

    return (
        <FirebaseContext.Provider value={{
            addNote, fetchNotes, removeNote, showLoader, updateNote, markNote, noMarkNote,
            loading: state.loading,
            notes: state.notes,
            completed: state.completed,
            userId: state.userId
        }}>
            {children}
        </FirebaseContext.Provider>
    )
}

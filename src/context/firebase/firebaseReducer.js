import {
    ADD_NOTE,
    FETCH_NOTES,
    HIDE_LOADER,
    MARK_NOTE,
    NO_MARK_NOTE,
    REMOVE_NOTE,
    SHOW_LOADER,
    UPDATE_NOTE
} from "../types";

const handlers = {
    [ADD_NOTE]: (state, {payload}) => ({...state, notes: [...state.notes, payload]}),
    [SHOW_LOADER]: state => ({...state, loading: true}),
    [HIDE_LOADER]: state => ({...state, loading: false}),
    [FETCH_NOTES]: (state, {payload}) => ({...state, notes: payload, loading: false}),
    [REMOVE_NOTE]: (state, {payload}) => ({...state, notes: state.notes.filter(note => note.id !== payload)}),
    [UPDATE_NOTE]: (state, {payload}) => ({...state, notes: state.notes.map((note) => {
        if (note.id === payload.id) {
                return {
                    ...note,
                    title: payload.title
                };
            } else {
            return note;
        }})}),
    [NO_MARK_NOTE]: (state, {payload}) => ({...state, notes: state.notes.map((note) => {
            if(note.id === payload.id){
                console.log('no marked')
                return {
                    ...state, completed: false
                }
            } else {
                return note;
            }})}),
    [MARK_NOTE]: (state, {payload}) => ({...state, notes: state.notes.map((note) => {
        if(note.id === payload.id){
            console.log('marked')
            return {
                ...state, completed: true
            }
        } else {
            return note;
        }})}),

    DEFAULT: state => state
}

export const firebaseReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action);
}
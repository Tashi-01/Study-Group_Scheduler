import { createContext, useReducer } from 'react'

export const StudygroupsContext = createContext()

export const studygroupsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_STUDYGROUPS':
            return {
                studygroups: action.payload
            }
        case 'CREATE_STUDYGROUP':
            return {
                studygroups: [action.payload, ...state.studygroups]
            } 
        case 'DELETE_STUDYGROUP':
            return {
                studygroups: state.studygroups.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const StudygroupsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(studygroupsReducer, {
        studygroups: null
    })

    return (
        <StudygroupsContext.Provider value={{...state, dispatch}}>
            { children }
        </StudygroupsContext.Provider>
    )
}
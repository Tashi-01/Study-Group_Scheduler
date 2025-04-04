import { StudygroupsContext } from '../context/StudygroupContext'
import { useContext } from 'react'

export const useStudygroupsContext = () => {
    const context = useContext(StudygroupsContext)

    if (!context) {
        throw Error('useStudygroupsContext must be used inside a StudygroupContextProvider')
    }
    
    return context
}
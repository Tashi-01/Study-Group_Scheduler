import { useState } from "react" 
import { useStudygroupsContext } from '../hooks/useStudygroupsContext'

const StudygroupForm = () => {
    const { dispatch } = useStudygroupsContext()

    const [name, setName] = useState('')
    const [duration, setDuration] = useState('')
    const [size, setSize] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const studygroup = {name, duration, size}

        const response = await fetch('/api/studygroups', {
            method: 'POST',
            body: JSON.stringify(studygroup),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setName('')
            setDuration('')
            setSize('')
            setError(null)
            setEmptyFields([])
            console.log('new studygroup added', json)
            dispatch({type: 'CREATE_STUDYGROUP', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New StudyGroup</h3>

            <label>Studygroup name</label>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className={emptyFields.includes('name') ? 'error' : ''}
            />

            <label>Duration</label>
            <input
                type="number"
                onChange={(e) => setDuration(e.target.value)}
                value={duration}
                className={emptyFields.includes('duration') ? 'error' : ''}
            />

            <label>Size</label>
            <input
                type="number"
                onChange={(e) => setSize(e.target.value)}
                value={size}
                className={emptyFields.includes('size') ? 'error' : ''}
            />    

            <button>Add StudyGroup</button>     
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default StudygroupForm
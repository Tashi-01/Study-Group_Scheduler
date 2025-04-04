import { useEffect } from 'react'
import { useStudygroupsContext } from '../hooks/useStudygroupsContext'

// components
import StudygroupDetails from '../components/StudygroupDetails'
import StudygroupForm from '../components/Studygroupform'

const Home = () => {
    const  { studygroups, dispatch } = useStudygroupsContext()

    useEffect(() => {
        const fetchStudygroups = async () => {
            const response = await fetch('/api/studygroups')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_STUDYGROUPS', payload:json})
            }
        }

        fetchStudygroups()
    }, [dispatch])
    
    return (
        <div className="home">
            <div className="studygroups">
                {studygroups && studygroups.map((studygroup) => (
                    <StudygroupDetails key={studygroup._id} studygroup={studygroup}/>
                ))}
        </div>
        <StudygroupForm />
        </div>
    )
}

export default Home
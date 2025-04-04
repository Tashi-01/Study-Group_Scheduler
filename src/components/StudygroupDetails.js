import { useStudygroupsContext } from '../hooks/useStudygroupsContext';
import { useState } from 'react';

const StudygroupDetails = ({ studygroup }) => {
    const { dispatch } = useStudygroupsContext();
    const [isEditing, setIsEditing] = useState(false);
    const [updatedStudygroup, setUpdatedStudygroup] = useState({
        name: studygroup.name,
        duration: studygroup.duration,
        size: studygroup.size
    });

    const handleDelete = async () => {
        const response = await fetch('/api/studygroups/' + studygroup._id, {
            method: 'DELETE'
        });

        if (response.ok) {
            dispatch({ type: 'DELETE_STUDYGROUP', payload: studygroup });
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedStudygroup({ ...updatedStudygroup, [name]: value });
    };

    const handleUpdate = async () => {
        const response = await fetch(`/api/studygroups/${studygroup._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedStudygroup)
        });

        const data = await response.json();
        if (response.ok) {
            dispatch({ type: 'UPDATE_STUDYGROUP', payload: data });
            setIsEditing(false);
        }
    };

    return (
        <div className="studygroup-details">
            {isEditing ? (
                <div>
                    <input type="text" name="name" value={updatedStudygroup.name} onChange={handleChange} />
                    <input type="number" name="duration" value={updatedStudygroup.duration} onChange={handleChange} />
                    <input type="number" name="size" value={updatedStudygroup.size} onChange={handleChange} />
                    <button onClick={handleUpdate}>Save</button>
                </div>
            ) : (
                <div>
                    <h4>{studygroup.name}</h4>
                    <p><strong>Duration: </strong>{studygroup.duration} hours</p>
                    <p><strong>Size: </strong>{studygroup.size} members</p>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default StudygroupDetails;

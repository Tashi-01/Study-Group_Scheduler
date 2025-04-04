import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';

const Groups = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [groupedDates, setGroupedDates] = useState({});
    const [studyGroups, setStudyGroups] = useState([]);
    const [selectedStudyGroup, setSelectedStudyGroup] = useState('');
    const [error, setError] = useState(null); // State for error message

    // Fetch study groups from backend
    useEffect(() => {
        fetch('/api/studygroups')
            .then(response => response.json())
            .then(data => setStudyGroups(data))
            .catch(error => console.error('Error fetching study groups:', error));
    }, []);

    // Fetch dates and group them by study group
    useEffect(() => {
        fetch('/api/dates')
            .then(response => response.json())
            .then(data => {
                // Ensure all dates are converted into Date objects
                const formattedDates = {};
                Object.keys(data).forEach(studyGroup => {
                    formattedDates[studyGroup] = data[studyGroup].map(dateStr => new Date(dateStr));
                });

                setGroupedDates(formattedDates);
            })
            .catch(error => console.error('Error fetching dates:', error));
    }, []);

    // Handle date selection from the calendar
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    // Add a date to the selected study group
    const handleAddDate = async () => {
        if (!selectedStudyGroup) {
            setError("Please select a study group."); // Set error message
            return;
        }

        setError(null); // Clear error if a study group is selected

        const formattedDate = selectedDate.toISOString();

        try {
            const response = await fetch('/api/dates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ date: formattedDate, studyGroup: selectedStudyGroup }),
            });

            const data = await response.json();
            if (response.ok) {
                setGroupedDates(prev => ({
                    ...prev,
                    [selectedStudyGroup]: [...(prev[selectedStudyGroup] || []), new Date(data.date)]
                }));
            } else {
                setError(data.error || "An error occurred while adding the date.");
            }
        } catch (error) {
            setError("Failed to send date. Please try again.");
        }
    };

    return (
        <div className="groups-container">
            <h2>Group Meeting Scheduler</h2>

            <div className="calendar-section">
                <h3>Select a Study Group</h3>
                <select value={selectedStudyGroup} onChange={(e) => setSelectedStudyGroup(e.target.value)}>
                    <option value="">Select a Study Group</option>
                    {studyGroups.map((group) => (
                        <option key={group._id} value={group.name}>{group.name}</option>
                    ))}
                </select>

                {error && <p className="error-message">{error}</p>} {/* Show error message */}

                <h3>Select a Date for the Meeting</h3>
                <div className="calendar-wrapper">
                    <Calendar onChange={handleDateChange} value={selectedDate} className="custom-calendar" />
                </div>
                <button onClick={handleAddDate}>Add Date</button>
            </div>

            <div className="selected-dates">
                <h3>Study Group Meeting Dates</h3>
                {Object.keys(groupedDates).map((group, index) => (
                    <div key={index} className="group-section">
                        <h4>{group}</h4>
                        <ul>
                            {groupedDates[group].map((date, idx) => (
                                <li key={idx}>{date.toDateString()}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Groups;

const DateModel = require('../models/dateModel');
const Studygroup = require('../models/studygroupModel'); // Import the Studygroup model

// Get all dates grouped by study group
const getDates = async (req, res) => {
    try {
        const dates = await DateModel.find({}).populate('studyGroup').sort({ createdAt: -1 });

        const groupedDates = {};
        dates.forEach(({ date, studyGroup }) => {
            if (!groupedDates[studyGroup.name]) {
                groupedDates[studyGroup.name] = [];
            }
            groupedDates[studyGroup.name].push(date);
        });

        res.status(200).json(groupedDates);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const addDate = async (req, res) => {
    const { date, studyGroup } = req.body;

    if (!studyGroup) {
        return res.status(400).json({ error: 'Study group is required' });
    }

    try {
        // Ensure the studyGroup exists
        const studyGroupObj = await Studygroup.findById(studyGroup);

        if (!studyGroupObj) {
            return res.status(400).json({ error: 'Study group not found' });
        }

        // Proceed to create the date
        let newDate = await DateModel.create({
            date,
            studyGroup: studyGroupObj._id,
        });

        newDate = await newDate.populate('studyGroup');

        res.status(200).json({
            date: newDate.date,
            studyGroup: newDate.studyGroup.name,
            modules: newDate.studyGroup.modules || []
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getDates,
    addDate
};

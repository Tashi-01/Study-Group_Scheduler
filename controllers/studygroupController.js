const Studygroup = require('../models/studygroupModel')
const mongoose = require('mongoose')

// get all studygroups
const getStudygroups = async (req, res) => {
    const user_id = req.user._id

    const studygroups = await Studygroup.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(studygroups)
}

// get a single studygroup
const getStudygroup = async (req, res) => {
    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such studygroup'})
    }

    const studygroup = await Studygroup.findById(id)

    if (!studygroup) {
        return res.status(404).json({error: 'No such studygroup'})
    }

    res.status(200).json(studygroup)
}

// create new studygroup
const createStudygroup = async(req, res) => {
    const {name, duration, size} = req.body
    
        let emptyFields = []

        if(!name) {
            emptyFields.push('name')
        }
        if(!duration) {
            emptyFields.push('duration')
        }
        if(!size) {
            emptyFields.push('size')
        }
        if(emptyFields.length > 0) {
            return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
        }

        // add doc to db 
        try {
            const user_id = req.user._id
            const studygroup = await Studygroup.create({name, duration, size, user_id})
            res.status(200).json(studygroup)
        } catch (error) {
            res.status(400).json({error: error.message})
        }
}

// delete a studygroup
const deleteStudygroup = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such studygroup'})
    }

    const studygroup = await Studygroup.findOneAndDelete({_id: id})

    if (!studygroup) {
        return res.status(404).json({error: 'No such studygroup'})
    }

    res.status(200).json(studygroup)
}

// update a studygroup
const updateStudygroup = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such studygroup'})
    }

    const studygroup = await Studygroup.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!studygroup) {
        return res.status(404).json({error: 'No such studygroup'})
    }

    res.status(200).json(studygroup)

}

module.exports = {
    getStudygroup,
    getStudygroups,
    createStudygroup,
    updateStudygroup,
    deleteStudygroup
}
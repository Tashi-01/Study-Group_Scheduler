const express = require('express')
const {
    getStudygroup,
    getStudygroups,
    createStudygroup,
    updateStudygroup,
    deleteStudygroup
} = require('../controllers/studygroupController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all studygroup routes
router.use(requireAuth)

// GET all studygroups
router.get('/', getStudygroups)

// GET a single studygroup
router.get('/:id', getStudygroup)

// POST a new studygroup
router.post('/', createStudygroup)

// DELETE a new studygroup
router.delete('/:id', deleteStudygroup)

// UPDATE a new studygroup
router.patch('/:id', updateStudygroup)

module.exports = router
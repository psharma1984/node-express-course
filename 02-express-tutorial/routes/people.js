const express = require("express")
const router = express.Router()
const {addPerson, getPeople, getPerson, delPerson} = require('../controllers/people.js')


router.get('/',getPeople)
router.get('/:id',getPerson)
router.post('/',addPerson)
router.delete('/:id',delPerson)

module.exports = router
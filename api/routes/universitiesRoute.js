const { Router } = require('express')
const UniversityController = require('../controllers/UniversityController')

const router = Router()

router.get('/universities', UniversityController.getUniversities)
router.get('/universities/:id', UniversityController.getOne)
router.post('/universities', UniversityController.create)
router.put('/universities/:id', UniversityController.update)
router.delete('/universities/:id', UniversityController.delete)

module.exports = router
const express = require('express')
const { GetCategories, AddCategory, EditCategory, DelCategory } = require('../controllers/categories.controller')
const { isLoggedIn } = require('../middlewares/isLoggedIn')
const { isAdmin } = require('../middlewares/isAdmin')
const router = express.Router()

router.get('/port1', GetCategories)
router.post('/port2', AddCategory)
router.patch('/editcategory/:id', EditCategory)
router.delete('/delcategory/:id', DelCategory)

module.exports = router
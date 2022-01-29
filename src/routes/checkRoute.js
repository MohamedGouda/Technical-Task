const express = require('express')
const checkController = require('../controllers/checkController')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/checks' , auth , checkController.createCheck )

router.post('/checks/Run/:name' , auth ,  checkController.runCheck)

router.get('/checks/:name/report' , auth ,  checkController.checkReport)

router.get('/checks/:tag/groupReport' , auth ,  checkController.checkReportByTag)

router.patch('/checks/:name' , auth ,  checkController.editCheck)

router.delete('/checks/:name' , auth , checkController.deleteCheck)


module.exports = router
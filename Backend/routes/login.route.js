const express = require("express")
const { PostUSerLoginInfo, verifyUserLogin, AllUsersData, ChangeRole, ReplacePassword } = require("../controllers/login.controller")
// const { PostUSerLoginInfo, verifyUserLogin, AllUsersData, ChangeRole, ReplacePassword} = require("../controllers/login.controller")
const router = express.Router()

router.post('/post-login-info', PostUSerLoginInfo)
router.post('/verify-user-login', verifyUserLogin)


module.exports = router
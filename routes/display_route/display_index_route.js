
const route = require("express").Router()
const { dashboardPage } = require("../../controllers/display_controllers/dashboard_page")
const {login_page,register_page } = require('../../controllers/display_controllers/login_page')
const { isAuth, already_loged_in } = require('../../controllers/authentication_controllers/auth_access_rules/index')
const change_password = require("../../controllers/display_controllers/chnage_password")

route.get('/',already_loged_in,login_page)
route.get('/register',already_loged_in,register_page)
route.get('/change-password',change_password)
route.get('/dashboard',isAuth,dashboardPage)

module.exports = route
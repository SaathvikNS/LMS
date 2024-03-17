const router = require('express').Router();
const { createManager, leaves, login, forgotpassword, fetchdepartment, adddepartment, fetchprofile, updateprofile, fetchcompanydetails, updatecompany, addleave, institutelist, instdepartmentlist, createemployee, getapplication, verifyemployee, unverifyemployee, removeemployee, getemployees, applyleave, employeefetchleaves, deleteapplication, fetchleaves, employeefetchleavesummary, managerfetchleaves, handleapplication, statistics,} = require('../controllers/controller');
const { managersignupvalidation, validate, loginvalidation, forgotpasswordvalidation, updateprofilevalidation, updatecompanyvalidation, employeesignupvalidation, } = require('../middlewares/validations');

router.post('/createmanager', managersignupvalidation, validate, createManager);
router.post('/createemployee', employeesignupvalidation, validate, createemployee);
router.post('/login', loginvalidation, validate, login);
router.post('/forgotpassword', forgotpasswordvalidation, validate, forgotpassword);
router.post('/fetchdepartment', fetchdepartment);
router.post('/adddepartment', adddepartment);
router.post('/addleave', addleave);
router.post('/fetchprofile', fetchprofile);
router.post('/fetchcompanydetails', fetchcompanydetails);
router.post('/updateprofile', updateprofilevalidation, validate, updateprofile)
router.post('/updatecompany', updatecompanyvalidation, validate, updatecompany)
router.post('/instdepartmentlist', instdepartmentlist)
router.post('/getapplication', getapplication)
router.post('/getemployees', getemployees)
router.post('/verifyemployee', verifyemployee)
router.post('/unverifyemployee', unverifyemployee)
router.post('/removeemployee', removeemployee)
router.post('/applyleave', applyleave)
router.post('/employeefetchleaves', employeefetchleaves)
router.post('/managerfetchleaves', managerfetchleaves)
router.post('/fetchleaves', fetchleaves)
router.post('/deleteapplication', deleteapplication)
router.post('/employeefetchleavesummary', employeefetchleavesummary)
router.post('/handleapplication', handleapplication)
router.post('/statistics', statistics)
router.get('/institutelist', institutelist)

module.exports = router;
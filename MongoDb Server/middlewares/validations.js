const { check, validationResult, } = require('express-validator');

exports.managersignupvalidation = [
    check("name").trim().not().isEmpty().withMessage("Enter Name!").isLength({min:3, max:20}).withMessage("Name must be 3 to 20 characters long."),
    check("empid").trim().not().isEmpty().withMessage("Enter Employee Id!").isLength({min:3, max:20}).withMessage("Employee id must be 3 to 20 characters long."),
    check("email").normalizeEmail().trim().not().isEmpty().withMessage("Enter Email!").isEmail().withMessage("Enter valid email!"),
    check("password").trim().not().isEmpty().withMessage("Enter Password!").isLength({min:8, max:20}).withMessage("Password must be 8 to 20 characters long."),
    check("gender").trim().not().isEmpty().withMessage("Enter your gender!"),
    check("instname").trim().not().isEmpty().withMessage("Enter Institute name!")
]

exports.employeesignupvalidation = [
    check("name").trim().not().isEmpty().withMessage("Enter Name!").isLength({min:3, max:20}).withMessage("Name must be 3 to 20 characters long."),
    check("empid").trim().not().isEmpty().withMessage("Enter Employee Id!").isLength({min:3, max:20}).withMessage("Employee id must be 3 to 20 characters long."),
    check("email").normalizeEmail().trim().not().isEmpty().withMessage("Enter Email!").isEmail().withMessage("Enter valid email!"),
    check("password").trim().not().isEmpty().withMessage("Enter Password!").isLength({min:8, max:20}).withMessage("Password must be 8 to 20 characters long."),
    check("gender").trim().not().isEmpty().withMessage("Enter your gender!"),
    check("instname").trim().not().isEmpty().withMessage("Select Institution!"),
    check("department").trim().not().isEmpty().withMessage("Select Department!")
    
]

exports.loginvalidation = [
    check('module').trim().not().isEmpty().withMessage("Select module!"),
    check('email').normalizeEmail().trim().not().isEmpty().withMessage("Enter Email!").isEmail().withMessage("Enter valid email!"),
    check("password").trim().not().isEmpty().withMessage("Enter Password!").isLength({min:8, max:20}).withMessage("Password must be 8 to 20 characters long.")
]

exports.forgotpasswordvalidation = [
    check('module').trim().not().isEmpty().withMessage("Select module!"),
    check('email').normalizeEmail().trim().not().isEmpty().withMessage("Enter Email!").isEmail().withMessage("Enter valid email!"),
    check("password").trim().not().isEmpty().withMessage("Enter Password!").isLength({min:8, max:20}).withMessage("Password must be 8 to 20 characters long.")
]

exports.updateprofilevalidation = [
    check('module').trim().not().isEmpty().withMessage("Some error occured please try again!!"),
    check('empid').trim().not().isEmpty().withMessage("Couldn't fetch employee id!"),
    check("email").normalizeEmail().trim().not().isEmpty().withMessage("Enter Email!").isEmail().withMessage("Enter valid email!"),
    check('profilecontact').trim().isLength({min:10, max:10}).withMessage("Enter valid contact number")
]

exports.updatecompanyvalidation = [ 
    check('companymail').normalizeEmail().trim().not().isEmpty().withMessage("Enter Email!").isEmail().withMessage("Enter valid email!"),
    check('companycontact').trim().isLength({min:10, max:10}).withMessage("Enter valid contact number")
]

exports.validate = (req, res, next) => {
    const error = validationResult(req).array()
    if(!error.length) return next()

    res.status(400).send({success: false, error: error[0].msg})
}
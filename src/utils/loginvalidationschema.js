import * as yup from 'yup';

const loginValidationSchema = yup.object().shape({
    email: yup.string().email("Invalid E-mail id").required("E-mail required!"),
    password: yup.string().min(8, "Password must atleast have 8 characters").max(20,"Password can have atmost 20 characters").required("Please enter the password")
})

export default loginValidationSchema
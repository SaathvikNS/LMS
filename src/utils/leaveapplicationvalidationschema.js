import * as yup from 'yup';

const leaveApplicationValidationSchema = yup.object().shape({
    reason: yup.string().required("Please enter the reason")
})

export default leaveApplicationValidationSchema
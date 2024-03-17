import * as yup from 'yup';

const addDepartmentValidationSchema = yup.object().shape({
    depname: yup.string().required("Please enter department name")
})

export default addDepartmentValidationSchema
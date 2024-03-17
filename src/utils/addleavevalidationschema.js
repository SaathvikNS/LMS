import * as yup from 'yup';

const addleavevalidationschema = yup.object().shape({
    leavetype: yup.string().required("Please enter the type of leave"),
    leaveperemp: yup.number().required("Please define the total number of leaves per employee")
})

export default addleavevalidationschema
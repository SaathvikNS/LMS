import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import GradientButton from '../../../components/gradientbutton'
import Headers from '../../../components/headers'
import lightColors from '../../../colors/colors'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import addDepartmentValidationSchema from '../../../utils/adddepartmentvalidationschema'
import InputBox from '../../../components/textinput'
import { MyContext } from '../../../../Global/context'
import axios from 'axios'

const AddDepartment = ({navigation}) => {
    const {instname, department, setdepartment} = useContext(MyContext)

    const backpressed = () => {
        navigation.goBack()
    }

    const submitpressed = async (value) => {
        const dep = value.depname;
        const updatedDepartment = {...department};
        updatedDepartment[dep.trim()] = 0
        setdepartment(updatedDepartment);

        try {
            const {data} = await axios.post("http://192.168.50.79:8000/api/user/adddepartment", {instname, department: updatedDepartment})
            console.log(data)
            navigation.navigate("addorremovedepartment")
        } catch (error) {
            console.log(error.response.data);
        }
    }

    const {control, handleSubmit, errors} = useForm({
        resolver: yupResolver(addDepartmentValidationSchema)
    })

  return (
    <View style={styles.container}>
        <Headers onPress={backpressed} value={"Dept. Management"}/>
        <View style={styles.inputwrapper}>
            <InputBox control={control} name="depname" placeholder="Department Name" />
        </View>
        <View style={{marginTop: 40,}}>
            <GradientButton value={"SUBMIT"} onPress={handleSubmit(submitpressed)} />
        </View>
    </View>
  )
}

export default AddDepartment

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: lightColors.background,
        paddingHorizontal: 20,
    },
    inputwrapper:{
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
})
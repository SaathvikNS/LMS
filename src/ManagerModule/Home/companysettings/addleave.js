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
import addleavevalidationschema from '../../../utils/addleavevalidationschema'

const AddLeave = ({navigation}) => {
    const {instname, leaves, setleaves} = useContext(MyContext)

    const backpressed = () => {
        navigation.goBack()
    }

    const submitpressed = async (value) => {
        const leave = value.leavetype;
        const noofleave = value.leaveperemp;
        const updatedLeaves = {...leaves};
        updatedLeaves[leave] = noofleave
        await setleaves(updatedLeaves);

        try {
            const {data} = await axios.post("http://192.168.50.79:8000/api/user/addleave", {instname, leaves: updatedLeaves})
            console.log(data)
            navigation.navigate("modifyleaves")
        } catch (error) {
            console.log(error.response.data);
        }
    }

    const {control, handleSubmit, errors} = useForm({
        resolver: yupResolver(addleavevalidationschema)
    })

  return (
    <View style={styles.container}>
        <Headers onPress={backpressed} value={"Add Leave"}/>
        <View style={styles.inputwrapper}>
            <InputBox control={control} name="leavetype" placeholder="Leave Type" />
            <InputBox control={control} name="leaveperemp" placeholder="No. of leaves per employee" />
        </View>
        <View style={{marginTop: 40,}}>
            <GradientButton value={"SUBMIT"} onPress={handleSubmit(submitpressed)} />
        </View>
    </View>
  )
}

export default AddLeave

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
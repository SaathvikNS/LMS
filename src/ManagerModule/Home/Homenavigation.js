import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeMain from "./homemain";
import DepartmentManagement from "./departmentmanagement/departmentmanagement";
import AddOrRemoveDepartment from "./departmentmanagement/addorremovedepartment";
import AddDepartment from "./departmentmanagement/adddepartment";
import CalendarView from "./calendarview/calendarview";
import CompanyManagementNavigator from "./companysettings/companymanagementnavigator";
import EmployeeManagementNavigator from "./employeemanagement/employeemanagementnavigator";
import LeaveStatistics from "./leavestatistics/leavestatistics";

const Stack = createStackNavigator()

const HomeNavigator = () => {
    return(
        <Stack.Navigator screenOptions={{headerShown: false,}}>
            <Stack.Screen name="homemain" component={HomeMain} />
            <Stack.Screen name="departmentmanagement" component={DepartmentManagement} />
            <Stack.Screen name="addorremovedepartment" component={AddOrRemoveDepartment} />
            <Stack.Screen name="adddepartment" component={AddDepartment} />
            <Stack.Screen name="calendarview" component={CalendarView} />
            <Stack.Screen name="companymanagementnavigator" component={CompanyManagementNavigator} />
            <Stack.Screen name="employeemanagementnavigator" component={EmployeeManagementNavigator} />
            <Stack.Screen name="leavestatistics" component={LeaveStatistics} />
        </Stack.Navigator>
    )
}

export default HomeNavigator;
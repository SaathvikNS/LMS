import React from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import lightColors from '../../../colors/colors';

const LeaveUtilizationPieChart = ({ data }) => {
  const departmentData = {};
  data.forEach((leave) => {
    const department = leave.department;
    const days = leave.noofdays;
    if (departmentData.hasOwnProperty(department)) {
      departmentData[department] += days;
    } else {
      departmentData[department] = days;
    }
  });

  const pieData = Object.entries(departmentData).map(([department, noofdays]) => ({
    name: department,
    value: noofdays,
  }));

  const pieColors = ['#FF5733', '#33FFB8', '#3377FF', '#33FF33', '#FF33EA', '#FF9533'];

  const renderLabel = ({ data }) => {
    const value = data.value;
    return `${value} days`;
  };

  console.log('pieData:', pieData); // Log pieData to check its contents

  return (
    <View>
      <PieChart
        data={pieData}
        width={"100%"}
        height={200}
        chartConfig={{
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        accessor="value"
        backgroundColor={lightColors.secondary}
        paddingLeft="15"
        absolute
        style={{ marginVertical: 8, borderRadius: 16 }}
        decimalPlaces={0}
        renderLabel={renderLabel}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        {pieData.map((data, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
            <View style={{ width: 12, height: 12, backgroundColor: pieColors[index % pieColors.length], borderRadius: 6, marginRight: 4 }} />
            <Text>{data.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default LeaveUtilizationPieChart;

import React from 'react';
import { View, Text } from 'react-native';
import { GaugeChart } from 'react-native-chart-kit';
import lightColors from '../../../colors/colors';

const LeaveUtilizationGaugeChart = ({ data }) => {
  // Calculate total leave days taken by all employees
  const totalLeaveDays = data.leaves.reduce((total, leave) => total + leave.noofdays, 0);
  const remainingLeaveDays = 30 - totalLeaveDays;

  const utilizationPercentage = (totalLeaveDays / 30) * 100;

  const gaugeData = {
    labels: ['Utilization', 'Remaining'],
    data: [utilizationPercentage, 100 - utilizationPercentage],
    colors: [lightColors.primary, lightColors.secondary],
  };

  return (
    <View>
      <GaugeChart
        style={{ alignSelf: 'center' }}
        percent={utilizationPercentage / 100}
        arcWidth={10}
        cornerRadius={5}
        hideText
        {...gaugeData}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
          <View style={{ width: 12, height: 12, backgroundColor: lightColors.primary, borderRadius: 6, marginRight: 4 }} />
          <Text>Leave Taken</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
          <View style={{ width: 12, height: 12, backgroundColor: lightColors.secondary, borderRadius: 6, marginRight: 4 }} />
          <Text>Remaining Leave</Text>
        </View>
      </View>
    </View>
  );
};

export default LeaveUtilizationGaugeChart;

import React, { useContext } from 'react';
import { View, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { MyContext } from '../../../../Global/context';
import lightColors from '../../../colors/colors';

const windowWidth = Dimensions.get('window').width

const HolidayBarChart = () => {
  const {mydata} = useContext(MyContext)

  const leaves = mydata.institution.leaves;

  const modifiedData = {}

  Object.keys(leaves).forEach(key => {
    const words = key.trim().split(' ');
    let newKey = '';
    
    if(words.length > 1){
    words.forEach(word => {
      newKey += word.substring(0, 1);
    });}else {
      words.forEach(word => {
      newKey += word.substring(0, 3);
    })}
  
    modifiedData[newKey.toUpperCase()] = leaves[key];
  })

  const leaveData = Object.entries(modifiedData).map(([type, holidaysUsed]) => ({
    type: type.trim(),
    holidaysUsed: holidaysUsed,
  }));

  return (
    <View>
      <BarChart
        data={{
          labels: leaveData.map(item => item.type),
          datasets: [
            {
              data: leaveData.map(item => item.holidaysUsed),
            },
          ],
        }}
        width={windowWidth - 40}
        height={windowWidth < 400 ? 200 : 300}
        chartConfig={{
          backgroundColor: lightColors.secondary,
          backgroundGradientFrom: lightColors.secondary,
          backgroundGradientTo: lightColors.secondary,
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default HolidayBarChart;

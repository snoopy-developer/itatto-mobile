import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components/native';
import { SansText } from '../StyledText';
import { RFValue } from 'react-native-responsive-fontsize';
import { screenDefaultHeight } from '@/constants/Params';

interface AppointmentsPerMonthProps {
  data: { [key: number]: number };
}

const AppointmentsPerMonth: React.FC<AppointmentsPerMonthProps> = ({
  data = {},
}) => {
  const theme = useTheme();
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const maxValue = Math.max(...Object.values(data));

  const styles = createStylesheet(theme);

  return (
    <View style={styles.container}>
      <SansText style={styles.title}>Appointment per month</SansText>
      <View style={styles.chartContainer}>
        {months.map((month, index) => {
          const heightPercentage =
            maxValue > 0 ? (data[index + 1] / maxValue) * 90 : 0;
          return (
            <View
              key={index}
              style={[
                styles.barContainer,
                { height: RFValue(200, screenDefaultHeight) },
              ]}
            >
              <SansText
                style={[styles.number, data[index + 1] === 0 && { opacity: 0 }]}
              >
                {data[index + 1]}
              </SansText>
              <View
                style={[
                  styles.bar,
                  {
                    height: `${heightPercentage}%`,
                    backgroundColor: theme.colors.success300,
                    width: RFValue(10, screenDefaultHeight),
                  },
                ]}
              />
              <View style={styles.line} />
              <SansText style={styles.monthLabel}>{month}</SansText>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const createStylesheet = (theme: any) =>
  StyleSheet.create({
    container: {
      width: '100%',
      marginBottom: 34,
    },
    title: {
      textAlign: 'center',
      fontSize: RFValue(16, screenDefaultHeight),
      fontWeight: 'bold',
      marginBottom: '10%',
      color: theme.colors.textPrimary,
    },
    chartContainer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
    barContainer: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      flex: 1,
    },
    bar: {
      borderTopRightRadius: 4,
      borderTopLeftRadius: 4,
    },
    line: {
      width: '100%',
      height: 1,
      backgroundColor: theme.colors.inputBorder,
    },
    monthLabel: {
      marginTop: 8,
      fontSize: RFValue(10, screenDefaultHeight),
      color: theme.colors.textSecondary,
      transform: [{ rotate: '-45deg' }],
      textAlign: 'center',
    },
    number: {
      marginBottom: 8,
      fontSize: RFValue(14, screenDefaultHeight),
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
  });

export default AppointmentsPerMonth;

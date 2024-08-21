import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components/native';
import AppointmentsPerMonth from './AppointmentChart';
import MostPopularServices from './MostPopularServices';

interface ServicesProps {
  data: any;
}

const Services: React.FC<ServicesProps> = ({ data = {} }) => {
  const theme = useTheme();

  const styles = createStylesheet(theme);

  return (
    <View style={styles.container}>
      <AppointmentsPerMonth data={data?.by_date} />

      <MostPopularServices
        services={data?.by_service}
        itemsPerPage={7}
        totalAppointments={data?.total_appointments}
      />
    </View>
  );
};

const createStylesheet = (theme: any) =>
  StyleSheet.create({
    container: {
      width: '100%',
      padding: 16,
      backgroundColor: theme.colors.paperBg,
      borderRadius: 12,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
  });

export default Services;

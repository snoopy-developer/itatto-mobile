import { StyleSheet, TouchableOpacity } from 'react-native';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { useRouter } from 'expo-router';
import { useTheme } from 'styled-components';
import FadeInView from '@/components/FadeInView';
import { ScrollView } from 'react-native-gesture-handler';
import InfoCard from '@/components/dashboard/InfoCard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TimeIntervalSelector from '@/components/dashboard/TimeIntervalSelector';
import { fetchDashboardData } from '@/redux/reducers/dashboard';
import Dolar from '@/assets/images/svg/Dolar.svg';
import SMSIcon from '@/assets/images/svg/SMSIcon.svg';
import ApointmentIcon from '@/assets/images/svg/ApointmentIcon.svg';
import CustomersIcon from '@/assets/images/svg/CustomersIcon.svg';
import AppointmentsPerMonth from '@/components/dashboard/AppointmentChart';
import MostPopularServices from '@/components/dashboard/MostPopularServices';
import Services from '@/components/dashboard/Services';
import { RFValue } from 'react-native-responsive-fontsize';
import { screenDefaultHeight } from '@/constants/Params';

export default function TabOneScreen() {
  const [selectedYear, setSelectedYear] = useState<string>(
    `${new Date().getFullYear()}`,
  );
  const [selectedMonth, setSelectedMonth] = useState<number | undefined>(
    undefined,
  );
  const [selectedService, setSelectedService] = useState<number | undefined>(
    undefined,
  );

  const theme = useTheme();
  const router = useRouter();
  const styles = createStylesheet(theme);

  const insets = useSafeAreaInsets();

  const dispatch: AppDispatch = useDispatch();
  const { dashboardData, loading } = useSelector(
    (state: RootState) => state.dashboard,
  );

  useEffect(() => {
    dispatch(
      fetchDashboardData({
        year: selectedYear,
        month: selectedMonth,
        service: selectedService,
      }),
    );
  }, [dispatch, selectedYear, selectedMonth, selectedService]);

  return (
    <FadeInView>
      <ScrollView
        style={[styles.scroll]}
        contentContainerStyle={[
          styles.container,
          {
            paddingTop: insets.top + RFValue(80, screenDefaultHeight),
            paddingBottom: insets.bottom + 30,
          },
        ]}
      >
        <TimeIntervalSelector
          onYearChange={setSelectedYear}
          onMonthChange={setSelectedMonth}
          onServiceChange={setSelectedService}
        />

        <InfoCard
          key="IncomesCard"
          title="Income"
          amount={dashboardData?.total_income}
          IconComponent={({ size, color }) => (
            <Dolar width={size} height={size} color={color} />
          )}
          iconBackgroundColor={theme.colors.primary100}
          iconColor={theme.colors.primary500}
          positiveChange={true}
        />

        <InfoCard
          key="TotalSMSCard"
          title="SMS available"
          amount={dashboardData?.sms}
          IconComponent={({ size, color }) => (
            <SMSIcon width={size} height={size} color={color} />
          )}
          iconBackgroundColor={theme.colors.info100}
          iconColor={theme.colors.info500}
          positiveChange={true}
        />

        <InfoCard
          key="CustomersCard"
          title="Customers"
          amount={dashboardData?.clients}
          IconComponent={({ size, color }) => (
            <CustomersIcon width={size} height={size} color={color} />
          )}
          iconBackgroundColor={theme.colors.success100}
          iconColor={theme.colors.success500}
          positiveChange={true}
        />

        <InfoCard
          key="TotalAppointmentsCard"
          title="Appointments"
          amount={
            dashboardData?.upcoming_appointments +
            ' / ' +
            dashboardData?.total_appointments
          }
          IconComponent={({ size, color }) => (
            <CustomersIcon width={size} height={size} color={color} />
          )}
          iconBackgroundColor={theme.colors.warning100}
          iconColor={theme.colors.warning500}
          positiveChange={true}
        />

        <Services data={dashboardData} />
      </ScrollView>
    </FadeInView>
  );
}

const createStylesheet = (theme: any) =>
  StyleSheet.create({
    scroll: {
      // flex: 1,
      backgroundColor: 'transparent',
    },
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
    title: {
      color: theme.colors.textPrimary,
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });

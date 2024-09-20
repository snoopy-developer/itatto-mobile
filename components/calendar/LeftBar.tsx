import React, { useEffect, useMemo, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from 'styled-components/native';
import { SansText } from '@components/StyledText';
import { FontAwesome } from '@expo/vector-icons';
import { useCalendar } from '@/modules/CalendarContext';
import { Calendar } from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchAppointments } from '@/redux/reducers/appointments';
import { getCalendarBounds } from '@/helpers/timeHelper';
import { useRouter } from 'expo-router';

const massage = { key: 'massage', color: 'blue' };
const workout = { key: 'workout', color: 'pink' };

const LeftBar: React.FC = () => {
  const theme = useTheme();
  const styles = createStylesheet(theme);

  const router = useRouter();
  const { focusedDate, setFocusedDate } = useCalendar();

  const [monthYearKey, setMonthYearKey] = useState(
    focusedDate.toISOString().substring(0, 10),
  );
  const [previousFirstDay, setPreviousFirstDay] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const { appointments, loading } = useSelector(
    (state: RootState) => state.appointments,
  );

  useEffect(() => {
    const getAppointments = async () => {
      const { firstDay, lastDay } = getCalendarBounds(monthYearKey);
      if (firstDay !== previousFirstDay) {
        setPreviousFirstDay(firstDay);

        dispatch(
          fetchAppointments({
            from: firstDay,
            to: lastDay,
            duration: '',
            status: '',
            staff_ids: [25],
            customer_id: '',
            service_id: '',
            location_id: '',
          }),
        );
        console.log('trigered');
      }
    };
    getAppointments();
  }, [dispatch, monthYearKey]);

  const markedDates = useMemo(() => {
    const dates: any = {};

    if (appointments === null || appointments === undefined) return dates;

    appointments.forEach(
      (appointment: { date: any; service: { name: string; color: any } }) => {
        const date = appointment.date;
        const serviceKey = appointment.service.name
          .toLowerCase()
          .replace(/\s/g, '_');
        const serviceColor = appointment.service.color;

        if (!dates[date]) {
          dates[date] = {
            dots: [],
            selected: true,
            selectedColor: theme.colors.primary,
          };
        }

        dates[date].dots.push({
          key: serviceKey,
          color: serviceColor,
        });
      },
    );

    return dates;
  }, [appointments, theme]);

  const calendarKey = useMemo(() => theme.colors.bodyBg, [theme]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.buttonAddAppointment}
          onPress={() => {
            router.push('/calendar/calendarStash/addAppointmentModal');
          }}
        >
          <FontAwesome name="plus" size={16} color={theme.colors.grayLight} />
          <SansText style={styles.buttonAddAppointmentText}>
            Add Appointment
          </SansText>
        </TouchableOpacity>
      </View>

      <View style={styles.calendarContainer}>
        <Calendar
          initialDate={focusedDate.toISOString().slice(0, 10)}
          // key={calendarKey}
          onDayPress={(day: { dateString: string | number | Date }) =>
            setFocusedDate(new Date(day.dateString))
          }
          style={styles.calendar}
          onVisibleMonthsChange={(months: [{ dateString: string }]) => {
            setMonthYearKey(months[0].dateString);
          }}
          theme={{
            calendarBackground: theme.colors.bodyBg,
            textDayFontFamily: 'PublicSans',
            textMonthFontFamily: 'PublicSans',
            textDayHeaderFontFamily: 'PublicSans',
            textSectionTitleColor: theme.colors.textPrimary,
            dayTextColor: theme.colors.textPrimary,
            textDisabledColor: theme.colors.actionDisabled,
            monthTextColor: theme.colors.textPrimary,
            selectedDayBackgroundColor: theme.colors.success500,
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
          }}
          markingType={'multi-dot'}
          markedDates={{
            ...markedDates,
            [focusedDate.toISOString().slice(0, 10)]: {
              selected: true,
              selectedColor: theme.colors.success500,
            },
          }}
        />
      </View>
      <View style={styles.filterContainer}>
        <ScrollView contentContainerStyle={styles.filterContainer}></ScrollView>
      </View>
    </View>
  );
};

const createStylesheet = (theme: any) =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: theme.colors.bodyBg,
      flex: 1,
    },
    headerContainer: {
      paddingVertical: 16,
      paddingHorizontal: 24,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    calendarContainer: {
      width: '100%',
      padding: 8,
      borderTopWidth: 2,
      borderTopColor: theme.colors.actionFocus,
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.actionFocus,
    },
    calendar: {
      width: '100%',
      backgroundColor: theme.colors.bodyBg,
    },
    filterContainer: {
      width: '100%',
      flex: 2,
    },
    buttonAddAppointment: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.success500,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    buttonAddAppointmentText: {
      color: theme.colors.grayLight,
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 8,
    },
  });

export default LeftBar;

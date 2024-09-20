import { StyleSheet, TouchableOpacity } from 'react-native';

import React, { useMemo, useState } from 'react';
import {
  Calendar,
  CalendarTouchableOpacityProps,
  ICalendarEventBase,
} from 'react-native-big-calendar';

import { useRouter } from 'expo-router';
import { useTheme } from 'styled-components';
import FadeInView from '@/components/FadeInView';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from '@/components/Themed';
import { SansText } from '@/components/StyledText';
import PickHeader from '@/components/calendar/CalendarHeader';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useCalendar } from '@/modules/CalendarContext';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface ICalendarEventCustom extends ICalendarEventBase {
  color: string;
}

export default function TabOneScreen() {
  const theme = useTheme();
  const router = useRouter();
  const styles = createStylesheet(theme);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const { focusedDate, setFocusedDate } = useCalendar();
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('week');

  const { appointments, loading } = useSelector(
    (state: RootState) => state.appointments,
  );

  const EventAppointments = useMemo(() => {
    if (appointments === null || appointments === undefined) return [];
    return appointments.map((appointment: any) => {
      // Parse the start and end date from the appointment's date and time
      const startDate = new Date(
        `${appointment.date}T${appointment.start_time}`,
      );
      const endDate = new Date(`${appointment.date}T${appointment.end_time}`);

      return {
        title: appointment.service.name,
        start: startDate,
        end: endDate,
        location: appointment.location.name,
        color: appointment.service.color,
      };
    });
  }, [appointments]);


  const handleOpenSideBar = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const renderEvent = <T extends ICalendarEventBase>(
    event: T,
    touchableOpacityProps: CalendarTouchableOpacityProps,
  ) => {
    if ('color' in event) {
      if (viewMode !== 'month') {
        return (
          <TouchableOpacity
            {...touchableOpacityProps}
            style={[
              styles.event,
              touchableOpacityProps.style,
              { backgroundColor: event.color as string },
            ]}
          >
            <SansText>{event.title}</SansText>
          </TouchableOpacity>
        );
      }

      return (
        <TouchableOpacity
          {...touchableOpacityProps}
          style={[
            touchableOpacityProps.style,
            { backgroundColor: event.color as string },
          ]}
        >
          <SansText>
            {event.start.getHours() +
              ':' +
              event.start.getMinutes() +
              ' - ' +
              event.end.getHours() +
              ':' +
              event.end.getMinutes()}
          </SansText>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        {...touchableOpacityProps}
        style={[styles.event, touchableOpacityProps.style]}
      >
        <SansText>{event.title}</SansText>
      </TouchableOpacity>
    );
  };

  return (
    <FadeInView>
      <View style={[styles.container, { paddingBottom: insets.bottom + 30 }]}>
        <View style={styles.calendarContainer}>
          <PickHeader
            viewMode={viewMode}
            setViewMode={setViewMode}
            changeModalVisible={handleOpenSideBar}
          />
          <Calendar
            sortedMonthView={false}
            isEventOrderingEnabled={false}
            date={focusedDate}
            events={EventAppointments}
            height={10}
            mode={viewMode}
            renderEvent={renderEvent}
          />
        </View>
      </View>
    </FadeInView>
  );
}

const createStylesheet = (theme: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
      flex: 1,
      width: '100%',
      paddingHorizontal: 16,
    },
    calendarContainer: {
      width: '100%',
      flex: 1,
      backgroundColor: theme.colors.paperBg,
      borderRadius: 10,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
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
    event: {
      position: 'absolute',
    },
  });

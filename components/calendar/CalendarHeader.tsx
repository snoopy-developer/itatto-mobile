import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';
import MenuIcon from '@assets/images/svg/Menu.svg';
import LeftIcon from '@assets/images/svg/LeftIcon.svg';
import RightIcon from '@assets/images/svg/RightIcon.svg';

import { SansText } from '../StyledText';
import { useCalendar } from '@/modules/CalendarContext';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

interface CalendarHeaderProps {
  viewMode: 'month' | 'week' | 'day';
  setViewMode: React.Dispatch<React.SetStateAction<'month' | 'week' | 'day'>>;
  changeModalVisible: () => void;
}

const PickHeader: React.FC<CalendarHeaderProps> = ({
  viewMode,
  setViewMode,
  changeModalVisible,
}) => {
  const theme = useTheme();
  const styles = createStylesheet(theme);

  const { focusedDate, setFocusedDate } = useCalendar();

  const changeDate = (delta: number) => {
    const newDate = new Date(focusedDate);
    if (viewMode === 'month') {
      newDate.setMonth(focusedDate.getMonth() + delta);
    }
    if (viewMode === 'week') {
      newDate.setDate(focusedDate.getDate() + delta * 7);
    }
    if (viewMode === 'day') {
      newDate.setDate(focusedDate.getDate() + delta);
    }
    setFocusedDate(newDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={changeModalVisible}
        >
          <MenuIcon height={24} width={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => changeDate(-1)}
        >
          <LeftIcon height={24} width={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => changeDate(1)}
        >
          <RightIcon height={24} width={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <SansText style={styles.dateText}>
          {viewMode === 'day' &&
            focusedDate.getDate() +
              ' ' +
              months[focusedDate.getMonth()] +
              ' ' +
              focusedDate.getFullYear()}
          {viewMode === 'week' && getWeekRange(focusedDate)}
          {viewMode === 'month' &&
            months[focusedDate.getMonth()] + ' ' + focusedDate.getFullYear()}
        </SansText>
      </View>
      <View style={styles.viewSelector}>
        <TouchableOpacity
          style={[
            styles.viewButton,
            styles.viewButtonLeft,
            viewMode === 'month' && styles.activeViewButton,
          ]}
          onPress={() => setViewMode('month')}
        >
          <SansText
            style={[
              styles.viewButtonText,
              viewMode === 'month' && styles.activeViewButtonText,
            ]}
          >
            Month
          </SansText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.viewButton,
            styles.viewButtonCenter,
            viewMode === 'week' && styles.activeViewButton,
          ]}
          onPress={() => setViewMode('week')}
        >
          <SansText
            style={[
              styles.viewButtonText,
              viewMode === 'week' && styles.activeViewButtonText,
            ]}
          >
            Week
          </SansText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.viewButton,
            styles.viewButtonRight,
            viewMode === 'day' && styles.activeViewButton,
          ]}
          onPress={() => setViewMode('day')}
        >
          <SansText
            style={[
              styles.viewButtonText,
              viewMode === 'day' && styles.activeViewButtonText,
            ]}
          >
            Day
          </SansText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

function getWeekRange(date: Date) {
  const startDate = new Date(date);
  const endDate = new Date(date);

  startDate.setDate(date.getDate() - date.getDay());
  endDate.setDate(startDate.getDate() + 6);

  const options = { day: 'numeric', month: 'short', year: 'numeric' } as const;
  const startDateFormatted = startDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });
  const endDateFormatted = endDate.toLocaleDateString('en-US', options);

  if (startDate.getMonth() === endDate.getMonth()) {
    return `${startDate.getDate()} - ${endDateFormatted}`;
  } else {
    return `${startDateFormatted} - ${endDateFormatted}`;
  }
}

const createStylesheet = (theme: any) =>
  StyleSheet.create({
    container: {
      width: '100%',
      paddingVertical: 24,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.actionFocus,
      marginBottom: 10,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: 10,
      marginBottom: 10,
    },
    iconButton: {
      padding: 10,
    },
    dateText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.textPrimary,
    },
    viewSelector: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
    },
    viewButton: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 10,
      backgroundColor: theme.colors.success100,
    },
    viewButtonLeft: {
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
    },
    viewButtonRight: {
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
    },
    viewButtonCenter: {
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderColor: theme.colors.success500,
    },
    activeViewButton: {
      backgroundColor: theme.colors.success200,
    },
    viewButtonText: {
      fontSize: 16,
      color: theme.colors.success500,
    },
    activeViewButtonText: {
      fontWeight: 'bold',
    },
  });

export default PickHeader;

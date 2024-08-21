import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import DropdownSelector from '@components/Buttons/DropdownSelector';
import { useTheme } from 'styled-components/native';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface TimeIntervalSelectorProps {
  onYearChange?: (year: string) => void;
  onMonthChange?: (month: number | undefined) => void;
  onServiceChange?: (service: number | undefined) => void;
}

const TimeIntervalSelector: React.FC<TimeIntervalSelectorProps> = ({
  onYearChange,
  onMonthChange,
  onServiceChange,
}) => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  const years = Array.from(
    new Array(currentYear - 2014),
    (val, index) => `${currentYear - index}`,
  );

  const [selectedYear, setSelectedYear] = useState<string>(`${currentYear}`);
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [selectedService, setSelectedService] =
    useState<string>('All services');

  const [servicesList, setServicesList] = useState<string[]>(['All services']);

  const styles = createStylesheet(theme);

  const { services } = useSelector((state: RootState) => state.services);

  const monthsMap: { [key: string]: number } = {
    'All months': 0,
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };

  useEffect(() => {
    if (services) {
      setServicesList([
        'All services',
        ...services.map((s: { name: string }) => s.name),
      ]);
    }
  }, [services]);

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    if (onYearChange) {
      onYearChange(year);
    }
  };

  const handleMonthChange = (month: string) => {
    const monthValue = monthsMap[month];
    setSelectedMonth(monthValue);
    if (onMonthChange) {
      if (month === 'All months') {
        onMonthChange(undefined);
      } else {
        onMonthChange(monthValue);
      }
    }
  };

  const handleServiceChange = (service: string) => {
    setSelectedService(service);
    if (onServiceChange) {
      if (service === 'All services') {
        onServiceChange(undefined);
      } else {
        onServiceChange(
          services.find((s: { name: string }) => s.name === service)?.id,
        );
      }
    }
  };

  // // Optional: call callbacks on initial mount with current values
  // useEffect(() => {
  //   if (onYearChange) {
  //     onYearChange(selectedYear);
  //   }
  //   if (onMonthChange) {
  //     onMonthChange(selectedMonth);
  //   }
  //   if (onServiceChange) {
  //     onServiceChange(selectedService);
  //   }
  // }, []);

  return (
    <View style={styles.container}>
      <DropdownSelector
        label="Year"
        options={years}
        selectedOption={selectedYear}
        onSelect={handleYearChange}
      />
      <DropdownSelector
        label="Month"
        options={Object.keys(monthsMap)}
        selectedOption={
          Object.keys(monthsMap).find(
            (key) => monthsMap[key] === selectedMonth,
          ) || 'All months'
        }
        onSelect={handleMonthChange}
      />
      <DropdownSelector
        label="Service"
        options={servicesList}
        selectedOption={selectedService}
        onSelect={handleServiceChange}
      />
    </View>
  );
};

const createStylesheet = (theme: any) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'column',
      gap: 16,
      marginBottom: 16,
      backgroundColor: theme.colors.bodyBg,
    },
  });

export default TimeIntervalSelector;

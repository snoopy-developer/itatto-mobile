import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from 'styled-components/native';
import { SansText } from '@components/StyledText'; // Your custom text component
import Pagination from '@components/Buttons/Pagination'; // Import the Pagination component

interface Service {
  name: string;
  color: string;
  appointments_count: number;
}

interface MostPopularServicesProps {
  services: Service[];
  itemsPerPage: number;
  totalAppointments: number;
}

const MostPopularServices: React.FC<MostPopularServicesProps> = ({
  services = [],
  itemsPerPage,
  totalAppointments,
}) => {
  const theme = useTheme();
  const styles = createStylesheet(theme);
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(services.length / itemsPerPage);

  const currentPageData = services.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  // Calculate how many placeholders we need to render
  const placeholdersCount = itemsPerPage - currentPageData.length;

  return (
    <View style={styles.container}>
      <SansText style={styles.title}>Most popular services</SansText>
      {[...currentPageData, ...Array(placeholdersCount)].map((item, index) => (
        <View key={index}>
          <View style={styles.serviceContainer}>
            <View style={styles.serviceNameContainer}>
              <View
                style={[
                  styles.serviceColorIndicator,
                  { backgroundColor: item?.color },
                ]}
              />
              <SansText style={styles.serviceName}>{item?.name}</SansText>
            </View>
            <SansText
              style={[styles.servicePercentage, !item && { opacity: 0 }]}
            >
              {((item?.appointments_count / totalAppointments) * 100).toFixed(
                2,
              )}
              %
            </SansText>
          </View>
          {index < currentPageData.length + placeholdersCount - 1 && (
            <View style={[styles.separator, !item && { opacity: 0 }]} />
          )}
        </View>
      ))}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </View>
  );
};

const createStylesheet = (theme: any) =>
  StyleSheet.create({
    container: {
      width: '100%',
    },
    title: {
      fontSize: 18,
      textAlign: 'center',
      width: '100%',
      fontWeight: 'bold',
      marginBottom: 16,
      color: theme.colors.textPrimary,
    },
    serviceContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    serviceNameContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    serviceColorIndicator: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginRight: 8,
    },
    serviceName: {
      fontSize: 16,
      color: theme.colors.textPrimary,
    },
    servicePercentage: {
      fontSize: 16,
      color: theme.colors.textPrimary,
    },
    separator: {
      height: 1,
      backgroundColor: theme.colors.grayLight,
      marginVertical: 8,
    },
    placeholderContainer: {
      opacity: 0, // Make the placeholders invisible
    },
    placeholderIndicator: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginRight: 8,
      backgroundColor: 'transparent',
    },
    placeholderText: {
      color: 'transparent', // Make text transparent
    },
  });

export default MostPopularServices;

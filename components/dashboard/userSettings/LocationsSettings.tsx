import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';
import MarketIcon from '@assets/images/svg/MarketIcon.svg';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Location } from '@/redux/reducers/locations';

import LocationMarker from '@assets/images/svg/LocationMarker.svg';
import PhoneIcon from '@assets/images/svg/PhoneIcon.svg';
import TaxIcon from '@assets/images/svg/TaxIcon.svg';
import CopyIcon from '@assets/images/svg/CopyIcon.svg';
import ClockIcon from '@assets/images/svg/ClockIcon.svg';

const Locations: React.FC = () => {
  const theme = useTheme();
  const styles = createStylesheet(theme);

  const handleAddLocation = () => {
    // Logic for adding location
    console.log('Add location');
  };

  const handleEditLocation = (location: Location) => {
    // Logic for editing location
    console.log('Edit location:', location);
  };

  const { locations } = useSelector((state: RootState) => state.locations);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Locations</Text>
        <TouchableOpacity onPress={handleAddLocation} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add location</Text>
        </TouchableOpacity>
      </View>

      {locations &&
        locations?.map((location) => (
          <LocationCard
            key={location.id}
            location={location}
            onEdit={() => handleEditLocation(location)}
            theme={theme}
          />
        ))}
    </View>
  );
};

const LocationCard: React.FC<{
  location: Location;
  onEdit: () => void;
  theme: any;
}> = ({ location, onEdit, theme }) => {
  const styles = createStylesheet(theme);

  return (
    <View style={styles.locationCard}>
      <View style={styles.iconContainer}>
        <MarketIcon width={30} height={30} color={theme.colors.textPrimary} />
      </View>
      <Text style={styles.locationName}>{location.name}</Text>

      <View style={styles.infoContainer}>
        <View style={styles.lineContainer}>
          <LocationMarker
            width={16}
            height={16}
            color={theme.colors.textPrimary}
          />
          <Text style={styles.locationAddress}>
            {location.address}
            {'\n'}
            {location.city}, {location.state}, {location.post_code}
            {'\n'}
            {location.country.name}
          </Text>
        </View>
        <View style={styles.lineContainer}>
          <PhoneIcon width={16} height={16} color={theme.colors.textPrimary} />
          <Text style={styles.locationDetail}>{location.phone_number}</Text>
        </View>
        <View style={styles.lineContainer}>
          <TaxIcon width={16} height={16} color={theme.colors.textPrimary} />
          <Text style={styles.locationDetail}>{location.vat_number}</Text>
        </View>
        <View style={styles.lineContainer}>
          <CopyIcon width={16} height={16} color={theme.colors.textPrimary} />
          <Text style={styles.locationDetail}>{location.website}</Text>
        </View>
        <View style={styles.lineContainer}>
          <ClockIcon width={16} height={16} color={theme.colors.textPrimary} />
          <Text style={styles.locationDetail}>
            {location.from_time} - {location.to_time}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={onEdit}>
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

const createStylesheet = (theme: any) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flex: 1,
      padding: 20,
      backgroundColor: theme.colors.paperBg,
      borderRadius: 10,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.textPrimary,
    },
    addButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.success500,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 5,
    },
    addButtonText: {
      color: theme.colors.paperBg,
      marginLeft: 8,
      fontWeight: 'bold',
    },
    locationCard: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 8,
      padding: 16,
      marginBottom: 20,
      backgroundColor: theme.colors.paperBg,
    },
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
    },
    locationName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      textAlign: 'center',
      color: theme.colors.textPrimary,
    },
    locationAddress: {
      fontSize: 14,
      marginBottom: 8,
      textAlign: 'left',
      color: theme.colors.textSecondary,
    },
    locationDetail: {
      fontSize: 14,
      marginBottom: 4,
      textAlign: 'left',
      color: theme.colors.textSecondary,
    },
    defaultTag: {
      color: theme.colors.success500,
      fontWeight: 'bold',
      textAlign: 'left',
      marginTop: 8,
    },
    editButton: {
      marginTop: 12,
      backgroundColor: theme.colors.secondary100,
      padding: 8,
      borderRadius: 5,
      alignItems: 'center',
    },
    editButtonText: {
      fontWeight: 'bold',
      color: theme.colors.textPrimary,
    },
    infoContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    lineContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      gap: 10,
    },
  });

export default Locations;

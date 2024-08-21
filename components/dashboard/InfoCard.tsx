import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components/native';
import { SansText } from '../StyledText';
import { RFValue } from 'react-native-responsive-fontsize';
import { screenDefaultHeight } from '@/constants/Params';

interface InfoCardProps {
  title?: string;
  subtitle?: string;
  amount?: string;
  percentageChange?: string;
  IconComponent: React.FunctionComponent<{ size: number; color: string }>;
  iconColor?: string;
  iconBackgroundColor?: string;
  positiveChange?: boolean;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title = '',
  subtitle = '',
  amount = '',
  percentageChange = '',
  IconComponent,
  iconBackgroundColor = 'white',
  iconColor = 'white',
  positiveChange = true,
}) => {
  const theme = useTheme();
  const styles = createStylesheet(theme, iconBackgroundColor, positiveChange);

  return (
    <View style={[styles.container, { borderBottomColor: iconColor }]}>
      <View style={styles.headerContainer}>
        <View style={styles.iconContainer}>
          <IconComponent
            size={RFValue(20, screenDefaultHeight)}
            color={iconColor}
          />
        </View>
        <SansText style={styles.amount}>{amount}</SansText>
      </View>

      <SansText style={styles.title}>{title}</SansText>
      <SansText style={styles.subtitle}>{subtitle}</SansText>
      <View
        style={[
          styles.percentageContainer,
          percentageChange === '' && { opacity: 0 },
        ]}
      >
        <SansText style={styles.percentage}>{percentageChange}</SansText>
      </View>
    </View>
  );
};

const createStylesheet = (
  theme: any,
  iconBackgroundColor: string,
  positiveChange: boolean,
) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.paperBg,
      borderRadius: 10,
      padding: 20,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
      width: '100%',
      borderColor: theme.colors.grayBorder,
      borderBottomWidth: 3,
      marginBottom: 24,
    },
    headerContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: 16,
      marginBottom: 10,
    },
    iconContainer: {
      backgroundColor: iconBackgroundColor,
      borderRadius: 10,
      aspectRatio: 1,
      padding: 10,
      alignItems: 'center',
      alignSelf: 'flex-start',
    },
    title: {
      fontSize: 18,
      color: theme.colors.textPrimary,
    },
    subtitle: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      marginBottom: 5,
    },
    amount: {
      fontSize: 24,
      color: theme.colors.textPrimary,
    },
    percentageContainer: {
      backgroundColor: positiveChange
        ? theme.colors.success100
        : theme.colors.error100,
      borderRadius: 5,
      paddingHorizontal: 8,
      paddingVertical: 4,
      alignSelf: 'flex-start',
    },
    percentage: {
      fontSize: 14,
      fontWeight: 'bold',
      color: positiveChange ? theme.colors.success500 : theme.colors.error500,
    },
  });

export default InfoCard;

import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from 'styled-components/native';
import axios from 'axios';

interface UserProfileIconProps {
  onPress?: () => void;
  containerStyle?: ViewStyle;
}

const UserProfileIcon: React.FC<UserProfileIconProps> = ({
  onPress = () => {},
  containerStyle,
}) => {
  const theme = useTheme();
  const styles = createStylesheet(theme);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // TODO: Add loading state
    setLoading(false);
  }, []);

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator size="small" color={theme.colors.textPrimary} />
      ) : (
        <Image
          source={{
            uri: imageUrl || 'https://default-image-url.com/default.png',
          }}
          style={styles.image}
        />
      )}
    </TouchableOpacity>
  );
};

const createStylesheet = (theme: any) =>
  StyleSheet.create({
    container: {
      position: 'relative',
      height: '100%',
      width: undefined,
      aspectRatio: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 22,
      borderWidth: 2,
      borderColor: theme.colors.success500,
    },
  });

export default UserProfileIcon;

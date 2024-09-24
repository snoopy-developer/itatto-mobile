import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutChangeEvent,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

import SettingsIcon from '@assets/images/svg/Settings.svg';
import LocationMarker from '@assets/images/svg/LocationMarker.svg';
import XIcon from '@assets/images/svg/XIcon.svg';

import { useRouter } from 'expo-router';

import GeneralSettings from './GeneralSettings';
import LocationsSettings from './LocationsSettings';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { fetchUserProfile } from '@/redux/reducers/userProfile';

const SettingList = [
  { Name: 'General', icon: <SettingsIcon /> },
  { Name: 'Locations', icon: <LocationMarker /> },
  { Name: 'MoreSettings0', icon: <SettingsIcon /> },
  { Name: 'MoreSettings1', icon: <SettingsIcon /> },
  { Name: 'MoreSettings2', icon: <SettingsIcon /> },
  { Name: 'MoreSettings3', icon: <SettingsIcon /> },
];

const SettingsModal: React.FC = () => {
  const theme = useTheme();
  const styles = createStylesheet(theme);

  const [currentTab, setCurrentTab] = useState('General');

  const [settingsTabsLayouts, setSettingsTabsLayouts] = useState<any>([]);

  const sliderX = useSharedValue(0);
  const sliderWidth = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUserProfile() as any);
  }, []);

  const handleTabLayout = (index: number, layout: LayoutChangeEvent) => {
    const newLayouts = [...settingsTabsLayouts, layout.nativeEvent.layout];
    if (index === 0) {
      handleTabPress(0, newLayouts);
    }
    setSettingsTabsLayouts(newLayouts);
  };
  const handleTabPress = (index: number, layouts = settingsTabsLayouts) => {
    if (!layouts[index]) {
      console.error('Layout is undefined for tab', index);
      return;
    }

    const { x, width } = layouts[index];

    sliderX.value = withTiming(x - 10, { duration: 300 });
    sliderWidth.value = withTiming(width + 20, { duration: 300 });

    triggerContentAnimation();

    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    Promise.resolve().then(async () => {
      await delay(100);

      setCurrentTab(SettingList[index].Name);
    });
  };

  const triggerContentAnimation = async () => {
    opacity.value = withTiming(0, { duration: 100 });
    scale.value = withTiming(0.8, { duration: 100 }, () => {
      opacity.value = withTiming(1, { duration: 200 });
      scale.value = withTiming(1, { duration: 200 });
    });
  };

  const contentAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: sliderX.value }],
      width: sliderWidth.value,
    };
  });

  const currentTabRender = () => {
    switch (currentTab) {
      case 'General':
        return <GeneralSettings />;
      case 'Locations':
        return <LocationsSettings />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView>
          <View style={styles.contentContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={styles.title}>Settings</Text>
              <TouchableOpacity
                onPress={() => {
                  router.back();
                }}
              >
                <XIcon
                  color={theme.colors.textPrimary}
                  width={34}
                  height={34}
                />
              </TouchableOpacity>
            </View>
            <ScrollView
              style={styles.menuItemsScroll}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <Animated.View style={[styles.animatedSlider, animatedStyle]} />

              {SettingList.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onLayout={(event) => handleTabLayout(index, event)}
                  style={[
                    styles.menuItem,
                    currentTab === item.Name && styles.activeMenuItem,
                  ]}
                  onPress={() => {
                    handleTabPress(index);
                    // setCurrentTab(item.Name);
                  }}
                >
                  <View style={styles.menuItemContent}>
                    {React.cloneElement(item.icon, {
                      height: 20,
                      width: 20,
                      color:
                        currentTab === item.Name
                          ? theme.colors.paperBg
                          : theme.colors.textPrimary,
                    })}
                    <Text
                      style={[
                        styles.menuItemText,
                        currentTab === item.Name && {
                          color: theme.colors.paperBg,
                        },
                      ]}
                    >
                      {item.Name}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Animated.View
              style={[styles.menuTabContainer, contentAnimatedStyle]}
            >
              {currentTabRender()}
            </Animated.View>
          </View>
        </SafeAreaView>
      </ScrollView>
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
    },
    contentContainer: {
      width: '100%',
      gap: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.textPrimary,
    },
    menuItemsScroll: {
      width: '100%',
      position: 'relative',
    },
    menuItem: {
      marginHorizontal: 10,
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    animatedSlider: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      backgroundColor: theme.colors.success500,
      borderRadius: 8,
      zIndex: -1,
      height: '100%',
    },
    menuItemContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    menuItemText: {
      fontSize: 14,
      fontWeight: 'bold',
      marginLeft: 8,
      color: theme.colors.textPrimary,
    },
    activeMenuItem: {
      backgroundColor: 'transparent',
    },
    menuTabContainer: {
      width: '100%',
      padding: 2,
    },
  });

export default SettingsModal;

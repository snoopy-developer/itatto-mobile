import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';

interface DropdownSelectorProps {
  label: string;
  options: string[];
  selectedOption: string;
  onSelect: (value: string) => void;
}

const DropdownSelector: React.FC<DropdownSelectorProps> = ({
  label,
  options,
  selectedOption,
  onSelect,
}) => {
  const theme = useTheme();
  const styles = createStylesheet(theme);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOptionSelect = (option: string) => {
    onSelect(option);
    setIsModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setIsModalVisible(true)}
      >
        <View style={styles.selector}>
          <Text style={styles.text}>{selectedOption || label}</Text>
          <FontAwesome
            name="chevron-down"
            size={14}
            color={theme.colors.textPrimary}
          />
        </View>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setIsModalVisible(false)}
        >
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <FlatList
                data={options}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.option,
                      item === selectedOption && styles.selectedOption,
                    ]}
                    onPress={() => handleOptionSelect(item)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        item === selectedOption && styles.selectedOptionText,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const createStylesheet = (theme: any) =>
  StyleSheet.create({
    container: {
      width: '100%',
    },

    selector: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 5,
      borderColor: theme.colors.inputBorder,
      borderWidth: 1,
      backgroundColor: theme.colors.paperBg,
    },
    text: {
      fontSize: 16,
      color: theme.colors.textPrimary,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
      width: '80%',
      maxHeight: 400,
      backgroundColor: theme.colors.paperBg,
      borderRadius: 10,
      padding: 10,
    },
    option: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 5,
    },
    selectedOption: {
      backgroundColor: theme.colors.successOLight,
    },
    optionText: {
      fontSize: 16,
      color: theme.colors.textPrimary,
    },
    selectedOptionText: {
      color: theme.colors.success500,
    },
  });

export default DropdownSelector;

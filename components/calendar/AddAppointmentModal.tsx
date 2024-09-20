import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { useTheme } from 'styled-components/native';
import {
  useSafeAreaInsets,
  SafeAreaView,
} from 'react-native-safe-area-context';
import DropdownSelector from '@components/Buttons/DropdownSelector'; // Assume you have this
import { useRouter } from 'expo-router';

const AddAppointmentForm = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets(); // Get the safe area insets
  const styles = createStylesheet(theme, insets);
  const router = useRouter();

  const [location, setLocation] = useState('Tattoo studio 1');
  const [artist, setArtist] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [notes, setNotes] = useState('');
  const [isPartOfProject, setIsPartOfProject] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerText}>Aggiungi nuovo appuntamento</Text>

        {/* Stepper */}
        <View style={styles.stepperContainer}>
          {[1, 2, 3, 4].map((step) => (
            <View key={step} style={styles.stepWrapper}>
              <TouchableOpacity
                style={[styles.step, currentStep === step && styles.activeStep]}
                onPress={() => setCurrentStep(step)}
              >
                <Text style={styles.stepText}>{step}</Text>
              </TouchableOpacity>
              {step < 4 && <Text style={styles.stepArrow}>➔</Text>}
            </View>
          ))}
        </View>

        {/* Steps Form */}
        {currentStep === 1 && (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Location</Text>
              <TextInput
                style={styles.input}
                value={location}
                onChangeText={setLocation}
                placeholder="Enter location"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Artist</Text>
              <DropdownSelector
                label="Select Artist"
                options={['Artist 1', 'Artist 2', 'Artist 3']}
                selectedOption={artist}
                onSelect={setArtist}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Duration</Text>
              <DropdownSelector
                label="Select Duration"
                options={['30 min', '1 hour', '2 hours']}
                selectedOption={duration}
                onSelect={setDuration}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Price</Text>
              <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                placeholder="Insert price"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Date and Time</Text>
              <TextInput
                style={styles.input}
                value={dateTime}
                onChangeText={setDateTime}
                placeholder="Appointment date"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Notes</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={3}
                placeholder="Insert description..."
              />
            </View>

            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>
                Is this part of a larger Project?
              </Text>
              <Switch
                value={isPartOfProject}
                onValueChange={setIsPartOfProject}
                thumbColor={
                  isPartOfProject
                    ? theme.colors.success500
                    : theme.colors.grayLight
                }
                trackColor={{
                  false: theme.colors.grayLight,
                  true: theme.colors.success200,
                }}
              />
            </View>
          </>
        )}

        {/* Steps 2, 3, 4: Customer, Project, Payment */}
        {currentStep === 2 && (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Cliente</Text>
              <DropdownSelector
                label="Seleziona il cliente"
                options={['Cliente 1', 'Cliente 2', 'Cliente 3']}
                selectedOption=""
                onSelect={() => {}}
              />
            </View>
            <TouchableOpacity style={styles.addCustomerButton}>
              <Text style={styles.addCustomerText}>+ Aggiungi Cliente</Text>
            </TouchableOpacity>
          </>
        )}

        {currentStep === 3 && (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Seleziona il progetto</Text>
              <DropdownSelector
                label="Select Project"
                options={['Project 1', 'Project 2']}
                selectedOption=""
                onSelect={() => {}}
              />
            </View>
            <TouchableOpacity style={styles.signConsentButton}>
              <Text style={styles.signConsentText}>Sign A New Form</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addProjectButton}>
              <Text style={styles.addProjectText}>
                + Aggiungi Nuovo Progetto
              </Text>
            </TouchableOpacity>
          </>
        )}

        {currentStep === 4 && (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Pagato da</Text>
              <TextInput
                style={styles.input}
                value="Cliente selezionato in precedenza"
                editable={false}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Note</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value=""
                placeholder="Insert description..."
                onChangeText={() => {}}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Deposito</Text>
              <TextInput
                style={styles.input}
                value=""
                placeholder="Campo opzionale"
                onChangeText={() => {}}
              />
            </View>
          </>
        )}

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          {currentStep > 1 && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={handlePreviousStep}
            >
              <Text style={styles.backButtonText}>Indietro</Text>
            </TouchableOpacity>
          )}
          {currentStep === 1 && (
            <TouchableOpacity style={styles.cancelButton} onPress={router.back}>
              <Text style={styles.cancelButtonText}>Annula</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.nextButton} onPress={handleNextStep}>
            <Text style={styles.nextButtonText}>
              {currentStep < 4 ? 'Avanti' : 'Salva'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const createStylesheet = (theme: any, insets: any) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.bodyBg,
    },
    container: {
      paddingHorizontal: 16,
      backgroundColor: theme.colors.bodyBg,
    },
    headerText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 16,
      color: theme.colors.textPrimary,
    },
    stepperContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
    },
    stepWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    step: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      borderRadius: 8,
      backgroundColor: theme.colors.grayLight,
    },
    activeStep: {
      backgroundColor: theme.colors.success500,
    },
    stepText: {
      color: theme.colors.textPrimary,
      fontWeight: 'bold',
    },
    stepArrow: {
      marginHorizontal: 8,
      fontSize: 18,
      color: theme.colors.textPrimary,
    },
    inputContainer: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      color: theme.colors.textPrimary,
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.inputBorder,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      backgroundColor: theme.colors.paperBg,
      color: theme.colors.textPrimary,
    },
    textArea: {
      height: 80,
      textAlignVertical: 'top',
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
    switchLabel: {
      color: theme.colors.textPrimary,
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 24,
    },
    nextButton: {
      backgroundColor: theme.colors.success500,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      flex: 1,
      marginLeft: 8,
    },
    backButton: {
      backgroundColor: theme.colors.secondaryOLight,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      flex: 1,
      marginRight: 8,
    },
    backButtonText: {
      color: theme.colors.textPrimary,
      fontWeight: 'bold',
    },
    cancelButton: {
      backgroundColor: theme.colors.errorOMain,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      flex: 1,
      marginRight: 8,
    },
    cancelButtonText: {
      color: theme.colors.error500,
      fontWeight: 'bold',
    },
    nextButtonText: {
      color: theme.colors.grayLight,
      fontWeight: 'bold',
    },
    addCustomerButton: {
      backgroundColor: theme.colors.success200,
      borderRadius: 8,
      paddingVertical: 12,
      alignItems: 'center',
      marginBottom: 16,
    },
    addCustomerText: {
      color: theme.colors.success500,
      fontWeight: 'bold',
    },
    signConsentButton: {
      backgroundColor: theme.colors.grayLight,
      borderRadius: 8,
      paddingVertical: 12,
      alignItems: 'center',
      marginBottom: 16,
    },
    signConsentText: {
      color: theme.colors.textPrimary,
      fontWeight: 'bold',
    },
    addProjectButton: {
      backgroundColor: theme.colors.success200,
      borderRadius: 8,
      paddingVertical: 12,
      alignItems: 'center',
      marginBottom: 16,
    },
    addProjectText: {
      color: theme.colors.success500,
      fontWeight: 'bold',
    },
  });

export default AddAppointmentForm;

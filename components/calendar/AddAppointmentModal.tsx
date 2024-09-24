import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from 'styled-components/native';
import {
  useSafeAreaInsets,
  SafeAreaView,
} from 'react-native-safe-area-context';
import DropdownSelector from '@components/Buttons/DropdownSelector'; // Assume you have this
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Customer, fetchCustomers } from '@/redux/reducers/customers';
import ConsentForm from './ConsentForm';

const timeOptions = [
  { label: '15 min', value: 15 },
  { label: '30 min', value: 30 },
  { label: '45 min', value: 45 },
  { label: '1 hour', value: 60 },
  { label: '2 hours', value: 120 },
  { label: '3 hours', value: 180 },
  { label: '4 hours', value: 240 },
];

interface AppointmentPayload {
  staff_id: string;
  project_id: string;
  service_id: string;
  customer_id: number;
  location_id: number;
  start_time: string;
  date: string;
  duration: number;
  price: string;
  note: string;
  status: string | null;
  paid_by: string;
  deposit: string;
}

const AddAppointmentForm = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets(); // Get the safe area insets
  const styles = createStylesheet(theme, insets);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { locations } = useSelector((state: RootState) => state.locations);
  const { userProfile } = useSelector((state: RootState) => state.user);
  const { customers } = useSelector((state: RootState) => state.customers);

  const [location, setLocation] = useState('');
  const [artist, setArtist] = useState('');
  const [service, setService] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('0');

  const [notes, setNotes] = useState('');
  const [isPartOfProject, setIsPartOfProject] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [dateTime, setDateTime] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [mode, setMode] = useState<'date' | 'time'>('date'); // Type for mode

  const [client, setClient] = useState<Customer | null>(null);
  const [clientProjects, setClientProjects] = useState<any>([]);
  const [openSignatureModal, setOpenSignatureModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');
  const [signatureImage, setSignatureImage] = useState('');

  const [paidBy, setPaidBy] = useState('');
  const [paidDeposit, setPaidDeposit] = useState('');

  const [validationError, setValidationError] = useState<string | null>(null);

  const handleChangeTime = (selectedDate?: Date) => {
    setDateTime(selectedDate || new Date());
    hideDatePicker();
  };

  const showDatepicker = () => {
    setMode('date');
    setOpenDatePicker(true);
  };

  const showTimepicker = () => {
    setMode('time');
    setOpenDatePicker(true);
  };

  const hideDatePicker = () => {
    setOpenDatePicker(false);
  };

  const handleNextStep = () => {
    let isValid = true;

    // Validation for step 1
    if (currentStep === 1) {
      if (
        !location ||
        !artist ||
        !service ||
        !duration ||
        !price ||
        !dateTime
      ) {
        setValidationError('Please fill out all the required fields.');
        isValid = false;
      } else {
        setValidationError(null); // Clear the error if everything is valid
      }
    }

    // Validation for step 2 (select client)
    if (currentStep === 2) {
      if (!client) {
        setValidationError('Please select a client.');
        isValid = false;
      } else {
        setValidationError(null); // Clear the error if everything is valid
      }
    }

    // Validation for step 3 (if part of project, select a project)
    if (currentStep === 3 && isPartOfProject) {
      if (!selectedProject) {
        setValidationError('Please select a project.');
        isValid = false;
      } else {
        setValidationError(null); // Clear the error if everything is valid
      }
    }

    if (currentStep === 4 || (currentStep === 3 && !isPartOfProject)) {
      handleSaveAppointment();
    }

    if (isValid && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSendSignature = async () => {
    const project = clientProjects.find(
      (project: any) => project.name === selectedProject,
    );
    const payload: any = {
      consent_form_id: 1,
      customer_id: client?.id,
      project_id: project?.id,
      signature: signatureImage,
    };

    try {
      const response = await global.api.post(
        '/projects/save-document',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      project.signed = true;

      return response.data;
    } catch (error) {
      Alert.alert(
        'Save Signature Failed',
        'Try again later or contact support.',
      );

      console.error('Error creating appointment:');
      throw error;
    }
  };

  const handleSaveAppointment = async () => {
    if (client) {
      const payload: AppointmentPayload = {
        staff_id: userProfile.data?.id,
        project_id:
          clientProjects.find(
            (project: any) => project.name === selectedProject,
          )?.id || 0,
        service_id:
          userProfile.data?.services.find(
            (option: any) => option.name === service,
          )?.id || 0,
        customer_id: client.id,
        location_id:
          locations?.find((option: any) => option.name === location)?.id || 0,
        start_time: dateTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        date: dateTime.toLocaleDateString().replace(/\//g, '-'),
        duration:
          timeOptions.find((option: any) => option.label === duration)?.value ||
          0,
        price: price,
        note: notes,
        status: null,
        paid_by: paidBy,
        deposit: paidDeposit,
      };

      try {
        const response = await global.api.post('/appointments', payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        Alert.alert(
          'Settings Updated',
          'Your appointment have been successfully saved.',
        );

        return response.data;
      } catch (error) {
        Alert.alert(
          'Save Appointment Failed',
          'Try again later or contact support.',
        );

        console.error('Error creating appointment:');
        throw error;
      }
    }
  };

  useEffect(() => {
    if (userProfile && locations) {
      const defaultLocation = locations.find(
        (location: any) => location.default_for_auth_user === true,
      );
      if (defaultLocation) {
        setLocation(defaultLocation.name);
      }

      setArtist(userProfile.data?.full_name);
    }
  }, [userProfile, locations]);

  useEffect(() => {
    const fetchCustomerProjects = async () => {
      if (client) {
        const projects = await global.api.get(
          '/projects?customer_id=' + client.id,
        );
        setClientProjects(projects.data.data);
      }
    };

    if (currentStep === 2) {
      dispatch(fetchCustomers(''));
    } else if (currentStep === 3 && isPartOfProject) {
      fetchCustomerProjects();
    } else if (currentStep === (isPartOfProject ? 4 : 3)) {
      setPaidBy(client?.full_name || '');
    }
  }, [currentStep]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
        <View>
          <Text style={styles.headerText}>Add Appointment</Text>

          {/* Stepper */}
          <View style={styles.stepperContainer}>
            {(isPartOfProject ? [1, 2, 3, 4] : [1, 2, 3]).map((step) => (
              <View key={step} style={styles.stepsWrapper}>
                <>
                  <TouchableOpacity
                    style={[
                      styles.step,
                      currentStep === step && styles.activeStep,
                    ]}
                    onPress={() => setCurrentStep(step)}
                  >
                    <Text style={styles.stepText}>{step}</Text>
                  </TouchableOpacity>
                </>

                {step < (isPartOfProject ? 4 : 3) && (
                  <Text style={styles.stepArrow}>➔</Text>
                )}
              </View>
            ))}
          </View>

          {/* Steps Form */}
          {currentStep === 1 && (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Location</Text>
                <DropdownSelector
                  label="Select location"
                  options={locations?.map((location) => location.name) || []}
                  selectedOption={location}
                  onSelect={setLocation}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Artist</Text>
                <DropdownSelector
                  label="Select Artist"
                  options={[userProfile.data?.full_name]}
                  selectedOption={artist}
                  onSelect={setArtist}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Service</Text>
                <DropdownSelector
                  label="Select Service"
                  options={
                    userProfile.data?.services.length > 0
                      ? userProfile.data?.services.map(
                          (service: any) => service.name,
                        )
                      : ['No available Services']
                  }
                  selectedOption={service}
                  onSelect={setService}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Duration</Text>
                <DropdownSelector
                  label="Select Duration"
                  options={timeOptions.map((option) => option.label)}
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
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <TouchableOpacity
                    style={styles.input}
                    onPress={showDatepicker}
                  >
                    <Text>{dateTime.toLocaleDateString()}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.input}
                    onPress={showTimepicker}
                  >
                    <Text>
                      {dateTime.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                  </TouchableOpacity>
                </View>

                <DateTimePickerModal
                  isVisible={openDatePicker}
                  mode={mode}
                  onConfirm={handleChangeTime}
                  onCancel={hideDatePicker}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Notes(optional)</Text>
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
                  style={{ transform: [{ scaleX: 0.75 }, { scaleY: 0.75 }] }}
                  value={isPartOfProject}
                  onValueChange={setIsPartOfProject}
                  thumbColor={
                    isPartOfProject
                      ? theme.colors.grayLight
                      : theme.colors.grayLight
                  }
                  trackColor={{
                    false: theme.colors.grayLight,
                    true: theme.colors.primary900,
                  }}
                />
              </View>
            </>
          )}

          {/* Steps 2, 3, 4: Customer, Project, Payment */}
          {currentStep === 2 && (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Client</Text>
                <DropdownSelector
                  label="Select Client"
                  options={
                    customers?.map((customer) => customer.full_name) || []
                  }
                  selectedOption={client?.full_name || ''}
                  onSelect={(option) => {
                    setClient(
                      customers?.find((c) => c.full_name === option) ?? null,
                    );
                  }}
                />
              </View>
              <TouchableOpacity style={styles.addCustomerButton}>
                <Text style={styles.addCustomerText}>+ Add Customer</Text>
              </TouchableOpacity>
            </>
          )}

          {currentStep === 3 && isPartOfProject && (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Pick a Project</Text>
                <DropdownSelector
                  label="Select Project"
                  options={clientProjects.map((project: any) => project?.name)}
                  selectedOption={selectedProject}
                  onSelect={setSelectedProject}
                />
                {selectedProject && (
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 10,
                    }}
                  >
                    <Text style={styles.headerText}>Consent form</Text>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        gap: 10,
                        justifyContent: 'space-between',
                      }}
                    >
                      <TouchableOpacity
                        style={styles.backButton}
                        onPress={() =>
                          setOpenSignatureModal(!openSignatureModal)
                        }
                      >
                        <Text style={styles.backButtonText}>
                          Sign a new form
                        </Text>
                      </TouchableOpacity>
                      {clientProjects?.find(
                        (project: any) => project?.name === selectedProject,
                      ).signed && (
                        <TouchableOpacity style={styles.backButton}>
                          <Text style={styles.backButtonText}>
                            View signed form
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                )}
              </View>
              <TouchableOpacity style={styles.addProjectButton}>
                <Text style={styles.addProjectText}>+ Add Project</Text>
              </TouchableOpacity>
            </>
          )}

          {currentStep === (isPartOfProject ? 4 : 3) && (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Paid By</Text>
                <TextInput
                  style={styles.input}
                  value={paidBy}
                  placeholder="Insert name..."
                  onChangeText={(text) => setPaidBy(text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Note(optional)</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={notes}
                  placeholder="Insert description..."
                  onChangeText={(text) => {
                    setNotes(text);
                  }}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Deposit(optional)</Text>
                <TextInput
                  style={styles.input}
                  value={paidDeposit}
                  placeholder="Insert amount..."
                  onChangeText={(text) => {
                    setPaidDeposit(text);
                  }}
                />
              </View>
            </>
          )}
        </View>

        {/* Buttons */}
        {validationError && (
          <Text style={{ color: theme.colors.error500, marginBottom: 16 }}>
            {validationError}
          </Text>
        )}
        <View style={styles.buttonsContainer}>
          {currentStep > 1 && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={handlePreviousStep}
            >
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          )}
          {currentStep === 1 && (
            <TouchableOpacity style={styles.cancelButton} onPress={router.back}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.nextButton} onPress={handleNextStep}>
            <Text style={styles.nextButtonText}>
              {currentStep < 4 ? 'Next' : 'Save'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={openSignatureModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setOpenSignatureModal(false)}
      >
        <View
          style={[
            styles.modalOverlay,
            { paddingTop: insets.top, paddingBottom: insets.bottom },
          ]}
        >
          <View style={{ flex: 1, width: '100%' }}>
            <ConsentForm
              userProfile={userProfile}
              client={client}
              handleCloseModal={() => setOpenSignatureModal(false)}
              signatureImage={signatureImage}
              setSignatureImage={setSignatureImage}
              handleSendSignature={handleSendSignature}
            />
          </View>
        </View>
      </Modal>
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
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      backgroundColor: theme.colors.bodyBg,
      flexGrow: 1,
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
    stepsWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    step: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      aspectRatio: 1,
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
    nextButtonText: {
      color: theme.colors.grayLight,
      fontWeight: 'bold',
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
    addCustomerButton: {
      backgroundColor: theme.colors.success500,
      borderRadius: 8,
      paddingVertical: 12,
      alignItems: 'center',
      marginBottom: 16,
    },
    addCustomerText: {
      color: theme.colors.bodyBg,
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
      backgroundColor: theme.colors.success500,
      borderRadius: 8,
      paddingVertical: 12,
      alignItems: 'center',
      marginBottom: 16,
    },
    addProjectText: {
      color: theme.colors.bodyBg,
      fontWeight: 'bold',
    },
    modalOverlay: {
      flex: 1,
      padding: 16,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  });

export default AddAppointmentForm;

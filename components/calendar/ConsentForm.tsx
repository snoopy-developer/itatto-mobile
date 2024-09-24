import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components/native';

import CheckIcon from '@/assets/images/svg/CheckIcon.svg';

import Signature, { SignatureViewRef } from 'react-native-signature-canvas';
import SignatureScreen from 'react-native-signature-canvas';

const ConsentForm = ({
  userProfile,
  client,
  handleCloseModal,
  signatureImage,
  setSignatureImage,
  handleSendSignature,
}: {
  userProfile: any;
  client: any;
  handleCloseModal: () => void;
  signatureImage: string;
  setSignatureImage: (image: string) => void;
  handleSendSignature: () => void;
}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStylesheet(theme, insets);

  const [checkedStatements, setCheckedStatements] = useState<number[]>([]);

  const [padOpen, setPadOpen] = useState(false);

  const handleOpenSignaturePad = () => {
    setPadOpen(true);
  };

  const handleCloseSignaturePad = () => {
    setPadOpen(false);
  };

  const toggleCheckbox = (index: number) => {
    if (checkedStatements.includes(index)) {
      setCheckedStatements(checkedStatements.filter((i) => i !== index));
    } else {
      setCheckedStatements([...checkedStatements, index]);
    }
  };

  const handleSaveSignature = () => {
    handleSendSignature();
    handleCloseModal();
  };

  const signatureRef = useRef<SignatureViewRef>(null);

  const handleOK = (signature: any) => {
    setSignatureImage(signature);
    handleCloseSignaturePad();
  };

  const handleClear = () => {
    signatureRef.current?.clearSignature();
  };

  const handleConfirm = () => {
    signatureRef.current?.readSignature();
  };

  if (padOpen) {
    const styleFootless = `.m-signature-pad--footer {display: none; margin: 0px;}`;

    return (
      <View style={[styles.padContainer]}>
        <SignatureScreen
          ref={signatureRef}
          onOK={handleOK}
          webStyle={styleFootless}
          autoClear={false}
        />
        <View style={styles.buttonContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 12,
            }}
          >
            <TouchableOpacity style={styles.cancelButton} onPress={handleClear}>
              <Text style={styles.cancelButtonText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleConfirm}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.signaturePadCloseButton}
            onPress={handleCloseSignaturePad}
          >
            <Text style={styles.signaturePadCloseButtonText}>
              Close Signature Pad
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container]}>
      <ScrollView style={styles.scroll}>
        <View style={styles.card}>
          <Text style={styles.formTitle}>CONSENT TO THE TATTOO PROCEDURE</Text>
          <View style={styles.section}>
            <Text style={styles.subSectionTitle}>Agency</Text>
            <Text style={styles.text}>Micromutazioni</Text>
            <Text style={styles.text}>Via Broggia 14 80135 Napoli P.I.</Text>
            <Text style={styles.text}>07515090632</Text>
            <Text style={styles.text}>+390815443724</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.subSectionTitle}>Client</Text>
            <Text style={styles.text}>{client?.full_name}</Text>
            <Text style={styles.text}>{client?.phone_number}</Text>
            <Text style={styles.text}>{client?.email}</Text>
          </View>
          <View style={styles.formSubtitleContainer}>
            <Text style={styles.formSubtitle}>
              PLEASE READ AND BE SURE YOU UNDERSTAND THE IMPLICATIONS OF SIGNING
            </Text>
          </View>

          <Text style={styles.openingText}>
            By signing this agreement I acknowledge that I have been given the
            full opportunity to ask any questions I may have about getting a
            tattoo and that all of my questions have been answered to my
            complete satisfaction. I specifically acknowledge that I have been
            advised of the facts and matters below and agree as follows:
          </Text>
          <View style={styles.statements}>
            {statements.map((statement, index) => (
              <TouchableOpacity
                key={index}
                style={styles.statement}
                onPress={() => toggleCheckbox(index)}
              >
                <View
                  style={[
                    styles.checkbox,
                    checkedStatements.includes(index) && styles.checkedCheckbox,
                  ]}
                >
                  <CheckIcon
                    width={20}
                    height={20}
                    color={theme.colors.paperBg}
                    style={!checkedStatements.includes(index) && { opacity: 1 }}
                  />
                </View>
                <Text style={styles.statementText}>{statement}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.closingText}>
            If any provision, section, subsection, clause or phrase of this
            Agreement is found to be unenforceable or invalid, that portion will
            be severed from this Agreement. the remainder of this agreement will
            then be construed as if the unenforceable portion had never been
            contained herein. I certify that I am an adult (and have provided
            valid proof of my age) and that I have the authority to sign this
            agreement or, if not, my parent or legal guardian must sign on my
            behalf, and that my parent or guardian legal has fully understood
            and is in agreement with this contract.
          </Text>
          <Text style={styles.signTitle}>
            I HAVE READ AND UNDERSTAND THIS AGREEMENT AND AGREE TO BE BOUND BY
            IT
          </Text>
          <View style={styles.signature}>
            <View style={styles.signatureUser}>
              <Text style={styles.signatureName}>
                {userProfile?.data?.full_name}
              </Text>
            </View>
            <View style={styles.signatureHand}>
              {signatureImage && (
                <Image
                  source={{ uri: signatureImage }}
                  resizeMode="contain"
                  style={{ width: '100%', height: '100%' }}
                />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.signaturePadOpenButton}
          onPress={handleOpenSignaturePad}
        >
          <Text style={styles.signaturePadOpenButtonText}>
            Open Signature Pad
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 12,
          }}
        >
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCloseModal}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveSignature}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const statements = [
  'If I have a condition that could affect healing from this tattoo, I will notify my tattoo artist. I am not pregnant or breastfeeding. I am not under the influence of alcohol or drugs.',
  'I have no medical or skin conditions such as, but not limited to: acne, scarring (keloid) eczema, psoriasis, freckles, moles or sunburn in the area to be tattooed that could interfere with said tattoo. If I have any type of infection or rash ANYWHERE on my body, I will notify my tattoo artist.',
  'I acknowledge that it is not reasonably possible for representatives and associates of this tattoo shop to determine whether I may have an allergic reaction to the pigments or procedures used in my tattoo, and I agree to accept the risk of such a reaction occurring.',
  'I recognize that it is always possible to get an infection as a result of getting a tattoo, particularly in the event that I do not take care of my tattoo. I have received aftercare instructions and agree to follow them while my tattoo is healing. I agree that if any touch-up work becomes necessary due to my negligence, it will be done at my expense.',
  'I understand that there may be variations in color and design between the tattoo I choose and the one created on my body. I understand that if my skin color is dark, the colors will not appear as bright as on light skin.',
  'I understand that having skin treatments, laser hair removal, plastic surgery, or other procedures that alter the skin may cause adverse changes to my tattoo.',
  'I recognize that a tattoo is a permanent change to my appearance and have not been given any guarantees such as the ability to later change or remove my tattoo. To my knowledge, I do not have a physical, mental or health impairment or disability that would impact my well-being as a direct or indirect consequence of my decision to have a tattoo.',
  'I sincerely expressed to my tattoo artist that having a tattoo is my spontaneous choice. I consent to the tattoo application and any actions or conduct of tattoo shop representatives and employees reasonably necessary to perform the tattooing procedure.',
];

const createStylesheet = (theme: any, insets: any) =>
  StyleSheet.create({
    signaturePad: {
      flex: 1,
    },
    padContainer: {
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
      justifyContent: 'space-between',
    },
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
    scroll: {
      width: '100%',
      flex: 1,
      backgroundColor: 'theme.colors.paperBg',
    },
    scrollContentContainer: {},
    card: {
      paddingHorizontal: 8,
    },
    formTitle: {
      fontSize: 24,
      textAlign: 'center',
      fontWeight: 'bold',
      color: theme.colors.textPrimary,
      marginBottom: 16,
    },
    section: {
      marginBottom: 16,
    },
    subSectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.textPrimary,
    },
    text: {
      fontSize: 14,
      color: theme.colors.text,
      marginVertical: 2,
    },
    formSubtitleContainer: {
      marginTop: 0,
      marginBottom: 16,
      width: '100%',
      paddingHorizontal: 8,
      paddingVertical: 8,
      backgroundColor: 'black',
    },
    formSubtitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
    },
    openingText: {
      fontSize: 14,
      color: theme.colors.text,
      marginBottom: 16,
    },
    statements: {
      marginBottom: 16,
    },
    statement: {
      paddingLeft: 16,
      borderLeftWidth: 3,
      borderLeftColor: theme.colors.divider,
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    checkbox: {
      width: 24,
      height: 24,
      borderWidth: 2,
      borderColor: theme.colors.inputBorder,
      borderRadius: 4,
      marginRight: 10,
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkedCheckbox: {
      backgroundColor: theme.colors.success500,
      borderColor: theme.colors.inputBorder,
    },
    statementText: {
      fontSize: 14,
      color: theme.colors.textPrimary,
      fontWeight: 'bold',
      flexShrink: 1,
    },
    closingText: {
      fontSize: 14,
      color: theme.colors.text,
      marginBottom: 16,
    },
    signTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.textPrimary,
      marginBottom: 16,
    },
    signature: {
      height: 60,
      flexDirection: 'row',
      alignItems: 'flex-end',
      position: 'relative',
    },
    signatureName: {
      fontSize: 14,
      color: theme.colors.text,
      fontStyle: 'italic',
      fontWeight: 'bold',
    },
    signatureUser: {
      width: '40%',
      borderBottomWidth: 1,
      paddingBottom: 20,
      borderColor: theme.colors.grayDark,
      alignItems: 'center',
      justifyContent: 'center',
    },
    signatureHand: {
      height: '140%',
      position: 'absolute',
      bottom: 0,
      right: '15%',
      aspectRatio: 1,
    },
    buttonContainer: {
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 16,
    },
    cancelButton: {
      backgroundColor: theme.colors.secondaryOLight,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      flex: 1,
      marginRight: 8,
    },
    cancelButtonText: {
      color: theme.colors.textPrimary,
      fontWeight: 'bold',
    },
    saveButton: {
      backgroundColor: theme.colors.success500,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      flex: 1,
      marginLeft: 8,
    },
    saveButtonText: {
      color: theme.colors.grayLight,
      fontWeight: 'bold',
    },
    signaturePadOpenButton: {
      backgroundColor: theme.colors.success600,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginLeft: 8,
      width: '100%',
    },
    signaturePadOpenButtonText: {
      color: theme.colors.grayLight,
      fontWeight: 'bold',
    },
    signaturePadCloseButton: {
      marginTop: 16,
      backgroundColor: theme.colors.error500,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginLeft: 8,
      width: '100%',
    },
    signaturePadCloseButtonText: {
      color: theme.colors.grayLight,
      fontWeight: 'bold',
    },
  });

export default ConsentForm;

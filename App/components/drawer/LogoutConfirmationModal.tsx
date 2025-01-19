import colors from '@App/constants/colors';
import {gWindowWidth} from '@App/constants/constants';
import {fonts} from '@App/constants/fonts';
import {fontScale} from '@App/utils/fontScaling';
import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface LogoutConfirmationModalProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutConfirmationModal: React.FC<LogoutConfirmationModalProps> = ({
  isVisible,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isVisible}
      onRequestClose={onCancel}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Confirm Logout</Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.message}>
              Are you sure you want to log out?
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}>
              <Text style={styles.buttonText}>Stay</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={onConfirm}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.halfTransparent, // Netflix dark overlay
  },
  modalContainer: {
    width: gWindowWidth * 0.85,
    borderRadius: 10,
    backgroundColor: colors.cardBackground,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: colors.primary, // Netflix red
    padding: 15,
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: fontScale(22),
    fontFamily: fonts.Bold,
    color: colors.textPrimary,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  message: {
    fontSize: fontScale(16),
    fontFamily: fonts.Regular,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: colors.border,
  },
  confirmButton: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    fontSize: fontScale(16),
    color: colors.textPrimary,
    fontFamily: fonts.Regular,
  },
});

export default LogoutConfirmationModal;

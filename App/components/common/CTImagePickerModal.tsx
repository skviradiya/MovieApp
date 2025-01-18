import {cameraIcon, closeIcon, galleryIcon} from '@App/assets/icons';
import colors from '@App/constants/colors';
import {fonts} from '@App/constants/fonts';
import {fontScale} from '@App/utils/fontScaling';
import React from 'react';
import {
  Alert,
  Linking,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker, {
  Image as ImageDataProps,
} from 'react-native-image-crop-picker';
import CTIcon from './CTIcon';

interface CTImagePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectImage: (image: ImageDataProps) => void;
}
const CTImagePickerModal: React.FC<CTImagePickerModalProps> = ({
  visible,
  onClose,
  onSelectImage,
}) => {
  const handleCamera = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
      mediaType: 'photo',
      includeBase64: true,
    })
      .then(image => {
        onSelectImage(image);
        onClose();
      })
      .catch(error => {
        if (
          error.message === 'User did not grant camera permission.' ||
          error.message === 'User did not grant library permission.'
        ) {
          Alert.alert(
            'Camera Permission',
            'Give camera permission for profile picture.',
            [
              {
                text: 'Cancel',
              },
              {text: 'Open Setting', onPress: () => Linking.openSettings()},
            ],
          );
        }
      });
  };

  const handleGallery = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      mediaType: 'photo',
      includeBase64: true,
    })
      .then(image => {
        onSelectImage(image);
        onClose();
      })
      .catch(error => {
        if (error.message === 'User did not grant library permission.') {
          Alert.alert(
            'Gallery Permission',
            'Give gallery permission for profile picture.',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'Open Setting', onPress: () => Linking.openSettings()},
            ],
          );
        }
      });
  };

  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
      onDismiss={onClose}>
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <CTIcon disabled source={closeIcon} iconSize={20} />
          </TouchableOpacity>
          <Text style={styles.title}>Select Image</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleCamera} style={styles.button}>
              <CTIcon disabled source={cameraIcon} iconSize={48} />
              <Text style={styles.buttonText}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleGallery} style={styles.button}>
              <CTIcon disabled source={galleryIcon} iconSize={48} />
              <Text style={styles.buttonText}>Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.halfTransparent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  title: {
    fontSize: fontScale(20),
    color: colors.textPrimary,
    marginBottom: 20,
    fontFamily: fonts.Regular,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    alignItems: 'center',
  },
  buttonText: {
    color: colors.textPrimary,
    marginTop: 10,
    fontFamily: fonts.Regular,
  },
});

export default CTImagePickerModal;

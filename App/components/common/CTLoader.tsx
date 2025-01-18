// CTLoader.tsx
import colors from '@App/constants/colors';
import React from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';

interface CTLoaderProps {
  isVisible: boolean;
}

const CTLoader: React.FC<CTLoaderProps> = ({isVisible}) => {
  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
      onRequestClose={() => {}}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContent}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.halfTransparent,
  },
  modalContent: {
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colors.primary,
    fontSize: 18,
    marginTop: 10,
  },
});

export default CTLoader;

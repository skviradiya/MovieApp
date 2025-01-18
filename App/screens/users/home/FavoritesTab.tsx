import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ITabProps} from './Home';

export default function FavoritesTab({}: ITabProps) {
  return (
    <View style={styles.container}>
      <Text>FavoritesTab</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

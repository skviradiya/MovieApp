import {noInternetIcon} from '@App/assets/icons';
import CTIcon from '@App/components/common/CTIcon';
import colors from '@App/constants/colors';
import {fonts} from '@App/constants/fonts';
import {fontScale} from '@App/utils/fontScaling';
import NetInfo from '@react-native-community/netinfo';
import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
const NoInternetScreen: React.FC<{onRetry: () => void}> = ({onRetry}) => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.background}
      />
      <CTIcon source={noInternetIcon} disabled iconSize={100} />
      <Text style={styles.title}>No Internet Connection</Text>
      <Text style={styles.subtitle}>
        Please check your connection and try again.
      </Text>
      <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
        <Text style={styles.retryText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
};

export function withInternetCheck<P extends JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<P>,
) {
  return (props: P) => {
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
      const unsubscribe = NetInfo.addEventListener(state => {
        setIsConnected(state.isConnected ?? false);
      });

      return () => unsubscribe();
    }, []);

    const handleRetry = () => {
      NetInfo.fetch().then(state => {
        setIsConnected(state.isConnected ?? false);
      });
    };

    if (!isConnected) {
      return <NoInternetScreen onRetry={handleRetry} />;
    }

    return <WrappedComponent {...props} />;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Netflix dark background
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    color: colors.textPrimary,
    fontSize: fontScale(24),
    fontFamily: fonts.Bold,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: fontScale(16),
    textAlign: 'center',
    fontFamily: fonts.Medium,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: colors.primary, // Netflix red accent
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  retryText: {
    color: colors.textPrimary,
    fontSize: fontScale(16),
    fontFamily: fonts.Bold,
  },
});

export default NoInternetScreen;

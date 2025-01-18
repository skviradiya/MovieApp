import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {IMoviesResult} from '@App/types/slice/movieSlice';
import colors from '@App/constants/colors';
import {gWindowHeight} from '@App/constants/constants';
import {fonts} from '@App/constants/fonts';
import {IMAGE_URL} from '@App/constants/tempEnv';
import {fontScale} from '@App/utils/fontScaling';
import {useNavigation} from '@react-navigation/native';
import {UserNavigationProps} from '@App/types/navigation';
import {screens} from '@App/constants/screens';

const MovieItem = ({item}: {item: IMoviesResult}) => {
  const navigation = useNavigation<UserNavigationProps>();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(screens.MovieDetailsScreen, {moviesDetails: item});
      }}
      style={styles.itemContainer}>
      <FastImage
        source={{
          uri: IMAGE_URL + item.backdrop_path,
        }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text numberOfLines={2} style={styles.overview}>
          {item.overview}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: colors.background,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 10,
    shadowColor: colors.primary,
    overflow: 'hidden',
    height: gWindowHeight / 3,
    flex: 1,
    borderWidth: 1,
  },
  image: {
    flex: 1,
  },
  textContainer: {
    position: 'absolute',
    backgroundColor: colors.cardBackground,
    width: '100%',
    bottom: 0,
    padding: 10,
  },
  title: {
    fontSize: fontScale(18),
    color: colors.textPrimary,
    fontFamily: fonts.Bold,
  },
  overview: {
    fontSize: fontScale(10),
    color: colors.textSecondary,
    fontFamily: fonts.Bold,
  },
});

export default MovieItem;

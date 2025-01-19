import CTButton from '@App/components/common/CTButton';
import CTHeader from '@App/components/common/CTHeader';
import colors from '@App/constants/colors';
import {gWindowHeight, gWindowWidth} from '@App/constants/constants';
import {firebaseCollections} from '@App/constants/firebase';
import {fonts} from '@App/constants/fonts';
import {screens} from '@App/constants/screens';

import {movieActions} from '@App/redux/slices/movieSlice';
import {useAppDispatch, useAppSelector} from '@App/redux/store';
import {UserStackNavigationParams} from '@App/types/navigation';
import {fontScale} from '@App/utils/fontScaling';
import {IMAGE_URL} from '@env';
import firestore from '@react-native-firebase/firestore';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
type Props = NativeStackScreenProps<
  UserStackNavigationParams,
  screens.MovieDetailsScreen
>;
const renderDetail = (label: string, value: string | number) => (
  <>
    <Text style={styles.labelText}>{label}</Text>
    <Text style={styles.valueText}>{value}</Text>
  </>
);
export default function MovieDetailsScreen({route, navigation}: Props) {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(data => data.user.userDetails);
  const favoritesData = useAppSelector(data => data.movie.favoritesData);
  const [isFavorite, setIsFavorite] = useState(false);

  const movieDetails = route.params.moviesDetails;
  const firestoreRef = firestore()
    .collection(firebaseCollections.users)
    .doc(userData?.uid)
    .collection(firebaseCollections.favoriteMovies);
  const onPressFavorite = () => {
    firestoreRef
      .doc(movieDetails.id.toString())
      .set({
        ...movieDetails,
        createdAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setIsFavorite(true);
        dispatch(
          movieActions.setFavoritesData([movieDetails, ...favoritesData]),
        );
      });
  };
  const onPressRemoveFavorite = () => {
    firestoreRef

      .doc(movieDetails.id.toString())
      .delete()
      .then(() => {
        setIsFavorite(false);
        dispatch(
          movieActions.setFavoritesData(
            favoritesData.filter(item => item.id !== movieDetails.id),
          ),
        );
      });
  };
  const checkFavoriteStatus = useCallback(async () => {
    const movieData = await firestoreRef.doc(movieDetails.id.toString()).get();
    if (movieData.exists) {
      setIsFavorite(true);
    }
  }, [firestoreRef, movieDetails.id]);
  useEffect(() => {
    checkFavoriteStatus();
  }, [checkFavoriteStatus]);
  return (
    <View style={styles.container}>
      <CTHeader
        onBackPress={() => navigation.goBack()}
        title={'Movie Details'}
      />
      <View style={styles.flexContainer}>
        <FastImage
          source={{uri: IMAGE_URL + movieDetails.backdrop_path}}
          style={styles.backdropImage}
        />
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <LinearGradient
            colors={[colors.transparent, colors.background]}
            locations={[0, 0.3]}
            style={styles.linearGradient}
          />
          <View style={styles.posterContainer}>
            <FastImage
              source={{uri: IMAGE_URL + movieDetails.poster_path}}
              style={styles.posterImage}
              resizeMode="cover"
            />
            <View style={styles.titleButtonContainer}>
              <Text style={styles.titleText}>{movieDetails.title}</Text>
              <CTButton
                title={isFavorite ? 'Remove' : 'Favorite'}
                onPress={isFavorite ? onPressRemoveFavorite : onPressFavorite}
                style={{
                  backgroundColor: isFavorite
                    ? colors.cardBackground
                    : colors.primary,
                }}
              />
            </View>
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.detailsColumn}>
              {renderDetail(
                'Release Date:',
                new Date(movieDetails.release_date).toLocaleDateString(
                  'en-GB',
                  {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  },
                ),
              )}
              {renderDetail('Rating:', `${movieDetails.vote_average}/10`)}
              {renderDetail('Vote:', movieDetails.vote_count)}
              {renderDetail('Popularity:', movieDetails.popularity)}
            </View>
            <View style={styles.detailsColumn}>
              {renderDetail('Language:', movieDetails.original_language)}
            </View>
          </View>
          <View style={styles.overviewContainer}>
            <Text style={styles.overviewText}>{movieDetails.overview}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flexContainer: {
    flex: 1,
  },
  backdropImage: {
    width: '100%',
    height: gWindowHeight / 3,
    position: 'absolute',
  },
  scrollViewContent: {
    paddingTop: gWindowHeight / 3 / 1.5,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  linearGradient: {
    width: gWindowWidth,
    height: gWindowHeight,
    position: 'absolute',
  },
  posterContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  posterImage: {
    width: '40%',
    backgroundColor: colors.border,
    height: gWindowHeight / 4,
    borderRadius: 10,
    elevation: 100,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
  },
  titleButtonContainer: {
    flex: 1,
    marginLeft: 20,
  },
  titleText: {
    color: colors.textPrimary,
    fontFamily: fonts.SemiBold,
    fontSize: fontScale(20),
    marginVertical: 20,
  },
  detailsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  detailsColumn: {
    flex: 1,
  },
  labelText: {
    color: colors.textSecondary,
    fontFamily: fonts.Regular,
    marginTop: 10,
    fontSize: fontScale(16),
  },
  valueText: {
    color: colors.textPrimary,
    fontFamily: fonts.Medium,
    fontSize: fontScale(16),
  },
  overviewContainer: {
    flex: 1,
    marginTop: 20,
  },
  overviewText: {
    color: colors.textSecondary,
    fontSize: fontScale(15),
    fontFamily: fonts.Medium,
  },
});

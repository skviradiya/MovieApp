import MovieItem from '@App/components/home/MovieItem';
import {firebaseCollections} from '@App/constants/firebase';
import {movieActions} from '@App/redux/slices/movieSlice';
import {useAppDispatch, useAppSelector} from '@App/redux/store';
import {IMoviesResult} from '@App/types/slice/movieSlice';
import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {ITabProps} from './Home';
import colors from '@App/constants/colors';
import {fonts} from '@App/constants/fonts';
import CTLoader from '@App/components/common/CTLoader';
export default function FavoritesTab({tabIndex}: ITabProps) {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(data => data.user.userDetails);
  const listData = useAppSelector(data => data.movie.favoritesData);
  const [loading, setLoading] = useState(false);
  const isFavoriteDataFetched = useAppSelector(
    data => data.movie.isFavoriteDataFetched,
  );
  const firestoreRef = firestore()
    .collection(firebaseCollections.users)
    .doc(userData?.uid)
    .collection(firebaseCollections.favoriteMovies);
  const getDataFromFirestoreDB = React.useCallback(() => {
    setLoading(true);
    firestoreRef
      .orderBy('createdAt', 'desc')
      .get()
      .then(data => {
        setLoading(false);
        const favMovies = data.docs.map(doc => {
          let favData = {
            ...doc.data(),
            createdAt: doc.data().createdAt.seconds,
          };
          return favData as IMoviesResult;
        });
        dispatch(movieActions.setFavoritesData(favMovies));
        dispatch(movieActions.setIsFavoriteDataFetched(true));
      })
      .catch(error => {
        console.log('🚀 ~ getDataFromFirestoreDB ~ error:', error);
        setLoading(false);
      });
  }, [firestoreRef, dispatch]);

  useEffect(() => {
    if (tabIndex === 3 && !isFavoriteDataFetched) {
      getDataFromFirestoreDB();
    }
  }, [tabIndex, getDataFromFirestoreDB, isFavoriteDataFetched]);

  const renderItem = ({item}: {item: IMoviesResult}) => {
    return <MovieItem item={item} />;
  };

  return (
    <View style={styles.container}>
      <CTLoader isVisible={loading} />
      <FlatList
        data={listData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onEndReachedThreshold={0.9}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        contentContainerStyle={styles.flatListContent}
        ListEmptyComponent={EmptyListComponent}
      />
    </View>
  );
}

const EmptyListComponent = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>No Favorites</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContent: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: colors.textPrimary,
    fontFamily: fonts.Bold,
  },
});

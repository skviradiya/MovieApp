import CTLoader from '@App/components/common/CTLoader';
import MovieItem from '@App/components/home/MovieItem';
import {fetchNowPlayingData} from '@App/redux/slices/movieSlice';
import {useAppDispatch, useAppSelector} from '@App/redux/store';
import {IMoviesResult} from '@App/types/slice/movieSlice';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ITabProps} from './Home';

export default function NowPlayingTab({}: ITabProps) {
  const dispatch = useAppDispatch();
  const listData = useAppSelector(data => data.movie.nowPlayingData);
  const pageCount = useAppSelector(data => data.movie.nowPlayingPage);
  const totalPageCount = useAppSelector(data => data.movie.nowPlayingTotalPage);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (totalPageCount <= pageCount) {
      return;
    }
    try {
      await dispatch(fetchNowPlayingData({page: pageCount + 1}));
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [dispatch, pageCount, totalPageCount]);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchNowPlayingData({page: 1}))
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [dispatch]);

  const renderItem = ({item}: {item: IMoviesResult}) => {
    return <MovieItem item={item} />;
  };

  return (
    <View style={styles.container}>
      <CTLoader isVisible={loading} />
      <FlatList
        data={listData}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        onEndReachedThreshold={0.9}
        onEndReached={fetchData}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

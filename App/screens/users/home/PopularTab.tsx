import CTLoader from '@App/components/common/CTLoader';
import MovieItem from '@App/components/home/MovieItem';
import {fetchPopularData} from '@App/redux/slices/movieSlice';
import {useAppDispatch, useAppSelector} from '@App/redux/store';
import {IMoviesResult} from '@App/types/slice/movieSlice';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ITabProps} from './Home';

export default function PopularTab({tabIndex}: ITabProps) {
  const dispatch = useAppDispatch();
  const listData = useAppSelector(data => data.movie.popularData);
  const pageCount = useAppSelector(data => data.movie.popularPage);
  const totalPageCount = useAppSelector(data => data.movie.popularTotalPage);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (totalPageCount <= pageCount) {
      return;
    }
    try {
      await dispatch(fetchPopularData({page: pageCount + 1}));
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [dispatch, pageCount, totalPageCount]);
  useEffect(() => {
    if (tabIndex === 1 && (listData?.length === 0 || !listData)) {
      setLoading(true);
      dispatch(fetchPopularData({page: 1}))
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [dispatch, tabIndex, listData]);
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

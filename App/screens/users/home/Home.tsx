import HeaderView from '@App/components/home/HeaderView';
import colors from '@App/constants/colors';
import {fonts} from '@App/constants/fonts';
import {screens} from '@App/constants/screens';
import {userActions} from '@App/redux/slices/userSlice';
import {useAppDispatch} from '@App/redux/store';
import {UserStackNavigationParams} from '@App/types/navigation';
import {readUserInfo} from '@App/utils/asyncActions';
import {fontScale} from '@App/utils/fontScaling';
import {DrawerScreenProps} from '@react-navigation/drawer';
import React, {useEffect, useRef} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {SceneRendererProps, TabView} from 'react-native-tab-view';
import FavoritesTab from './FavoritesTab';
import NowPlayingTab from './NowPlayingTab';
import PopularTab from './PopularTab';
import UpcomingTab from './UpcomingTab';

export interface ITabProps {
  tabIndex: number;
}
type Props = DrawerScreenProps<UserStackNavigationParams, screens.HomeScreen>;
export default function HomeScreen({route}: Props) {
  const changeableTabIndex = route?.params?.tabIndex || 0;
  const dispatch = useAppDispatch();
  const layout = useWindowDimensions();
  const [tabIndex, setTabIndex] = React.useState(0);
  const tablistRef = useRef<FlatList>(null);
  const routes = [
    {key: 'NowPlayingTab', title: 'Now Playing'},
    {key: 'PopularTab', title: 'Popular'},
    {key: 'UpcomingTab', title: 'Upcoming'},
    {key: 'FavoritesTab', title: 'Favorites'},
  ];
  useEffect(() => {
    setTimeout(() => {
      tablistRef.current?.scrollToIndex({
        index: changeableTabIndex,
        animated: true,
        viewPosition: changeableTabIndex > 1 ? 0 : 1,
      });
      setTabIndex(changeableTabIndex);
    }, 300);
  }, [changeableTabIndex]);
  useEffect(() => {
    readUserInfo().then(data => {
      if (data) {
        dispatch(userActions.setUserDetails(data));
      }
    });
  }, [dispatch]);
  const renderScene = ({route: sceneRoute}: {route: {key: string}}) => {
    switch (sceneRoute.key) {
      case 'NowPlayingTab':
        return <NowPlayingTab tabIndex={tabIndex} />;
      case 'PopularTab':
        return <PopularTab tabIndex={tabIndex} />;
      case 'UpcomingTab':
        return <UpcomingTab tabIndex={tabIndex} />;
      case 'FavoritesTab':
        return <FavoritesTab tabIndex={tabIndex} />;
      default:
        return null;
    }
  };
  const renderTabBar = (props: SceneRendererProps) => {
    return (
      <FlatList
        ref={tablistRef}
        horizontal
        data={routes}
        focusable
        style={styles.tabList}
        contentContainerStyle={styles.contentTabList}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          const isActive = index === tabIndex;
          const handledColor = isActive ? colors.primary : colors.placeholder;

          return (
            <TouchableOpacity
              onPress={() => {
                tablistRef.current?.scrollToIndex({
                  index,
                  animated: true,
                  viewPosition: index > 1 ? 0 : 1,
                });
                props.jumpTo(item.key);
              }}
              style={[
                styles.tabItem,
                {backgroundColor: handledColor, shadowColor: colors.primary},
              ]}>
              <Text
                style={[
                  styles.tabItemText,
                  {fontFamily: isActive ? fonts.Bold : fonts.Medium},
                ]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  };
  return (
    <View style={styles.container}>
      <HeaderView />
      <TabView
        navigationState={{index: tabIndex, routes}}
        renderScene={renderScene}
        onIndexChange={setTabIndex}
        renderTabBar={renderTabBar}
        initialLayout={{width: layout.width}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cardBackground,
  },
  tabList: {
    flexGrow: 0,
  },
  contentTabList: {
    paddingHorizontal: 10,
  },
  tabItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,

    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 100,
    borderColor: colors.primary,
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  tabItemText: {
    color: colors.textPrimary,
    fontSize: fontScale(13),
  },
});

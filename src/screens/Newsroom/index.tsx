import { View, Text, ImageBackground, FlatList, ScrollView } from 'react-native';
import React from 'react';
import { Screen } from '@components/common/Screen/Screen';
import { images } from 'assets/images';
import TransparentHeader from '@components/common/Header/transparentHeader';
import { colors } from '@theme/colors';
import { NewsItem } from '@appTypes/type';
import Card from '@components/residences/card';
import Separator from '@components/common/Separator';
import LeftArrow from '@assets/images/svgs/leftArrow.svg'
import { useNavigation } from '@react-navigation/native';
import { ARTICLEDETAIL } from '@navigators/navigation-routes';

const data: NewsItem[] = [
  {
    id: 1,
    badge: ['REPORT'],
    title: 'Sustainable Living: Eco-Friendly Trends in Urban Development',
    description:
      'Explore how urban areas are integrating sustainability into architecture and community planning.',
    date: '2025-10-25',
    image: 'https://example.com/images/news1.jpg',
  },
  {
    id: 2,
    badge: ['PRESS RELEASE'],
    title: 'Smart Cities: The Future of Urban Living',
    description:
      'Explore how urban areas are integrating sustainability into architecture and community planning.',
    date: '2025-10-25',
    image: 'https://example.com/images/news2.jpg',
  },
  {
    id: 3,
    badge: ['REPORT'],
    title: 'Revitalizing Community Spaces: The Importance of Public Areas',
    description:
      'Explore how urban areas are integrating sustainability into architecture and community planning.',
    date: '2025-10-25',
    image: 'https://example.com/images/news3.jpg',
  },
  {
    id: 4,
    badge: ['REPORT'],
    title: 'Revitalizing Community Spaces: The Importance of Public Areas',
    description:
      'Explore how urban areas are integrating sustainability into architecture and community planning.',
    date: '2025-10-25',
    image: 'https://example.com/images/news3.jpg',
  },
];

const Newsroom = () => {
  const navigation = useNavigation();
  return (
    <Screen preset="fixed" contentContainerStyle={{ flexGrow: 1 }}>
      <ImageBackground
        source={images?.residenceBg}
        style={{ width: '100%', flexGrow: 1 }}
        resizeMode="cover">
        <ScrollView>
          <TransparentHeader
            title="Newsroom"
            titleColor={colors.palette.black}
            showBackButton={true}
            icon={<LeftArrow />}
          // showSeparator={true}
          />
          <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ marginTop: 10 }}
            ItemSeparatorComponent={() => (
              <View style={{ marginBottom: 16 }}>
                <Separator />
              </View>
            )}
            renderItem={({ item, index }) => (
              <Card
                key={index}
                title={item.title}
                //   type={item.description}
                desc={item?.description}
                isFavourite={false}
                date={item.date}
                //   price={item.price}
                badgeTitle={item.badge}
                isNewsroom={true}
                onPress={() => navigation.navigate(ARTICLEDETAIL as never)}
              />
            )}
          />
        </ScrollView>
      </ImageBackground>
    </Screen>
  );
};

export default Newsroom;

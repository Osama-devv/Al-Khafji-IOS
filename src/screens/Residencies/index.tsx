import {
  FlatList,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Screen} from '@components/common/Screen/Screen';
import Card from '@components/residences/card';
import CustomButton from '@components/common/CustomButton';
import Header from '@components/common/Header';
import {images} from 'assets/images';
import Sheet from '@components/common/sheet';
import {useSelector} from 'react-redux';
import {IState} from '@reducers/index';
import {LanguageEnum} from '@appTypes/enums';
import {useNavigation} from '@react-navigation/native';
import {
  RESIDENCE_DETAILS,
  RESIDENCEFILTERS,
} from '@navigators/navigation-routes';
import CommunityCard from '@components/residences/communityCard';
import Separator from '@components/common/Separator';
import {$textAlign} from '@theme/view';

const data = [
  {id: '1', title: 'All Residences', color: '#00646E'},
  {id: '2', title: 'Signature Villas'},
  {id: '3', title: 'Sky Apartments'},
  {id: '4', title: 'Luxury Villa'},
  {id: '5', title: 'Sky Apartments'},
  {id: '6', title: 'Luxury Villa'},
];

type CardProps = {
  title: string;
  type: string;
  price: string;
  badgeTitle: Array<string>;
};

const COMMUNITY_DATA = [
  {
    id: '1',
    title: 'Ansam',
    // You can put specific image URLs here if needed, or handle inside the card
    imageUrl: 'https://via.placeholder.com/300',
  },
  {
    id: '2',
    title: 'Murjan 1',
    imageUrl: 'https://via.placeholder.com/300',
  },
  {
    id: '3',
    title: 'Murjan 2',
    imageUrl: 'https://via.placeholder.com/300',
  },
  {
    id: '4',
    title: 'Murjan 3',
    imageUrl: 'https://via.placeholder.com/300',
  },
];

const featuresCards: CardProps[] = [
  {
    title: 'Signature Villa',
    type: 'Type 02 • 4 bedrooms • 456.75 m²',
    price: 'From 1,000,000 SAR',
    badgeTitle: ['DURRAT AL KHAFJI', 'ANSAM'],
  },
  {
    title: 'Luxury Villa',
    type: 'Type 02 • 5 bedrooms • 556.75 m²',
    price: 'From 1,400,000 SAR',

    badgeTitle: ['MURJAN AL KHAFJI'],
  },
  {
    title: 'Luxury Villa',
    type: 'Type 02 • 3 bedrooms • 406.75 m²',
    price: 'From 9,00,000 SAR',

    badgeTitle: ['DURRAT AL KHAFJI', 'ANSAM'],
  },
];

const Residencies = () => {
  const navigation = useNavigation();
  const {options} = useSelector((state: IState) => state.startup);
  const {language} = options;
  const appLanguage: LanguageEnum = language ?? LanguageEnum.AR;
  const handleNavigate = () => {
    navigation.navigate(RESIDENCEFILTERS as never);
  };
  const handleNavigateToResidenceDetails = () => {
    navigation.navigate(RESIDENCE_DETAILS as never);
  };

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Screen
        preset="fixed"
        safeAreaEdges={['bottom']}
        style={{backgroundColor: 'transparent'}}
        StatusBarProps={{
          translucent: true,
          backgroundColor: 'transparent',
        }}
        backgroundColor="transparent">
          <ImageBackground
            source={images?.residenceBg}
            style={{width: '100%',  minHeight: '100%'}}
            resizeMode="cover">
        <ScrollView contentContainerStyle={{paddingBottom: 80}}
        showsVerticalScrollIndicator={false}>
            <Header
              title={'Residences'}
              icon={images.filterIcon}
              showBadge={true}
              onIconPress={handleNavigate}
              appLanguage={appLanguage}
              transparent={true}
            />

            <View style={{marginBottom: 12}}>
              <View style={styles.listContainer}>
                <Text style={[styles.headerTitle, $textAlign(appLanguage)]}>
                  By Community
                </Text>

                <FlatList
                  data={COMMUNITY_DATA}
                  keyExtractor={item => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  inverted={appLanguage === LanguageEnum.AR}
                  contentContainerStyle={styles.listContent}
                  renderItem={({item}) => (
                    <CommunityCard item={item} appLanguage={appLanguage} />
                  )}
                />
              </View>
              <Separator />
            </View>
            {/*
          <FlatList
      horizontal
      data={data}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false} 
      inverted={appLanguage === LanguageEnum.AR}
      contentContainerStyle={{ paddingHorizontal: 10, gap: 8, paddingVertical: 8, borderWidth: 0.5 }}
      renderItem={({ item }) => (
        <CustomButton title={item.title} 
        variant={item.id === '2' ? 'primary' : 'outline'} />
      )}
    /> */}
            <View style={styles.listContainer}>
              <Text style={[styles.headerTitle, $textAlign(appLanguage)]}>
                Featured
              </Text>
            </View>
            <View style={{paddingBottom: 16}}>
              {featuresCards.map((item, index) => (
                <Card
                  key={index}
                  title={item.title}
                  type={item.type}
                  price={item.price}
                  badgeTitle={item.badgeTitle}
                  onPress={handleNavigateToResidenceDetails}
                />
              ))}

              <Separator />
            </View>
            {/* <View style={{paddingBottom: 16}}>
          <Card />
          <Separator />
        </View>
        <View style={{paddingBottom: 16}}>
          <Card />
          <Separator />
        </View> */}
        </ScrollView>
          </ImageBackground>
      </Screen>
    </>
  );
};

export default Residencies;

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 16,
    // fontWeight: '700',
    color: '#333',
    fontFamily: 'Charter',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
});

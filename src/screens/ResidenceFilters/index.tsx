import {
  FlatList,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {use, useState} from 'react';
import {Screen} from '@components/common/Screen/Screen';
import {images} from 'assets/images';
import Header from '@components/common/Header';
import {useDispatch, useSelector} from 'react-redux';
import {IState} from '@reducers/index';
import {LanguageEnum} from '@appTypes/enums';
import {useNavigation} from '@react-navigation/native';
import DistrictCard from '@components/residences/districtCard';
import {colors} from '@theme/colors';
import Separator from '@components/common/Separator';
import CustomButton from '@components/common/CustomButton';
import {RangeSlider} from '@components/common/Slider';
import {CounterSelector} from '@components/common/CounterSelector';
import {$directionRtl, $flexDirection} from '@theme/view';
import khafjiIcon from '../../.././assets/images/svgs/khafji.svg';
import {updateFiltersPayload} from '@reducers/residence-filters/residence-filters-slice';

let districtCardData = [
  {id: '1', title: 'Al Khafji', source: khafjiIcon},
  {id: '2', title: 'Al Khafji', source: khafjiIcon},
  {id: '3', title: 'Al Khafji', source: khafjiIcon},
  {id: '4', title: 'Al Khafji', source: khafjiIcon},
  {id: '5', title: 'Al Khafji', source: khafjiIcon},
  {id: '6', title: 'Al Khafji', source: khafjiIcon},
  {id: '7', title: 'Al Khafji', source: khafjiIcon},
  {id: '8', title: 'Al Khafji', source: khafjiIcon},
  {id: '9', title: 'Al Khafji', source: khafjiIcon},
  {id: '10', title: 'Al Khafji', source: khafjiIcon},
];

const communities = [
  {id: '1', title: 'Ansam'},
  {id: '2', title: 'Village Beach 1'},
  {id: '3', title: 'Murjan 1'},
  {id: '4', title: 'Murjan 2'},
  {id: '5', title: 'Murjan 4'},
];

const unitTypes = [
  {id: '1', title: 'Signature Villas'},
  {id: '2', title: 'Luxury Villas'},
  {id: '3', title: 'Premium Townhouses'},
  {id: '4', title: 'Luxury Villas'},
  {id: '5', title: 'Premium Townhouses'},
];

const ResidenceFilters = () => {
  const navigation = useNavigation();
  const {options} = useSelector((state: IState) => state.startup);
  const {payload: selectedFilters} = useSelector(
    (state: IState) => state.residenceFilters,
  );
  const dispatch = useDispatch();
  const [bedrooms, setBedrooms] = useState<number | null>(null);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const defaultPrice = {minValue: 3000000, maxValue: 12000000};
  const [priceRange, setPriceRange] = useState<{
    minValue: number;
    maxValue: number;
  }>(defaultPrice);

  const {language} = options;
  const appLanguage: LanguageEnum = language ?? LanguageEnum.AR;

  React.useEffect(() => {
    if (selectedFilters?.payload) {
      if (selectedFilters.payload.districts)
        setSelectedDistricts(selectedFilters.payload.districts);
      if (selectedFilters.payload.communities)
        setSelectedCommunities(selectedFilters.payload.communities);
      if (selectedFilters.payload.unitTypes)
        setSelectedUnitTypes(selectedFilters.payload.unitTypes);
      if (
        selectedFilters.payload.bedrooms !== null &&
        selectedFilters.payload.bedrooms !== undefined
      )
        setBedrooms(selectedFilters.payload.bedrooms);

      // if (selectedFilters.payload.priceRange)  setPriceRange(selectedFilters.payload.priceRange) ;
      if (selectedFilters.payload.priceRange) {
        setPriceRange(selectedFilters.payload.priceRange);
      } else {
        setPriceRange(defaultPrice);
      }
    }
  }, [selectedFilters]);

  const increaseBedrooms = () => {
    setBedrooms(prev => (prev === null ? 1 : prev + 1));
    setIsDirty(true);
  };

  const decreaseBedrooms = () => {
    setBedrooms(prev => {
      if (prev === null) return null;
      if (prev === 1) return null; // 1 → Any
      setIsDirty(true);
      return prev - 1;
    });
  };

  const handleApplyFilter = () => {
    dispatch(
      updateFiltersPayload({
        payload: {
          districts: selectedDistricts,
          communities: selectedCommunities,
          unitTypes: selectedUnitTypes,
          bedrooms: bedrooms,
          priceRange: priceRange,
        },
      }),
    );
    navigation.goBack();
  };

  const handlePriceChange = (values: {minValue: number; maxValue: number}) => {
    // keep controlled price state
    setPriceRange(values);
    // determine if price differs from defaults
    //  const priceChanged = values.minValue !== defaultPrice.minValue || values.maxValue !== defaultPrice.maxValue;
    const priceChanged =
      values.minValue !== defaultPrice.minValue ||
      values.maxValue !== defaultPrice.maxValue;
    // also consider other selected filters so clearing price back to default doesn't wipe other changes
    const otherFiltersChanged =
      selectedDistricts.length > 0 ||
      selectedCommunities.length > 0 ||
      selectedUnitTypes.length > 0 ||
      bedrooms !== null;
    //setIsDirty(priceChanged || otherFiltersChanged);
  };

  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedCommunities, setSelectedCommunities] = useState<string[]>([]);
  const [selectedUnitTypes, setSelectedUnitTypes] = useState<string[]>([]);

  const handleDistrictPress = (id: string) => {
    setSelectedDistricts(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
    setIsDirty(true);
  };

  const handleCommunityPress = (id: string) => {
    setSelectedCommunities(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
    setIsDirty(true);
  };

  const handleUnitTypePress = (id: string) => {
    setSelectedUnitTypes(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
    setIsDirty(true);
  };

  const handleClearAll = () => {
    setSelectedDistricts([]);
    setSelectedCommunities([]);
    setSelectedUnitTypes([]);
    setBedrooms(null);
    setPriceRange(defaultPrice);
    setIsDirty(true);
  };

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Screen
        preset="auto"
        safeAreaEdges={['bottom']}
        style={{backgroundColor: 'transparent'}}
        StatusBarProps={{
          translucent: true,
          backgroundColor: 'transparent',
        }}
        backgroundColor="transparent">
        <Header
          title={'Filters'}
          icon={images.crossIcon}
          showBadge={true}
          onIconPress={() => {
            navigation.goBack();
          }}
          appLanguage={appLanguage}
        />
        <ImageBackground
          source={images?.residenceBg}
          style={{width: '100%', flexGrow: 1}}
          resizeMode="cover">
          <View style={[styles.container, $directionRtl(appLanguage)]}>
            <Text style={styles.text}>All Districts</Text>
            <View style={styles.gridContainer}>
              <View style={styles.gridContainer}>
                {districtCardData.map(item => (
                  <DistrictCard
                    key={item.id}
                    source={item.source}
                    isSelected={selectedDistricts.includes(item.id)}
                    onPress={() => handleDistrictPress(item.id)}
                  />
                ))}
              </View>
            </View>
          </View>
          <Separator />
          <View style={[styles.container, $directionRtl(appLanguage)]}>
            <Text style={styles.text}>All Communities</Text>
            <FlatList
              data={communities}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.flatlistWrapper}
              // renderItem={({ item }) => (
              //   <CustomButton title={item.title} variant="outline" />
              // )}
              renderItem={({item}) => (
                <View
                  style={[
                    selectedCommunities.includes(item.id) &&
                      styles.selectionButton,
                  ]}>
                  <CustomButton
                    title={item.title}
                    variant="ghost"
                    onPress={() => handleCommunityPress(item.id)}
                  />
                </View>
              )}
            />
          </View>
          <Separator />
          <View style={[styles.container, $directionRtl(appLanguage)]}>
            <Text style={styles.text}>Any Unit Types</Text>
            <FlatList
              data={unitTypes}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.flatlistWrapper}
              // renderItem={({ item }) => (
              //   <CustomButton title={item.title} variant="outline" />
              // )}
              renderItem={({item}) => (
                <View
                  style={[
                    selectedUnitTypes.includes(item.id) &&
                      styles.selectionButton,
                  ]}>
                  <CustomButton
                    title={item.title}
                    variant="outline"
                    onPress={() => handleUnitTypePress(item.id)}
                  />
                </View>
              )}
            />
          </View>
          <Separator />
          {/* Bedroom Counter */}
          <CounterSelector
            label="Bedrooms"
            value={bedrooms}
            onIncrease={increaseBedrooms}
            onDecrease={decreaseBedrooms}
            appLanguage={appLanguage}
          />
          <Separator />
          <View style={styles.container}>
            <Text style={styles.text}>Price (All)</Text>

            {/* Price Slider */}
            <RangeSlider
              min={3000000}
              max={12000000}
              minValue={priceRange?.minValue ?? defaultPrice.minValue}
              maxValue={priceRange?.maxValue ?? defaultPrice.maxValue}
              onChange={handlePriceChange}
            />
          </View>
          <View style={[styles.bottomContainer, $flexDirection(appLanguage)]}>
            <CustomButton
              title={'Clear All'}
              variant="outline"
              size="lg"
              onPress={handleClearAll}
            />
            <CustomButton
              title={'Apply Filters'}
              variant="primary"
              size="lg"
              onPress={handleApplyFilter}
              disabled={!isDirty}
            />
          </View>
        </ImageBackground>
      </Screen>
    </>
  );
};

export default ResidenceFilters;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    gap: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  text: {
    color: colors.textPrimary,
    fontSize: 16,
    lineHeight: 23.4,
    fontFamily: 'Charter',
  },
  flatlistWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  bottomContainer: {
    gap: 12,
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: colors.palette.white,
  },
  selectionButton: {
    borderWidth: 0.5,
    borderColor: colors.tabactive,
    borderRadius: 2,
    backgroundColor: colors.palette.white,
  },
});

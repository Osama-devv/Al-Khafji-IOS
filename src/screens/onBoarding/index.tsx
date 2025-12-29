import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import LanguageDropDown from './LanguageDropDown';
import { slides } from './slides';
import { useDispatch } from 'react-redux';
import { setStartupOptions } from '@reducers/startup/startup-slice';


const { width, height } = Dimensions.get('window');
const wp = (percent: number) => (width * percent) / 100;
const hp = (percent: number) => (height * percent) / 100;

interface OnBoardingScreenProps {
  onDone?: () => Promise<void> | void;
}

interface SlideItem {
  key: string;
  title: string;
  text: string;
  image?: { uri: string };
  backgroundColor?: string;
}


const INACTIVE_DOT_OPACITY = 0.4;
const INACTIVE_DOT_SCALE = 0.8;

const OnBoardingScreen: React.FC<OnBoardingScreenProps> = ({ onDone }) => {
  const carouselRef = useRef<Carousel<SlideItem> | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const dispatch = useDispatch();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      carouselRef.current?.snapToNext();
    } else {
      handleGetStarted();
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      carouselRef.current?.snapToPrev();
    }
  };

  const handleGetStarted = async () => {
    if (onDone) await onDone();
    dispatch(
      setStartupOptions({
        showIntroSlides: false,
      }),
    );

  };

  const renderItem = ({ item }: { item: SlideItem }) => (
    <View style={styles.slide}>
      <View style={styles.langContainer}>
        <LanguageDropDown
          onSelect={(lang) => console.log('Language selected:', lang)}
        />
      </View>

      {item.image && <Image source={item.image} style={styles.image} />}
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  const onScroll = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={slides}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width}
        onSnapToItem={onScroll}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        layout="default"
      />

      {/* Pagination Dots */}
      <Pagination
        dotsLength={slides.length}
        activeDotIndex={currentSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.activeDot}
        inactiveDotOpacity={INACTIVE_DOT_OPACITY}
        inactiveDotScale={INACTIVE_DOT_SCALE}
        inactiveDotStyle={styles.inactiveDot}
      />

      {/* Buttons */}
      <View style={styles.footer}>
        {currentSlide !== slides.length - 1 && (
          <TouchableOpacity
            style={styles.skipBtn}
            onPress={handleGetStarted}
            activeOpacity={0.8}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}

        <View style={styles.bottomButtons}>
          {currentSlide > 0 && (
            <TouchableOpacity
              style={[styles.btn, styles.backBtn]}
              onPress={handleBack}>
              <Text style={[styles.btnText, styles.backText]}>Back</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[
              styles.btn,
              currentSlide === 0 ? styles.fullWidthBtn : styles.nextBtn,
            ]}
            onPress={handleNext}>
            <Text style={styles.btnText}>
              {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(6),
    paddingTop: hp(10),
  },
  langContainer: {
    position: 'absolute',
    top: hp(6),
    right: wp(5),
    zIndex: 10,
  },
  image: {
    width: wp(70),
    height: hp(30),
    resizeMode: 'contain',
    marginBottom: hp(5),
  },
  title: {
    fontSize: wp(5.5),
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: hp(1.5),
    color: '#000',
    textTransform: 'uppercase',
  },
  text: {
    textAlign: 'center',
    fontSize: wp(3.5),
    color: '#555',
    lineHeight: hp(2.5),
    marginHorizontal: wp(5),
    marginBottom: hp(3),
  },
  paginationContainer: {
    paddingVertical: hp(1),
  },
  activeDot: {
    width: wp(2.5),
    height: wp(2.5),
    borderRadius: wp(1.25),
    backgroundColor: '#000',
  },
  inactiveDot: {
    backgroundColor: '#D3D3D3',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: hp(2),
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 0.4,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  skipBtn: {
    position: 'absolute',
    top: -hp(6),
    right: wp(5),
  },
  skipText: {
    fontSize: wp(3.8),
    color: '#555',
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(90),
  },
  btn: {
    flex: 1,
    paddingVertical: hp(1.8),
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextBtn: {
    backgroundColor: '#000',
    marginLeft: wp(2.5),
  },
  backBtn: {
    backgroundColor: '#EAEAEA',
    marginRight: wp(2.5),
  },
  fullWidthBtn: {
    backgroundColor: '#000',
    width: '100%',
  },
  btnText: {
    color: '#fff',
    fontSize: wp(4),
    fontWeight: '600',
  },
  backText: {
    color: '#000',
  },
});

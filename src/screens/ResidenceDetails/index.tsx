import React, { useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Text,
  Linking,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Screen } from "@components/common/Screen/Screen";
import ImageSlider from "@components/ImageSlider";
import SimpleButton from "@components/common/CustomButton/SimpleButton";
import CustomButton from "@components/common/CustomButton";
import Separator from "@components/common/Separator";
import { ContentBlock } from "@components/common/ContentBlock";

import { useSelector } from "react-redux";
import { IState } from "@reducers/index";
import { LanguageEnum } from "@appTypes/enums";
import { $directionRtl } from "@theme/view";
import { images } from "../../../assets/images";
import { colors } from "@theme/colors";
import ColorFilledButton from "@components/common/ColorFilledButton";
import View360Icon from "../../../assets/images/svgs/view360.svg";
import DownloadIcon from "../../../assets/images/svgs/download2.svg";
import CalculatorIcon from "../../../assets/images/svgs/calculator2.svg";
import MapIcon from "../../../assets/images/svgs/map-pin.svg";

import PlotDetailList from "@components/common/PlotDetailList";
import MaterialList from "@components/common/MaterialList";
import { GalleryItem, MaterialCardItem } from "@appTypes/type";
import AmenitiesList from "@components/common/AmenitiesList";
import NewsList from "@components/common/NewsList";
import PriceCTA from "@components/common/PriceCTA";
import DownloadBrochureSheet from "@components/common/DownloadBrochureSheet";
import UnitLayoutSheet from "@components/common/UnitLayoutSheet";
import AmenitiesSheet from "@components/common/AmenitiesSheet";
import GalleryModal from "@components/common/GalleryModal";

const { width } = Dimensions.get('window');


export const STATIC_GALLERY: GalleryItem[] = [
  {
    image: images.residentDetail,
    title: "Primary Bedroom",
    subtitle: "Main Entrance",
  },
  {
    image: images.homeBanner,
    title: "Secondary Bedroom",
    subtitle: "First Floor",
  },
  {
    image: images.homeBanner,
    title: "Majlis",
    subtitle: "Ground Floor",
  },
  {
    image: images.aboutBg,
    title: "Roof View",
    subtitle: "Second Floor",
  },
  {
    image: images.facilities1,
    title: "Entrance Hall",
    subtitle: "Ground Entrance",
  },
];

const TYPE_DESCRIPTIONS: Record<string, string> = {
  "1": "Rare 2 bedroom 2 bathroom condo located in town / mid-wilshire proper. It's great for a young professional who enjoys going out and being a part of that big city action as it's centrally located, minutes away from downtown. ",
  "2": "Rare 3 bedroom 3 bathroom condo located in town / mid-wilshire proper. It's great for a young professional who enjoys going out and being a part of that big city action as it's centrally located, minutes away from downtown. ",
  "3": "Rare 4 bedroom 4 bathroom condo located in town / mid-wilshire proper. It's great for a young professional who enjoys going out and being a part of that big city action as it's centrally located, minutes away from downtown. ",
};

const DETAILS_LIST = [
  { label: "Plot Size", value: "~456.75 m²" },
  { label: "Built-Up Area", value: "~400–430 m²" },
  { label: "Dimensions", value: "20.3 m x 22.5 m" },
  { label: "Year", value: "Q4 2026" },
  { label: "Height", value: "12.35 m" },
  { label: "Floors", value: "G + 1" },
  { label: "Levels", value: "Ground + First + Roof parapet" },
];
export const NEWS_DATA_NO_BADGE = [
  {
    id: "1",
    title: "Ground Floor",
    date: "A one-of-a-kind Address on the Shores of Durrat Al Khafji",
    image: images.unit,
  },
  {
    id: "2",
    title: "First Floor",
    date: "A one-of-a-kind Address on the Shores of Durrat Al Khafji",
    image: images.unit,
  },
  {
    id: "3",
    title: "Roof Parapet",
    date: "A one-of-a-kind Address on the Shores of Durrat Al Khafji",
    image: images.unit,
  },
];


const MATERIAL_FEATURES: Record<string, MaterialCardItem[]> = {
  exterior: [
    {
      id: 1,
      title: "Natural Hardwood",
      image: images.material1,
    },
    {
      id: 2,
      title: "Khaleeji motifs",
      image: images.material2,
    },
    {
      id: 3,
      title: "Khaleeji Doors",
      image: images.material3,
    },
  ],
  interior: [
    {
      id: 4,
      title: "Marble Flooring",
      image: images.material3,
    },
    {
      id: 5,
      title: "Ceramic Tiles",
      image: images.material1,
    },
    {
      id: 6,
      title: "Modern Finish",
      image: images.material2,
    },
  ],
};

const amenitiesData = [
  { id: 1, title: "Kitchen Island" },
  { id: 2, title: "High Ceilings" },
  { id: 3, title: "Three Living Areas" },
  { id: 4, title: "Pantry" },
];

const ResidenceDetails = () => {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeType, setActiveType] = useState("1");
  const [activeMaterial, setActiveMaterial] = useState("exterior");
  const [showBrochureSheet, setShowBrochureSheet] = useState(false);
  const [showUnitLayoutSheet, setShowUnitLayoutSheet] = useState(false);
  const [showAmenitiesSheet, setShowAmenitiesSheet] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [initialGalleryIndex, setInitialGalleryIndex] = useState(0);

  const { options } = useSelector((state: IState) => state.startup);
  const appLanguage = options.language ?? LanguageEnum.AR;
  const isRtl = appLanguage === LanguageEnum.AR;
  console.log("ghell");
  return (
    <Screen
      preset="scroll"
      style={[styles.screen, { paddingTop: 0, marginTop: 0 }]}
      contentContainerStyle={{ paddingTop: 0, marginTop: 0 }}
    >

      <StatusBar translucent backgroundColor="transparent" />

      <ImageSlider
        images={STATIC_GALLERY.map(i => i.image)}
        onBack={() => navigation.goBack()}
        onFavorite={() => setIsFavorite(!isFavorite)}
        onShare={() => { }}
        onPressImage={(index) => {
          console.log("ImageSlider tapped! Index:", index);
          setInitialGalleryIndex(index);
          setShowGallery(true);
        }}
        isFavorite={isFavorite}
        rtl={isRtl}
      />

      <ImageBackground source={images.residenceBg} style={styles.bg} resizeMode="cover">
        <Text style={[styles.title, { textAlign: isRtl ? "right" : "left" }]}>
          Signature Villa
        </Text>
        <View style={[styles.locationButtons, $directionRtl(appLanguage)]}>
          <SimpleButton title="ANSAM" backgroundColor="#e3e0dc" />
          <SimpleButton title="DURRAT AL KHAFJI" backgroundColor="#e3e0dc" />
        </View>

        <Separator />

        <View style={styles.Gap} />

        <View style={[styles.typeContainer, { flexDirection: isRtl ? "row-reverse" : "row" }]}>
          {["1", "2", "3"].map((type) => {
            const isActive = activeType === type;

            return (
              <CustomButton
                key={type}
                title={`Type 0${type}`}
                variant="clear"
                size="tabMd"
                onPress={() => setActiveType(type)}
                backgroundColor={isActive ? colors.tabactive : "transparent"}
                activeBorderColor={isActive ? "#92b9bb" : colors.borderColor}
                style={[
                  styles.wideTabButton,
                  isActive
                    ? { borderWidth: 1 }
                    : { borderWidth: 0 },
                ]}
                textStyle={[
                  {
                    color: isActive ? colors.palette.white : colors.textPrimary,
                    fontFamily: "Charter",
                  },
                ]}
              />
            );
          })}
        </View>


        <View style={styles.Gap} />
        <Separator />

        <View style={styles.contentWrapper}>
          <ContentBlock
            description={TYPE_DESCRIPTIONS[activeType]}
            linkText="Show"
            seeLessText="See Less"
            rtl={isRtl}
          />
        </View>

        <View style={styles.buttonWrapper} >

          <ColorFilledButton
            title="Explore 3D model"
            onPress={() => {
              console.log('Navigate to Auth');
            }}
            backgroundColor={colors.palette.buttonBackground}
            leftIcon={<View360Icon width={24} height={24} />}
            titleColor={colors.palette.black}
            rtl={isRtl}
          />

        </View>
        <View style={styles.separatorSpacing}>
          <Separator />
        </View>
        <Text style={[styles.heading, { textAlign: isRtl ? "right" : "left" }]}>
          Residence Details
        </Text>
        <View style={styles.detailsWrapper} >
          <PlotDetailList data={DETAILS_LIST} rtl={isRtl} />
        </View>
        <View style={styles.buttonWrapper} >
          <ColorFilledButton
            title="Download Brochure"
            onPress={() => setShowBrochureSheet(true)}
            backgroundColor={colors.palette.primaryColor}
            rightIcon={<DownloadIcon width={24} height={24} />}
            titleColor={colors.palette.white}
            rtl={isRtl}
          />

        </View>
        <View style={styles.buttonWrapper} >

          <ColorFilledButton
            title="Mortgage Calculator"
            onPress={() => {
              console.log('Navigate to Auth');
            }}
            backgroundColor={colors.palette.buttonBackground}
            rightIcon={<CalculatorIcon width={24} height={24} />}
            titleColor={colors.palette.black}
            rtl={isRtl}
          />
        </View>
        <View style={styles.separatorSpacing}>
          <Separator />
        </View>
        <Text style={[styles.heading, { textAlign: isRtl ? "right" : "left" }]}>
          Location
        </Text>
        <View style={{ paddingHorizontal: 16, marginVertical: 8 }}>
          <Image
            source={images.location}
            style={{ width: "100%", height: 200, borderRadius: 2 }}
            resizeMode="cover"
          />
        </View>
        <View style={styles.buttonWrapper}>
          <ColorFilledButton
            title="Show on map"
            onPress={() => Linking.openURL("https://maps.google.com")}
            backgroundColor={colors.palette.buttonBackground}
            leftIcon={<MapIcon width={24} height={24} />}
            titleColor={colors.palette.black}
            rtl={isRtl}
          />
        </View>
        <View style={styles.separatorSpacing}>
          <Separator />
        </View>
        <Text style={[styles.heading, { textAlign: isRtl ? "right" : "left" }]}>
          Materials and Finishes
        </Text>
        <View style={styles.separatorSpacing}>
          <Separator />
        </View>
        <View style={[styles.typeContainer, { flexDirection: isRtl ? "row-reverse" : "row" }]}>
          {["exterior", "interior"].map((type) => {
            const isActive = activeMaterial === type;
            const title = type === "exterior" ? "Exterior" : "Interior";

            return (
              <CustomButton
                key={type}
                title={title}
                variant="clear"
                size="tabMd"
                onPress={() => setActiveMaterial(type)}
                backgroundColor={isActive ? colors.tabactive : "transparent"}
                activeBorderColor={isActive ? "#92b9bb" : colors.borderColor}
                style={[
                  { flex: 1 },
                  isActive ? { borderWidth: 1 } : { borderWidth: 0 },
                ]}
                textStyle={[
                  { color: isActive ? colors.palette.white : colors.textPrimary },
                ]}
              />
            );
          })}
        </View>
        <View style={styles.separatorSpacing}>
          <Separator />
        </View>
        <MaterialList data={MATERIAL_FEATURES[activeMaterial]} rtl={isRtl} />
        <View style={styles.separatorSpacing}>
          <Separator />
        </View>
        <Text style={[styles.heading, { textAlign: isRtl ? "right" : "left" }]}>
          Features and Amenities
        </Text>
        <View style={{ paddingHorizontal: 16 }}>
          <AmenitiesList data={amenitiesData} appLanguage={appLanguage} />
        </View>
        <View style={styles.buttonWrapper}>
          <ColorFilledButton
            title="View all amenities"
            onPress={() => {
              setShowAmenitiesSheet(true);
            }}
            backgroundColor={colors.palette.buttonBackground}
            rtl={isRtl}
          />
        </View>
        <View style={styles.separatorSpacing}>
          <Separator />
        </View>
        <Text style={[styles.heading, { textAlign: isRtl ? "right" : "left" }]}>
          Unit Layouts
        </Text>
        <NewsList
          data={NEWS_DATA_NO_BADGE}
          rtl={appLanguage === LanguageEnum.AR}
          cardWidth={width * 0.65}
          showBadge={false}
          showIcon={false}
          onPressItem={() => setShowUnitLayoutSheet(true)}
          featureContent={true}
        />

      </ImageBackground>
      <PriceCTA price="1,000,000" />

      <DownloadBrochureSheet
        show={showBrochureSheet}
        onClose={() => setShowBrochureSheet(false)}

        appLanguage={appLanguage}
      />

      <UnitLayoutSheet
        show={showUnitLayoutSheet}
        onClose={() => setShowUnitLayoutSheet(false)}
        appLanguage={appLanguage}
      />

      <AmenitiesSheet
        show={showAmenitiesSheet}
        onClose={() => setShowAmenitiesSheet(false)}
        appLanguage={appLanguage}
      />
      <GalleryModal
        visible={showGallery}
        initialIndex={initialGalleryIndex}
        onClose={() => setShowGallery(false)}
        items={STATIC_GALLERY}
        rtl={isRtl}
      />


    </Screen>
  );
};

export default ResidenceDetails;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "transparent",

  },
  bg: {
    width: "100%",
    // backgroundColor: "transparent",
    marginTop: -2,
  },
  title: {
    paddingHorizontal: 16,
    paddingTop: 16,
    fontFamily: "Charter",
    fontSize: 28,
    fontWeight: "400",
    color: colors.textPrimary,
  },
  heading: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontFamily: "Charter",
    fontSize: 16,
    fontStyle: "normal",
    color: colors.textPrimary,
    lineHeight: 24,
  },
  locationButtons: {
    flexDirection: "row",
    gap: 9,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexWrap: "wrap",
  },
  Gap: {
    height: 16,
  },
  typeContainer: {
    marginHorizontal: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: colors.palette.buttonBackground,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    // gap: 3,
  },


  wideTabButton: {
    minWidth: 105,
  },
  typeButtonText: {
    fontFamily: "Charter",
    fontWeight: "400",
  },
  contentWrapper: {
    paddingTop: 24,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },

  buttonWrapper: {
    paddingHorizontal: 16,
    marginVertical: 3,
  },
  detailsWrapper: {
    paddingHorizontal: 16,
  },
  separatorSpacing: {
    paddingVertical: 16,
  },
});

import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { colors } from "@theme/colors";


 const SCREEN_WIDTH = Dimensions.get("window").width;
const SECTION_HEIGHT = 410;

interface Props {
  title?: string;
  image?: any;
  number?: string;
  description?: string;
  pattern: React.ReactNode;
  backgroundColor?: string;
}

const FactSections: React.FC<Props> = ({
  title,
  image,
  number,
  description,
  pattern,
  backgroundColor = colors.palette.factBackground,
}) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      
      {title && <View style={styles.titleBox}>
        <Text style={styles.titleText}>{title}</Text>
      </View>}

      <View style={styles.patternBehind}>{pattern}</View>
      
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <ImageBackground
            source={{uri:image}}
            style={styles.cardImage}
            imageStyle={styles.cardImageRadius}
          >
            <View style={styles.blurWrapper}>
             
              <View style={styles.blurContent}>
                {number && <Text style={styles.bigNumber}>{number}</Text>}
                {description && <Text style={styles.description}>{description}</Text>}
              </View>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.solidOne} />
        <View style={styles.solidTwo} />
      </View>
    </View>
  );
};

export default FactSections;

const styles = StyleSheet.create({
 container: {
  width: "100%",
  height: SECTION_HEIGHT,
  position: "relative",
  alignItems: "center",
  marginTop: 24,
  paddingTop: 48,
},
titleBox: {
    width: "60%",
},

titleText: {
    color: colors.palette.white,
    textAlign: "center",
    fontSize: 22,
    lineHeight: 28.6,
    fontWeight: "400",
    fontStyle:"normal",
    fontFamily:"Charter",
    paddingBottom:24,
  },

  patternBehind: {
    position: "absolute",
    top: 242,
    width: SCREEN_WIDTH,
    height: 210,
    zIndex: 1,
    overflow: "hidden",
  },
  blurWrapper: {
  position: "absolute",
  bottom: 0,
  width: "100%",
  height: "50%",           
  overflow: "hidden",
  borderBottomLeftRadius: 2,
  borderBottomRightRadius: 2,
},

blurBackground: {
  ...StyleSheet.absoluteFillObject,
  zIndex: -1,
},

blurContent: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 16,
  paddingBottom: 21,
  zIndex: 1,
},


cardContainer: {
  position: "relative",
  width: "90%",
  alignItems: "center",
  zIndex: 5,
},

card: {
  width: "100%",
  borderRadius: 2,
  overflow: "visible",   
  elevation: 6,
  zIndex: 5,
},

solidOne: {
  width: "95%",
  height: 15,
  backgroundColor: "#51959c",
  borderRadius: 2,
  marginTop: -5,
  zIndex: 3,
},

solidTwo: {
  width: "85%",
  height: 15,

  backgroundColor: "#26757e",
  borderRadius: 2,
  marginTop: -5,
  zIndex: 2,
},


  cardImage: {
    height: 218,
    justifyContent: "flex-end",
  },

  cardImageRadius: {
    borderRadius: 2,
  },
  textBlock: {
    padding: 16,
    alignItems: "center",
  },

  bigNumber: {
    fontSize: 32,
    fontWeight: "400",
    color: colors.palette.white,
    fontFamily:"Charter",
    paddingBottom:Platform.OS == 'ios' ? 12 : undefined,
  },
  description: {
    fontSize: 22,
    fontStyle: "normal",
    fontWeight:"400",
    textAlign: "center",
    color: colors.palette.white,
    lineHeight: 24,
    fontFamily: "Sakkal Majalla",
  },
});

import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import { colors } from "@theme/colors";
import ClockSvg from "assets/images/svgs/clock2.svg";
import { BlurView } from "@react-native-community/blur";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

interface NewsItem {
  id: string;
  title: string;
  date?: string;
  tag?: string;
  image: any;
  description?: string;
  key?: string | undefined;
}

interface NewsListProps {
  rtl?: boolean;
  data?: NewsItem[];
  cardWidth?: number;
  showBadge?: boolean;
  showIcon?: boolean;
  dateOpacity?: number;
  onPressItem?: (item: NewsItem) => void;
  featureContent?: boolean;
}

const NewsList: React.FC<NewsListProps> = ({
  rtl = false,
  data = [],
  cardWidth = width * 0.8,
  showBadge = true,
  showIcon = true,
  dateOpacity = 0.6,
  onPressItem = () => { },
  featureContent = false,
}) => {
  const navigation = useNavigation();
  const orderedNews = rtl ? [...data].reverse() : data;

  return (
    <FlatList
      data={orderedNews}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      contentContainerStyle={[
        { paddingHorizontal: 16, marginBottom: 12 },
        rtl && { flexDirection: "row-reverse" },
      ]}
      inverted={rtl}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            styles.card,
            { width: cardWidth },
            rtl && { marginRight: 0, marginLeft: 16 },
            featureContent && styles.featureCard,
          ]}
          activeOpacity={0.9}
          onPress={() => {
            if (item.key) {
              navigation.navigate(item.key as never);
            } else {
              onPressItem(item);
            }
          }}
        >
          <View style={[
            featureContent ? styles.featureImageWrapper : styles.imageWrapper,
          ]}>
            <Image source={item.image} style={styles.image} />

            {showBadge && item.tag && (
              <View
                style={[
                  styles.tagWrapper,
                  rtl ? { right: 12, left: "auto" } : { left: 12, right: "auto" },
                ]}
              >
                <BlurView
                  style={styles.blurBackground}
                  blurType="light"
                  blurAmount={8}
                  reducedTransparencyFallbackColor="rgba(0,0,0,0.20)"
                />
                <Text style={styles.tagText}>{item.tag}</Text>
              </View>
            )}
          </View>

          <View
            style={[
              styles.content,
              rtl && { alignItems: "flex-end" },
              featureContent && styles.featureContent,
            ]}
          >
            <Text style={[styles.title, rtl && { textAlign: "right" }]} numberOfLines={2}>
              {item.title}
            </Text>

            <View
              style={[
                styles.dateRow,
                rtl && { flexDirection: "row-reverse" },
              ]}
            >
              {showIcon && <ClockSvg width={17} height={17} />}
              {item?.date ? <Text style={[styles.dateText, { opacity: dateOpacity }, rtl && { textAlign: "right" }]}>
                {item.date}
              </Text> : null}
              {
                item?.description ?
                  <Text style={[styles.descText, rtl && { textAlign: "right" }]}>
                    {item?.description}
                  </Text>
                  : null
              }
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NewsList;


const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.palette.white,
    borderRadius: 4,
    marginRight: 16,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    marginVertical: 15,
  },

  imageWrapper: {
    width: "100%",
    height: 150,
    position: "relative",
  },

  featureCard: {
    padding: 12,
  },

  featureImageWrapper: {
    width: "100%",
    aspectRatio: 255 / 179,
    position: "relative",
  },

  featureContent: {
    paddingVertical: 12,
    paddingHorizontal: 3,
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  tagWrapper: {
    position: "absolute",
    top: 12,
    left: 12,
    borderRadius: 2,
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  blurBackground: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 2,
    backgroundColor: Platform.OS === "android" ? "rgba(0,0,0,0.20)" : "transparent",
  },

  tagText: {
    fontSize: 10,
    fontFamily: "Charter",
    color: colors.palette.white,
    textTransform: "uppercase",
  },

  content: {
    paddingVertical: "3%",
    // paddingBottom: "5%",
    paddingHorizontal: "6%",
  },

  title: {
    fontSize: 18,
    fontFamily: "Charter",
    color: colors.palette.textPrimary,
    marginBottom: 8,
    lineHeight: 23,
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  dateText: {
    fontSize: 22,
    fontFamily: "Sakkal Majalla",
    color: colors.palette.textPrimary,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: Platform.OS == 'ios' ? undefined : 20,
  },
  descText: {
    fontSize: 20,
    fontFamily: "Sakkal Majalla",
    color: colors.palette.textSecondary,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: Platform.OS == 'ios' ? undefined : 20,
  },
});

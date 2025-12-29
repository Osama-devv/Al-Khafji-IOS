import { colors } from "@theme/colors";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface IncrementButtonProps {
  
  onPress?: () => void;
  children: React.ReactNode;
  isRegisterInteres?: boolean;
}

export const IncrementButton: React.FC<IncrementButtonProps> = ({
 
  onPress,
  children,
  isRegisterInteres = false
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.outerRing, isRegisterInteres && {width: 48}]}>
        <View
          style={[styles.innerSquare,]}
        >
          {children}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  outerRing: {
    borderWidth: 0.5,
    borderColor: colors.palette.outerCircle,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    width:66,
    height:48,
    borderRadius:2,
    padding: 3
  },

  innerSquare: {
    backgroundColor: 'rgba(255, 255, 255, 0.40)',
    justifyContent: "center",
    alignItems: "center",
    width:'100%',
    height:'100%',
    borderRadius:2,
    borderWidth:0.5,
    borderColor:colors.palette.outerCircle,
    paddingTop: 11,
    paddingBottom:11,
    
  },
});

import { StyleSheet, View } from 'react-native'
import React from 'react'
import { colors } from '@theme/colors'

interface SeparatorProps {
  style?: any;
}

const Separator = ({ style }: SeparatorProps) => {
  return (
    <View style={[styles.container, style]}/>
  )
}

export default Separator

const styles = StyleSheet.create({
    container: {
        height: 1,
        backgroundColor: colors.borderColor
    }
})
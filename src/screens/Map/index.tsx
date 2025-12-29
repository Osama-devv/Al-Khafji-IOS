import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Screen } from '@components/common/Screen/Screen'

const Map = () => {
  return (
    <Screen preset="auto"
          safeAreaEdges={['bottom', 'top']}
        >
          <Text>Map</Text>
        </Screen>
  )
}

export default Map

const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { searchMovies } from './src/api/apicalls'

const App = () => {
  console.log(searchMovies('Avengers'))
  return (
    <View>
      <Text>App</Text>

    </View>
  )
}

export default App

const styles = StyleSheet.create({})
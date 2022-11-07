import React, { Component, useState } from 'react'
import { Button, View, Text, Picker, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SelectorScreen from './SectorSelection.js'
import DataBaseScreen from './DataBaseScreen.js'

const Stack = createNativeStackNavigator()

function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='SelectorScreen'
          component={SelectorScreen}
          options={{ title: 'Find Top Companies' }}
        />
        <Stack.Screen
          name='DataBaseScreen'
          component={DataBaseScreen}
          options={{ title: 'DataBase' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

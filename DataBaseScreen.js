import React, { Component, useState, useEffect } from 'react'
import { ScrollView, Button, View, Text, Picker, StyleSheet, SafeAreaView, FlatList, StatusBar } from 'react-native'
import axios from 'axios'

function App (navigation, route) {
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/api/get').then(function (res) {
      setCompanies(res.data)
    })
  }, [])

  return (

    <SafeAreaView>
      <ScrollView>
        {companies && companies.map(function (data, i) {
          return (
            <View key={i} style={{ margin: 5, padding: 5, borderStyle: 'solid' }}>
              <Text style={{ fontWeight: 'bold' }}>{data.name} </Text>
              <Text>sector: {data.sector} </Text>
              <Text>industry: {data.industry} </Text>
              <Text>address: {data.address} </Text>
              <Text>phone: {data.phone} </Text>
              <Text>country: {data.country} </Text>
              <Text>webpage: {data.webpage} </Text>
            </View>
          )
        })}
      </ScrollView>
    </SafeAreaView>

  )
}
export default App

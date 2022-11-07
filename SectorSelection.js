import React, { useState } from 'react'
import { Button, View, Text, Picker, StyleSheet } from 'react-native'
import industryList from './assets/industryList2.json'
import countryList from './assets/countryList.json'
import axios from 'axios'

function App ({ navigation }) {
  const [industryCategory, setIndustryCategory] = useState('')
  const [subIndustryCategory, setSubIndustryCategory] = useState('')
  const [language, setLanguage] = useState('')

  const categoryList = industryList.map((data, index) =>
    <Picker.Item label={data.category} value={data.category} key={index} />
  )

  const langList = countryList.map((data, index) =>
    <Picker.Item label={data} value={data.code} key={index} />
  )

  return (
    <View style={styles.container}>
      <Text>Language</Text>
      <Picker
        selectedValue={language}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setLanguage(itemValue)}
      >
        <Picker.Item label='' value='' key='0' />
        {langList}
      </Picker>
      <Text style={styles.text}>Selected Language: {language}</Text>

      <Text>Category</Text>
      <Picker
        selectedValue={industryCategory}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => {
          setIndustryCategory(itemValue)
          setSubIndustryCategory('')
        }}
      >
        <Picker.Item label='' value='' key='0' />
        {categoryList}
      </Picker>
      <Text style={styles.text}>Selected Industry: {industryCategory}</Text>

      <Text>Subcategory</Text>
      <Picker
        selectedValue={subIndustryCategory}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => {
          setSubIndustryCategory(itemValue)
        }}
      >
        <Picker.Item label='' value='' key='0' />
        {industryCategory && industryList.find(data => {
          return data.category === industryCategory
        }).subcategory.map((data, index) =>
          <Picker.Item label={data} value={data} key={index} />
        )}
      </Picker>
      <Text style={styles.text}>Selected SubCategory: {subIndustryCategory}</Text>

      <Button
        disabled={subIndustryCategory === ''}
        title='Create DataBase'
        onPress={async function () {
          // create a new db
          const searchResult = await axios.post('http://localhost:3000/api/search', { sector: industryCategory, industry: subIndustryCategory, country: language })

          const storeData = []
          for (const res of searchResult.data) {
            const comp = {
              name: res.Name || '',
              address: res.address || '',
              country: res.country || '',
              industry: res.industry || '',
              phone: res.phone || '',
              sector: res.sector || '',
              website: res.website || ''
            }
            storeData.push(comp)
          }
          await axios.post('http://localhost:3000/api/store', storeData)

          return (navigation.navigate('DataBaseScreen'))
        }}
      />
    </View>
  )
}
export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center'
  },
  text: {
    padding: 15,
    fontSize: '1em'
  }
})

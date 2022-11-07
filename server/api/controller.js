import Model from './model.js'
import { readFile } from 'fs/promises'

const CompaniesList = JSON.parse(await readFile(new URL('./companies.json', import.meta.url)))

const Controller = {
  onStore: async (req, res) => {
    try {
      await Model.deleteMany({})
      const companies = req.body
      for (const company of companies) {
        Model.createCompany(company.name, company.address, company.country, company.industry, company.phone, company.sector, company.website)
      }
      return res.status(200).json({ success: true })
    } catch (error) {
      console.error(error)
      return res.status(400).json({ success: false })
    }
  },
  onGet: async (req, res) => {
    try {
      const companies = await Model.getCompanies()
      return res.status(200).json(companies)
    } catch (error) {
      console.error(error)
      return res.status(400).json({ success: false })
    }
  },
  onSearch: async (req, res) => {
    try {
      const sector = req.body.sector
      const industry = req.body.industry
      const country = req.body.country
      const resultList = CompaniesList.filter(function (element) {
        if (element.industry === industry && element.sector === sector && element.country === country) {
          return true
        }
        return false
      })
      return res.status(200).json(resultList)
    } catch (error) {
      console.error(error)
      return res.status(400).json({ success: false })
    }
  }
}

export default Controller

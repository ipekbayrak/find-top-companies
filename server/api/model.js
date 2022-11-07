import mongoose from 'mongoose'

const Schema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    address: {
      type: String
    },
    country: {
      type: String
    },
    industry: {
      type: String
    },
    phone: {
      type: String
    },
    sector: {
      type: String
    },
    website: {
      type: String
    }
  },
  {
    timestamps: true,
    collection: 'companies'
  }
)

Schema.statics.createCompany = async function (name, address, country, industry, phone, sector, website) {
  const company = await this.create({ name, address, country, industry, phone, sector, website })
  return company
}

Schema.statics.getCompanies = async function () {
  const companies = await this.find()
  return companies
}

export default mongoose.model('Model', Schema)

const University = require('../models/UniversityModel')

class UniversityService {

  static async find(page, limit, country) {
    let filter = null
    country ? country = new RegExp(country, "i") : null
    country ? filter = {country: country} : filter = {}
    try {
      const universities = await University.find(filter).select('_id name country state_province').limit(limit * 1).skip((page - 1) * limit).exec()
      const count = await University.countDocuments(filter)
      const response = {
              universities,
              totalPages: Math.ceil(count / limit),
              currentPage: page
            }
      return response
    } catch (error) {
      throw new Error("Erro interno")
    }
  }

  static async findOne(id) {
    try {
      const university = await University.find({_id: id})
      return university
    } catch (error) {
      throw new Error("Erro interno")
    }
  }

  static async save(body) {
    try {
      const university = new University(body)
      return await university.save()
    } catch (error) {
      throw new Error("Erro interno")
    }
  }

  static async findByFilter(name, country, state_province) {
    try {
      const filter = {
        name: new RegExp(name, "i"),
        country: new RegExp(country, "i"),
        state_province: new RegExp(state_province, "i")
      }
      const university = await University.find(filter)
      return university
    } catch (error) {
      throw new Error("Erro interno")
    }
  }

  static async update(id, body) {
    try {
      const response = await University.findByIdAndUpdate(id, body, {new: true})
      return response
    } catch (error) {
      throw new Error("Erro interno")
    }
  }

  static async delete(id) {
    try {
      const response = await University.findByIdAndDelete(id)
      return response
    } catch (error) {
      throw new Error("Erro interno")
    }
  }
}

module.exports = UniversityService
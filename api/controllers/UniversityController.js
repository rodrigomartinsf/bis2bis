const University = require('../models/UniversityModel')
const UniversityService = require('../services/UniversityService')

class UniversityController {

  static async getUniversities(req, res) {
    let { country, page = 1 } = req.query
    const limit = 20
    try {
      const response = await UniversityService.find(page, limit, country)
      res.status(200).json(response)
    } catch (error) {
      res.status(500).json({error: error.message})
    }
  }

  static async getOne(req, res) {
    const { id } = req.params
    try {
      const response = await UniversityService.findOne(id)
      res.status(200).json(response)
    } catch (error) {
      res.status(500).json({error: error.message})
    }
  }

  static async create(req, res) {
    const { body } = req
    try {
      const university = await UniversityService.findByFilter(body.name, body.country, body.state_province)
      console.log(university.length)
      if(!university.length) {
        const response = await UniversityService.save(body)
        res.status(201).json(response)
      }
      else{
        res.status(400).json({erro: 'University already registered!'})
      }
      
    } catch (error) {
      res.status(500).json({error: error.message})
    }
  }

  static async update(req, res) {
    const { id } = req.params
    const { web_pages, name, domains } = req.body
    const body = {web_pages, name, domains}
    try {
      const response = await UniversityService.update(id, body)
      if(response){
        res.status(200).json(response)
      } else {
        res.status(400).json({erro: 'University not found!'})
      }
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  }

  static async delete(req, res) {
    const { id } = req.params
    try {
      const response = await UniversityService.delete(id)
      if(response){
        res.status(204).json(response)
      } else {
        res.status(400).json({erro: 'University not found!'})
      }
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  }

}

module.exports = UniversityController
const axios = require('axios').default
const { restart } = require('nodemon')
const Universidade = require('./models/UniversityModel')

class Integracao {
  constructor() {
    this.paises = ["argentina","brasil","chile","colombia","paraguai","peru","suriname","uruguay"]
    this.url = 'http://universities.hipolabs.com/search?country='
  }

  async getData() {
    try {
      this.paises.forEach(async pais => {
        const res = await axios.get(this.url + pais)
        Object.keys(res.data).forEach(async (item) => {
          console.log(res.data[item])
          const universidade = new Universidade({
            country: res.data[item].country,
            web_pages: res.data[item].web_pages,
            name: res.data[item].name,
            state_province: res.data[item]['state-province'],
            alpha_two_code: res.data[item].alpha_two_code,
            domains: res.data[item].domains
          })
          await universidade.save()
        })
      })
        
    } catch (error) {
        console.log(error)
    }
  }
}

const integracao = new Integracao()
integracao.getData()

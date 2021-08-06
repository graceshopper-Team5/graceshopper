const Sequelize = require('sequelize')
const db = require('../db')
const axios = require('axios');

const Prop = db.define('prop', {
  name: {
    type: Sequelize.STRING, 
    allowNull: false
  }, 
  movieTitle:{
    type: Sequelize.STRING, 
    allowNull: false
  }, 
  movieYear: {
    type: Sequelize.INTEGER
  }, 
  price:{
    type: Sequelize.INTEGER, 
    allowNull: false
  }, 
  imageUrl:{
    type: Sequelize.TEXT,
    default: "https://en.wikipedia.org/wiki/Clapperboard#/media/File:ClapperboardColor.svg"
  }, 
  description: {
    type: Sequelize.TEXT,
  }
})
module.exports = Prop; 
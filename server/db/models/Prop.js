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
    // o: let's 🌮 bout this one
    type: Sequelize.INTEGER, 
    allowNull: false
  }, 
  // o: you don't need Sequelize.TEXT
  imageUrl:{
    type: Sequelize.TEXT,
    default: "https://en.wikipedia.org/wiki/Clapperboard#/media/File:ClapperboardColor.svg"
  }, 
  description: {
    type: Sequelize.TEXT,
  }

})
module.exports = Prop; 
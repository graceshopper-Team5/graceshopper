const Sequelize = require('sequelize')
const db = require('../db')
const axios = require('axios');

const Order = db.define('order', {
  status: {
    type: Sequelize.BOOLEAN
  }, 
  total:{
    type: Sequelize.INTEGER
  }
})

module.exports = Order; 
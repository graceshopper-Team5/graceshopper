//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Prop = require('./models/Prop')
const Cart = require('./models/Cart')
const Order = require('./models/Order')

//associations could go here!
User.hasMany(Order)
Order.belongsTo(User)

// Prop.belongsToMany(Order, {through: 'cart'})
// Order.belongsToMany(Prop, {through: 'cart'})

Prop.belongsToMany(User, {through: 'cart'});
User.belongsToMany(Prop, {through: 'cart'});



module.exports = {
  db,
  models: {
    User,
    Prop,
    Cart,
    Order
  },
}

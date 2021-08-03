//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Prop = require('./models/Prop')

//associations could go here!
User.belongsToMany(Prop, {through: "props_users"})
Prop.belongsToMany(User, {through: "props_users"})

module.exports = {
  db,
  models: {
    User,
    Prop
  },
}

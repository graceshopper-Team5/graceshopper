'use strict'

const {db, models: {User, Prop} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', email: "cody@email.com", password: '123' }),
    User.create({ username: 'murphy', email: "murphy@email.com", password: '123' }),
  ])

  //Creating Props 
  const props = await Promise.all([
    Prop.create({name: "Millenium Falcon", movieTitle: "Star Wars", movieYear: "1977", price: 10000000.00, imageUrl:"https://en.wikipedia.org/wiki/Millennium_Falcon#/media/File:A_screenshot_from_Star_Wars_Episode_IV_A_New_Hope_depicting_the_Millennium_Falcon.jpg" , description: "The Best spaceship in a galaxy far far away. Made Kessel Run in less than 12 parsecs" }),
    // Prop.create({name: , movieTitle: , movieYear: , price: , imageUrl: , description: }),
    // Prop.create({name: , movieTitle: , movieYear: , price: , imageUrl: , description: }),
    // Prop.create({name: , movieTitle: , movieYear: , price: , imageUrl: , description: }),
    // Prop.create({name: , movieTitle: , movieYear: , price: , imageUrl: , description: })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${props.length} props`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }, 
    props:{
      prop1: props[0]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

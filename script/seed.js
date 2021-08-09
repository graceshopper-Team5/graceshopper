"use strict";

const {
  db,
  models: { User, Prop },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", 
    email: "cody@email.com", 
    password: "123" }),
    User.create({
      username: "murphy",
      email: "murphy@email.com",
      password: "123",
    }),
  ]);

  //Creating Props
  const props = await Promise.all([
    Prop.create({
      name: "Millenium Falcon",
      movieTitle: "Star Wars",
      movieYear: "1977",
      price: 100000000,
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/en/8/8d/A_screenshot_from_Star_Wars_Episode_IV_A_New_Hope_depicting_the_Millennium_Falcon.jpg",
      description:
        "The Best spaceship in a galaxy far far away. Made Kessel Run in less than 12 parsecs",
    }),
    Prop.create({
      name: "Elder Wand",
      movieTitle: "Harry Potter and the Deathly Hallows",
      movieYear: "2007",
      price: 10100,
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/a/a3/The_Elder_Wand.jpg",
      description:
        "The wand is made of elder wood,is 15 inches and contains a Thestral tail-hair core. Appearing at face value to be a wand like any other, it had a smooth, unadorned shaft and a handle formed from two conjoined spheres. one of three magical objects that made up the fabled Deathly Hallows.",
    }),
    Prop.create({
      name: "Infinity Gauntlet",
      movieTitle: "Avengers: Infinity War",
      movieYear: 2018,
      price: 8468999,
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/en/a/af/Infinity_Gauntlet_1.jpg",
      description:
        "Mythical artifact of the Marvel Universe, created by Thanos to harness the power of all five Infinity Stones at once.  Famous for eliminating half of all life in the universe, controversially reversed by the Avengers in Endgame.",
    }),
    Prop.create({
      name: "Mjolnir",
      movieTitle: "Thor",
      movieYear: 2011,
      price: 0,
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/b/b7/Mjollnir.png",
      description:
        "Hammer wielded famously by Thor (also sometimes Captain America).  May only be wielded by 'one who is worthy'.  Item is free, but cannot be delivered and may only be taken by the customer who can lift it.",
    }),
    Prop.create({
      name: "DeLorean",
      movieTitle: "Back to the Future",
      movieYear: 1985,
      price: 541200,
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/TeamTimeCar.com-BTTF_DeLorean_Time_Machine-OtoGodfrey.com-JMortonPhoto.com-07.jpg/440px-TeamTimeCar.com-BTTF_DeLorean_Time_Machine-OtoGodfrey.com-JMortonPhoto.com-07.jpg",
      description:
        "DeLorean time machine is a time travel device made by retrofitting a DMC DeLorean vehicle with a flux capacitor. The car requires 1.21 gigawatts of power and needs to travel 88 miles per hour (142 km/h) to initiate time travel.",
    }),
    Prop.create({
      name: "Batmobile",
      movieTitle: "Batman",
      movieYear: 1943,
      price: 25499999,
      imageUrl:
        "https://oldnewsclub.com/wp-content/uploads/2020/05/The-Complete-History-of-The-Batmobile-1.jpg",
      description:
        "The weaponized transportation of Batman and Robin.  The first appearance was in the 1943 serial film, but the batmobile has been used through Batman's prolific movie and TV history.  This is the original converted 1939 Cadillac Series 75, complete with flamethrower and grappling hook to drive vertically up skyscrapers.",
    }),
    Prop.create({
      name: "Box of Chocolates",
      movieTitle: "Forrest Gump",
      movieYear: 1994,
      price: 3995,
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/White-Box-of-Chocolates.jpg/1200px-White-Box-of-Chocolates.jpg",
      description:
        "Forrest Gump's mama always said, 'Life is like a box of chocolates--you never know what you're gonna get.'  This box of cheap American chocolates contains many different flavors, none of them good except cherry.  Because this is the original box of chocolates, they have been out of date for almost thirty years.  We take no responsibility if you choose to eat them.",
    }),
    Prop.create({
      name: "Wilson",
      movieTitle: "Castaway",
      movieYear: 2000,
      price: 2000,
      imageUrl:
        "https://i.pinimg.com/originals/ed/c6/2d/edc62dfa8ea898b323f7959bccfb99d1.jpg",
      description:
        "Lonely and looking for a companion? This bad buoy will keep you company. Warranty does not cover any items that get whisked away by the sea.",
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${props.length} props`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
    props: {
      prop1: props[0],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;

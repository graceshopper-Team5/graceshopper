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
        "https://images.fun.com/products/48447/1-1/thanos-infinity-gauntlet-coin-bank.jpg",
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

    Prop.create({
      name: "Jennifer's Body Cheer Uniform",
      movieTitle: "Jennifer's Body",
      movieYear: 2009,
      price: 1500,
      imageUrl:
        "- https://dygtyjqp7pi0m.cloudfront.net/i/16881/17281845_1.jpg?v=8D082BCA65E4B60",
      description:
        "Original costume worn by Megan Fox in the iconic cult movie of the 2000s.",
    }),

    Prop.create({
      name: "Ghost Orchid",
      movieTitle: "Adaptation",
      movieYear: 2002,
      price: 4000,
      imageUrl:
        "https://www.paradisecoast.com/sites/default/files/profiles/photos/listing-658-ghost%20cropped.jpg",
      description:
        "Extremely rare preserved ghost orchid sourced from Miami, Florida from the 2002 film wwith Nicholas Cage and Meryl Streep.",
    }),

    Prop.create({
      name: "Blair Witch Wooden Armature",
      movieTitle: "The Blair Witch Project",
      movieYear: 1999,
      price: 2200,
      imageUrl:
        "https://i.pinimg.com/originals/4a/e9/3b/4ae93b05bbf9509b079624a834c77497.jpg",
      description:
        "Haunting wooden stick figure from the legendary 90s horror film.",
    }),

    Prop.create({
      name: "JAWS Shark",
      movieTitle: "JAWS",
      movieYear: 1975,
      price: 20000,
      imageUrl:
        "https://lh3.googleusercontent.com/proxy/LsT1gJWbYSg17lp3iID12zyjKSRzhK9irddU1XEinUc5UuOy5mfWZXFGC1yZTbYUfHiR841QEj2b_3eEMyd70rY_rc2XUgZuFTFGbkodycyfhQQ6kMjMGw",
      description:
        "First ever model of the famous great white from Steven Spielberg's original collection.",
    }),

    Prop.create({
      name: "Blue Box",
      movieTitle: "Mullholland Drive",
      movieYear: 2001,
      price: 3400,
      imageUrl:
        "https://i.etsystatic.com/17882217/r/il/fdfc02/1875125946/il_570xN.1875125946_iwi0.jpg",
      description:
        "Blue box from the classic surrealist neo-noir film by David Lynch.",
    }),

    Prop.create({
      name: "Wizard of Oz Ruby Slippers",
      movieTitle: "The Wizard of Oz",
      movieYear: 1939,
      price: 60000,
      imageUrl:
        "https://api.time.com/wp-content/uploads/2014/03/152593524.jpg",
      description:
        "Original pair of red-sequinned character shoes worn by Judy Garland.",
    }),

    Prop.create({
      name: "Heart of the Ocean Blue Diamons",
      movieTitle: "Titanic",
      movieYear: 1997,
      price: 55000,
      imageUrl:
        "https://www.heraldweekly.com/wp-content/uploads/2019/06/103990/GettyImages-529313176-iconicmovieprops-119326-p1.jpg",
      description:
        "Blue diamond and white gold necklace worn by Kate Winslet in the Titanic.",
    }),

    Prop.create({
      name: "Face-Off ",
      movieTitle: "Face Off",
      movieYear: 1997,
      price: 14000,
      imageUrl:
        "https://i.redd.it/qr795ajbhwfz.jpg",
      description:
        "SFX replica of John Travolta from the 90s action thriller film.",
    }),

    Prop.create({
      name: "Romeo and Juliet Masquerade Ball Costumes",
      movieTitle: "Romeo and Juliet",
      movieYear: 1968,
      price: 80000,
      imageUrl:
        "http://www.romeo-juliet-club.ru/location/artena/rjcostumes.jpg",
      description:
        "Original costumes worn by Olivia Hussey and Leonard Whiting in the masquerade ball scene of the Zeffereli film.",
    }),

    Prop.create({
      name: "Mc-Fly Nike Sneakers",
      movieTitle: "Back to the Future",
      movieYear: 1985,
      price: 90000,
      imageUrl: "http://www.elitetraveler.com/wp-content/uploads/2017/09/http-2F2Fs3-eu-west-1.amazonaws.com2Ffthtsi-assets-production2Fez2Fimages2F42F42F82F72F1307844-1-eng-GB2F01-04-72636_Marty-McFlys-Light-up-2015-Nike-Shoes_new_4.jpg",
      description: "Original Nike sneakers worn by Michael J Fox."
    }),

    Prop.create({
      name: "The Twins Dresses",
      movieTitle: "The Shining",
      movieYear: 1980,
      price: 30000,
      imageUrl: "https://2.bp.blogspot.com/-UmOE59NdWgM/UPsmoDe4TGI/AAAAAAAA-8s/T2Fbwchs2TI/s1600/Grady+sisters+Shining+costumes.jpg",
      description: "Original costumes worn in the Stanley Kubrick horror film."
    }),

    Prop.create({
      name: "Lucy Lou Who Record Player",
      movieTitle: "The Grinch",
      movieYear: 2000,
      price: 000,
      imageUrl: "https://4.bp.blogspot.com/-O9PjHEnh0Vo/UT51vfAssyI/AAAAAAABCwM/7eebF5UM6_c/s1600/Grinch+record+player+film+prop.jpg",
      description: "Original Ballerina record player prop from The Grinch."
    }),

    Prop.create({
      name: "Wednesday Addams Wall Figure",
      movieTitle: "The Addams Family",
      movieYear: 1993,
      price: 7000,
      imageUrl: "https://1.bp.blogspot.com/-1UMvTmoRPlI/YJBrJUkP82I/AAAAAAADhYE/9hUWf2GjqC0Rd9vt3rs8rw_u3C4Ry0DOACLcBGAsYHQ/s800/christina%2Bricci%2Baddams%2Bfamily%2Bvalues%2Bcamouflaged%2Bprop.jpeg",
      description: "Wednesday Addams camoflauge mannequin of Cristina Ricci."
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

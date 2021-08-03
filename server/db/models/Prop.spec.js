// const { expect } = require('chai');
// const { cyan } = require('chalk');
// const {
//   db,
//   models: { User },
// } = require('../../server/db');
// const { logTable } = require('./utils');

// const _app = require('../../server/app');
// const app = require('supertest')(_app);

// describe('Tier 1: Basic Fields, Class Methods, GET Routes', () => {
//   describe('Sequelize', () => {
//     before(() => {
//       console.log(cyan(`      Take a look at server/db/User.js\n`));
//     });

//     beforeEach(async () => {
//       await db.sync({ force: true });
//     });

//     describe('Basic Fields: name and userType', () => {
//       describe('name', () => {
//         it('name is a string', async () => {
//           const hannah = await User.create({ name: 'HANNAH' });
//           expect(hannah.name).to.equal(
//             'HANNAH',
//             'Was not able to create a user with name HANNAH'
//           );
//         });

//         xit('name must be unique', async () => {
//           // We shouldn't be able to create two users with the same name.
//           await User.create({ name: 'HANNAH' });
//           await expect(
//             User.create({ name: 'HANNAH' }),
//             "Shouldn't be able to create two users with the same name (HANNAH)"
//           ).to.be.rejected;
//         });

//         xit('name cannot be null', async () => {
//           // We shouldn't be able to create a user without a name.
//           await expect(
//             User.create({}),
//             "We shouldn't be able to create a user with no name"
//           ).to.be.rejected;
//         });

//         xit('name cannot be an empty string', async () => {
//           // We also shouldn't be able to create a user with an empty name.
//           await expect(
//             User.create({ name: '' }),
//             "We shouldn't be able to create a user with an empty name"
//           ).to.be.rejected;
//         });
//       });

//       describe('userType', () => {
//         xit('userType can be either "STUDENT" or "TEACHER"', async () => {
//           const hannah = await User.create({
//             name: 'HANNAH',
//             userType: 'TEACHER',
//           });
//           const ali = await User.create({ name: 'ALI', userType: 'STUDENT' });
//           expect(hannah.userType).to.equal('TEACHER');
//           expect(ali.userType).to.equal('STUDENT');
//         });

//         xit('userType defaults to "STUDENT" if not provided', async () => {
//           const ali = await User.create({ name: 'ALI' });
//           expect(ali.userType).to.equal('STUDENT');
//         });

//         xit('userType cannot be null', async () => {
//           const aliPromise = User.create({
//             name: 'ALI',
//             userType: null,
//           });
//           await expect(
//             aliPromise,
//             "We shouldn't be able to create a user with a null userType"
//           ).to.be.rejected;
//         });

//         xit('userType can ONLY be either "STUDENT" or "TEACHER"', async () => {
//           const aliPromise = User.create({
//             name: 'ALI',
//             userType: 'EAGER_TO_LEARN', // Invalid userType! This promise should reject.
//           });
//           await expect(
//             aliPromise,
//             "We shouldn't be able to create a user with invalid userType (EAGER_TO_LEARN)"
//           ).to.be.rejected;
//         });
//       });
//     });
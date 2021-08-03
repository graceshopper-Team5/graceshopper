import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import store from '.'
import { getUsers } from './usersReducer'


const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)


describe.only('thunk creators', () => {
  let store
  let mockAxios
  const initialState = {user: {}}
  beforeEach(() => { // fake call
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState) // fake store for testing purposes
  })
  afterEach(() => { // blank slate for fake/ real data??? ask tech lead
    mockAxios.restore()
    store.clearActions()
  })
  // Test spec for getUsers thunk
  describe.only('getUsers', () => {
    // dispatch our action
    it ('eventually dispatches the SET_USERS action', async () => {
      const fakeUser = {username: 'Jack'}
      // expecting status 200 OK: we got the fake user
      mockAxios.onGet('/api/users').replyOnce(200, fakeUser)
      // sending off our user thunk
      await store.dispatch(getUsers())
      console.log('HERE IS OUR STORE', store)
      const actions = store.getActions()
      console.log('HERE ARE OUR ACTIONS', actions)
      expect(actions[0].type).to.be.equal('SET_USERS')
      // action user should match our mockData
      expect(actions[0].users).to.be.deep.equal(fakeUser)
  })
})
})





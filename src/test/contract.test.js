/* eslint-env mocha */
const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const provider = ganache.provider()
const web3 = new Web3(provider)

const compiledLottery = require('../ethereum/build/Lottery.json')

let accounts
let lottery

// Code shown here is outdated and not applicable, but was left for posterity
// Tests for this project can be found in src/ethereum/truffle/test/Lottery.test.js

beforeEach(async() => {
  accounts = await web3.eth.getAccounts()
  // Deploy contract
  lottery = await new web3.eth.Contract(JSON.parse(compiledLottery.interface))
    .deploy({
      data: compiledLottery.bytecode,
    })
    .send({
      from: accounts[0],
      gas: '1000000',
    })
  lottery.setProvider(provider)
})

// Define tests
describe('Campaign', () => {
  // check for successful deployment
  it('deploys successfully', () => {
    assert.ok(lottery.options.address)
  })
})

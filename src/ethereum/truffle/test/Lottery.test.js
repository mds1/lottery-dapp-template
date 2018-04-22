/* eslint-disable no-undef */
const assert = require('chai').assert // use Chai Assertion Library
const ganache = require('ganache-cli') // use ganache-cli with ethereum-bridge for Oraclize

// Configure web3 1.0.0 instead of the default version with Truffle
const Web3 = require('web3')
const provider = ganache.provider()
const web3 = new Web3(provider)

// Define the contract we'll be testing
const Lottery = artifacts.require('Lottery')

// Define tests
contract('Lottery', accounts => {
  // define variable to hold the instance of our Lottery.sol contract
  let lottery

  // use fresh contract for each test
  beforeEach('Setup contract for each test', async function() {
    lottery = await Lottery.new()
  })

  // check that it assigns the deployer as the manager
  it('properly assigns the manager', function() {

    // IN PROGRESS
    //
    // ADD TESTS

  }) // end 'it' block
}) // end 'contract' block

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

  // define function to enter lotter
  async function enterLottery(value, account) {
    // value: amount to send to contract, ether
    // account: account to entery lottery with

    const result = await lottery.enterLottery({
      from: account,
      value: web3.utils.toWei(String(value), 'ether'),
    })
    return result
  }

  // use fresh contract for each test
  beforeEach('Setup contract for each test', async function() {
    lottery = await Lottery.new()
  })

  // check that it assigns the deployer as the manager
  it('properly assigns the manager variable', async function() {
    assert.equal(await lottery.manager(), accounts[0], 'Variable "manager" was not properly set')
  })

  // check that it allows peolpe to enter the lottery
  it('allows players to enter the lottery', async function() {
    result = await enterLottery(0.005, accounts[0])
    assert.equal(result.receipt.status, '0x01', 'Transaction to enter lottery failed')
  })

  // check that it won't allow people to enter who contribute less than the minimum
  it('requires a minimum entry fee to enter', async function() {
    // minimum is set in Lottery.sol to 0.005
    try {
      await enterLottery(0.004, accounts[0]) // less than 0.005, should throw error
    } catch (err) {
      assert(err)
      return
    }
    assert(false, 'Lottery was successfully entered, but should have failed')
  })

  // // check that it sends a query and receives a response
  // it('sends a query and receives a response', async function() {
  //   // for simplicity, we'll do both checks in this function

  //   // set this test to timeout after 1 minute
  //   this.timeout(60 * 1000)

  //   // enter the lottery
  //   // make sure to send enough Ether and to set gas limit sufficiently high
  //   const result = await lottery.getRandomNumber({
  //     from: accounts[0],
  //     value: web3.utils.toWei('0.000175', 'ether'),
  //     gas: '3000000',
  //   })

  //   // Method 1 to check for events: loop through the "result" variable

  //   // look for the LogOraclizeQuery event to make sure query sent
  //   let testPassed = false // variable to hold status of result
  //   for (let i = 0; i < result.logs.length; i++) {
  //     let log = result.logs[i]
  //     if (log.event === 'LogOraclizeQuery') {
  //       // we found the event
  //       testPassed = true
  //     }
  //   }
  //   assert(testPassed, '"LogOraclizeQuery" event not found')

  //   // Method 2 to check for events: listen for them with .watch()

  //   // listen for LogResultReceived event to check for Oraclize's call to _callback
  //   // define events we want to listen for
  //   const LogResultReceived = lottery.LogResultReceived()

  //   // create promise so Mocha waits for value to be returned
  //   let checkForNumber = new Promise((resolve, reject) => {
  //     // watch for our LogResultReceived event
  //     LogResultReceived.watch(async function(error, result) {
  //       if (error) {
  //         reject(error)
  //       }
  //       // lottery.randomNumber() returns a BigNumber object
  //       const bigNumber = await lottery.randomNumber()
  //       // convert BigNumber to ordinary number
  //       const randomNumber = bigNumber.toNumber()
  //       // stop watching event and resolve promise
  //       LogResultReceived.stopWatching()
  //       resolve(randomNumber)
  //     }) // end LogResultReceived.watch()
  //   }) // end new Promise

  //   // call promise and wait for result
  //   const randomNumber = await checkForNumber
  //   // ensure result is within our query's min/max values
  //   console.log(randomNumber)
  //   assert.isAtLeast(randomNumber, 1, 'Random number was less than 1')
  //   assert.isAtMost(randomNumber, 1000, 'Random number was greater than 1000')

  // }) // end 'it' block
}) // end 'contract' block

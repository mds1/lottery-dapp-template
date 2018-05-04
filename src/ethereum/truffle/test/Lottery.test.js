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

  // define function to enter lottery
  async function enterLottery(value, account) {
    // value: amount to send to contract, ether
    // account: account to entery lottery with

    // send transaction
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
  it('properly assigns the manager', async function() {
    assert.equal(await lottery.manager(), accounts[0], 'Variable "manager" was not properly set')
  })

  // check that it allows peolpe to enter the lottery
  it('allows players to enter the lottery', async function() {
    result = await enterLottery(0.005, accounts[0])
    assert.equal(result.receipt.status, '0x01', 'Transaction to enter lottery failed')
  })

  // check that it won't allow people to enter who contribute less than the minimum
  it('requires a minimum entry fee to play', async function() {
    // minimum is set in Lottery.sol to 0.005
    try {
      await enterLottery(0.004, accounts[0]) // less than 0.005, should throw error
    } catch (err) {
      assert(err)
      return
    }
    assert(false, 'Lottery was successfully entered, but should have failed')
  })

  // end-to-end test -- tests for multiple entries and picking winner
  it('allows multiple entries and picks a winner using Oraclize', async function() {
    // set this test to timeout after 1 minute
    this.timeout(60 * 1000)

    // have 5 people enter the lottery with entry fee of 1 ether
    // already checked this function earlier so we won't test it again here
    nplayers = 5 // number of players to simulate
    entryFee = 1 // each player sends 1 ETH to enter
    for (let i = 0; i < nplayers; i++) {
      enterLottery(entryFee, accounts[i])
    }

    // begin process to pick winner
    // make sure to send enough Ether and to set gas limit sufficiently high
    const result = await lottery.getRandomNumber({
      // value not needed to cover Orclize gas usage, since it's covered by entry fee
      from: accounts[0],
      gas: '3000000',
    })

    // Method 1 to check for events: loop through the "result" variable

    // look for the LogOraclizeQuery event to make sure query sent
    let testPassed = false // variable to hold status of result
    for (let i = 0; i < result.logs.length; i++) {
      let log = result.logs[i]
      if (log.event === 'LogOraclizeQuery') {
        // we found the event
        testPassed = true
      }
    }
    assert(testPassed, '"LogOraclizeQuery" event not found')

    // Method 2 to check for events: listen for them with .watch()

    // listen for LogResultReceived event to check for Oraclize's call to _callback
    // define events we want to listen for
    const LogResultReceived = lottery.LogResultReceived()

    // create promise so Mocha waits for value to be returned
    let checkForNumber = new Promise((resolve, reject) => {
      // watch for our LogResultReceived event
      LogResultReceived.watch(async function(error, result) {
        if (error) {
          reject(error)
        }
        // lottery.winningNumber() returns a BigNumber object
        const bigNumber = await lottery.winningNumber()
        // convert BigNumber to ordinary number
        const winningNumber = bigNumber.toNumber()
        // stop watching event and resolve promise
        LogResultReceived.stopWatching()
        resolve(winningNumber)
      }) // end LogResultReceived.watch()
    }) // end new Promise

    // call promise and wait for result
    const winningNumber = await checkForNumber

    // ensure resulting number is within the allowable range
    assert.isAtLeast(winningNumber, 0,
      `Random number generated (${winningNumber}) was less than 0`)
    assert.isAtMost(winningNumber, nplayers,
      `Random number generated (${winningNumber}) was greater than number of players (${nplayers})`)

    // TODO: Add balance check. All balance checks currently return 0. Why??

    // // get balance of winning account
    // const winnersBalance = await web3.eth.getBalance(accounts[7])
    // // approximate bound based on nplayers, entryFee, and default starting balance of 100 ETH
    // // use 1 less player to account for gas
    // const lowerBoundOfWinner = 100 + ((nplayers - 1) * entryFee)
    // // ensure the winner's balance increased
    // assert.isAtLeast(winnersBalance, lowerBoundOfWinner,
    //   `Winning account had ${winnersBalance} ETH, but should have had at least ${lowerBoundOfWinner} ETH`)

  }) // end 'it' block
}) // end 'contract' block

/* eslint-disable no-undef */
const Lottery = artifacts.require('./Lottery.sol')

module.exports = function(deployer) {
  deployer.deploy(Lottery)
}

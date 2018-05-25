# Ethereum Dapp Template
*Note: This template is still a work in progress and likely has some bugs and mistakes. However, I believe this template is still at a suitable level for others to use as a starting point.*

This template aims to simplify the process of creating a fully-featured front-end for interacting with smart contracts on Ethereum. A simple lottery smart contract, `Lottery.sol`, is used for this template. [Quasar Framework](https://github.com/quasarframework/quasar) is used as the foundation, along with [Mocha](https://github.com/mochajs/mocha) and [Gananche CLI](https://github.com/trufflesuite/ganache-cli) for testing, [vuex](https://github.com/vuejs/vuex) for state management, and [vue-router](https://github.com/vuejs/vue-router) for routing. The included [web3](https://github.com/ethereum/web3.js) version is 1.0.0-beta.26. Functions for [Ethereum Name Service](https://ens.domains/) (ENS) support are included but not used. For a sample ENS implementation, see [this](https://github.com/mds1/send-eth-tx) simple webapp used to send Ethereum transactions.

## Updates on the Way!
Over the next few weeks, this template will be updated with the following features:
* [x] [Truffle](http://truffleframework.com/) support for compiling and deploying
* [x] Inclusion of the [Chai](http://www.chaijs.com/) Assertion Library
* [x] Solidity random number generation via the random.org API with [Oraclize](http://www.oraclize.it/). See my Oraclize tutorial [here](https://medium.com/@msolomon44/using-apis-in-your-ethereum-smart-contract-with-oraclize-95656434292e) for details on how this will be implemented
* [ ] Addition of a "status" area on the site to ensure it is very clear whether or not they are successfully connected to [MetaMask](https://metamask.io/)
* [ ] Completion of the "Smart Contract" tab to display the contract source code
* [ ] More robust set of default tests

## Configuration
To configure this template for your own dapp, follow the steps below. In steps where you must replace the default placeholder text and variables, use case-sensitive replacements (i.e. variables Lottery and lottery are not interchangeable). These steps will not specify which cases need to be replaced, so it is suggested to always use a case-sensitive find and replace (e.g. first replace `Lottery` with `YourContract`, then replace `lottery` with `yourContract`)

1. Run `$ npm install`
2. In `src/ethereum/truffle/contracts`, replace Lottery.sol with the actual contract file
3. Configure the rest of the files in the `truffle` folder as appropriate, including the migrations and `truffle.js`
4. Create a `config.js` file at the root level, using the format shown in `truffle.js`
5. Compile your contract using the following steps:
    1. Change directory to the truffle folder: `$ cd src/ethereum/truffle`
    2. Compile the contract: `$ truffle compile`
6. Step 3 generates an `etherem/build` folder contraining any compiled contracts. These files will be named `*.json`, where `*` is a placeholder for the contract name (the template versions of these are committed in case you do not want to configure/compile a contract and just want to test out the tempalte)
7. In `src/ethereum/web3.js`, change the network name as appropriate
8. Deploy your contract using the configured Truffle migrations. Be sure to save off the address the contract was deployed to
9. In `src/ethereum/lotteryInstance.js`, change the example address to the address the contract was deployed to in the previous step. Also replace all instances of lottery with your contract's name. This file allows you to access the contract instance elsewhere by just importing this file (steps for this are provided in the comments of this file). This file is also used to correctly link to Etherscan on the Smart Contract tab, configured in `ContractSource.vue` (this feature is not yet complete)
10. In `src/ethereum/lotteryGeneral.js`, replace all instances of lottery to your contract's name. This file allows you to access a given instance of the contract by importing this function and passing it the contract's address (steps for this are provided in the comments of this file)
    1. Example use case is you have one contract that a user will use to deploy their own contracts, and you want to access their specific contract instance
    2. You may not need this functionality, in which case you can safely delete this file. This template does not use this functionality, and it is just included for reference.
11. Rename `lotteryInstance.js` and `lotteryGeneral.js` to `*Instance.js` or `*General.js`, where `*` is a placeholder for the contract name
12. In `src/functions.js`, edit the return string of the top function (requiredNetwork) so it matches the network your contract was deployed to. Enter the network in the form of the 'Main' or 'Ropsten' (not 'Mainnet', or 'Ropsten Network')
13. In `src/pages/Home.vue`, replace all instances of Lottery with the name of your contract. Upon building the dapp, if everything was done correctly, the home page should display the contract address and the network you are currently connected to
14. In `src/ethereum/truffle/test/Lottery.test.js`, you will need to update tests to tailor them to your contract.
15. Run `npm install` from the root
16. Change to the `truffle` folder, run tests with `truffle test` as a check that configuration was done properly. Be sure to modify and add tests as necessary. The current set of tests only tests the contract, not the front-end
    1. If you leave the default contract and tests, you will need to do a few extra steps since the tests use Oraclize. These steps are detailed in the section titled "Step 4: Configure Your Local Environment" of the [Oraclize tutorial](https://medium.com/coinmonks/using-apis-in-your-ethereum-smart-contract-with-oraclize-95656434292e) I wrote


## Build Setup
After completing the above steps:
``` bash
# install dependencies
$ npm install

# run tests
$ cd src/ethereum/truffle
$ truffle test

# serve with hot reload at localhost:8080
$ quasar dev

# build for production with minification
$ quasar build

# lint code
$ quasar lint
```

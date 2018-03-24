# Ethereum Dapp Template

Provides a standard template for creating dapps without using Truffle. A simple lottery smart contract, Lottery.sol, is used for this template. [Quasar Framework](https://github.com/quasarframework/quasar) is used as the foundation, along with [Mocha](https://github.com/mochajs/mocha) and [Gananche CLI](https://github.com/trufflesuite/ganache-cli) for testing, [vuex](https://github.com/vuejs/vuex) for state management, and [vue-router](https://github.com/vuejs/vue-router) for routing. The included [web3](https://github.com/ethereum/web3.js) version is 1.0.0-beta.26. Functions for Ethereum Name Service (ENS) support are included but not used. For a sample ENS implementation, see [this](https://github.com/mds1/send-eth-tx) simple webapp used to send Ethereum transactions.

This code structure was based off the format used in Stephen Grider's Udemy Course, [Ethereum and Solidity: The Complete Developer's Guide](https://www.udemy.com/ethereum-and-solidity-the-complete-developers-guide)

## Configuration
To configure this template for your own dapp, follow the steps below. In steps where you must replace the default placeholder text and variables, use case-sensitive replacements (i.e. variables Lottery and lottery are not interchangeable). These steps will not specify which cases need to be replaced, so it is suggested to always use a case-sensitive find and replace (e.g. first replace `Lottery` with `YourContract`, then replace `lottery` with `yourContract`)

1. Run `$ npm install`
2. In src/ethereum/contracts, replace Lottery.sol with the actual contract file
3. In src/ethereum/compile.js, replace Lottery.sol on line 13 with your contract name
4. Compile your contract using the following steps:
    1. Change to the ethereum folder: `$ cd src/ethereum`
    2. Compile the contract: `$ node compile.js`
5. Step 3 generates an etherem/build folder contraining any compiled contracts. These files will be named *.json, where * is a placeholder for the contract name
6. In src/ethereum/deploy.js:
    1. Replace all instances of Lottery with your contract's name
    2. Replace the seed phrase on line 10 with your own seed phrase. The first address generated by this seed is used to deploy the contract
    3. Replace the URL on line 12 with your own Infura URL. Change the "rinkeby" section as appropriate depending on which network you'd like to deploy to.
7. In src/ethereum/web3.js, change the URL on line 13 to match the URL entered in the previous step
8. Deploy your contract using the following steps. Be sure to save or copy the address the contract was deployed to (this address is written to the console, next to `Contract deployed to:`)
    1. If necessary, uncomment line 29 of src/ethereum/deploy.js and add any input arguments
    2. If not in the ethereum folder: `$ cd ethereum`
    2. Deploy the contract: `$ node deploy.js`
9. In src/ethereum/lotteryInstance.js, change the example address on line 12 to the address the contract was deployed to in step 9. Also replace all instances of lottery with your contract's name. This file allows you to access the contract instance elsewhere by just importing this file (steps for this are provided in the comments of this file)
10. In src/ethereum/lotteryGeneral.js, replace all instances of lottery to your contract's name. This file allows you to access a given instance of the contract by importing this function and passing it the contract's address (steps for this are provided in the comments of this file)
    1. Example use case is you have one contract that a user will use to deploy their own contracts, and you want to access their specific contract instance
    2. You may not need this functionality, in which case you can safely delete this file. This template does not use this functionality, and it is just included for reference.
11. Rename lotteryInstance.js and lotteryGeneral.js to *Instance.js or *General.js, where * is a placeholder for the contract name
12. In test/contract.test.js, relace all instance of Lottery or lottery with the name of your contract.
13. From the project root directory, run tests with `npm run test` as a check that configuration was done properly. Be sure to modify and add tests as necessary.
14. In src/functions.js, edit the return string of the top function (requiredNetwork) so it matches the network your contract was deployed to. Enter the network in the form of the 'Main' or 'Ropsten' (not 'Mainnet', or 'Ropsten Network')
15. In src/pages/Home.vue, replace all instances of Lottery with the name of your contract. Upon building the dapp, if everything was done correctly, the home page should display the contract address and the network you are currently connected to


## Build Setup
After completing the above steps:
``` bash
# install dependencies
$ npm install

# run tests
$ npm run test

# serve with hot reload at localhost:8081
$ quasar dev

# build for production with minification
$ quasar build

# lint code
$ quasar lint
```

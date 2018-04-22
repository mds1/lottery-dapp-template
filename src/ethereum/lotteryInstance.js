import web3 from './web3'
// the file below will be output after compiling
import lottery from './truffle/build/contracts/Lottery.json'

// Create and export instance of the contract
// This allows us to simply import this file to interact with the deployed contract, e.g:
//
//    import lottery from @ethereum\lotteryInstance.js
//    const output = await lottery.methods.someMethod().call()

const instance = new web3.eth.Contract(lottery.abi,
  // *REPLACE* this address with the address of your deployed contract
  '0xa7dfda3859762edd00c355d23131501751ee6bda'
)

export default instance

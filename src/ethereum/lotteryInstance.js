import web3 from './web3'
// ./build/ContractName.json will be output after compiling
import lottery from './build/lottery.json'

// Create and export instance of the lottery contract
// This allows us to simply import this file to access the deployed contract, e.g:
//
//    import lottery from root\ethereum\lotteryInstance.js
//    const output = await lottery.methods.someMethod().call()
const instance = new web3.eth.Contract(JSON.parse(lottery.interface),
  // after deployment, replace this address with the address of the deployed contract
  '0xCe7f635f6dCa110065F6C169329C962f276198c7'
)

export default instance

import web3 from './web3'
// ./build/Lottery.json will be output after compiling
import Lottery from './build/Lottery.json'

// This file is not used in this template and is just here for reference
//
// Create and export function which allows you to import this file,
// then call the imported function with an address as the input to
// access that instance of the contract, such as:
/*
    import Lottery from '@ethereum/Lottery'
    const lottery = Lottery(addressToContract)
*/

// An example use case of this is a crowdfunding dapp, where the dapp has a
// smart contract that allows user to generate their own crowdfunding campaign
// smart contracts. Since each campaign viewable from the dapp has its
// own contract, this function lets you specify the address of a specific
// contract to access.
/*
export default (address) => {
  return new web3.eth.Contract(JSON.parse(Lottery.interface), address)
}
*/

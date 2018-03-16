// set of functions that get used with the EnterForm.vue template
// place this file in the src folder

import { Notify } from 'quasar'
import web3 from '@ethereum/web3'

// =======================================================================================
//                                       Generic
// =======================================================================================


export function requiredNetwork() {
  // this function returns the required network the user must be connected to
  // in order to interact with this dapp
  return 'rinkeby'
}

export async function currentNetwork() {
  // returns the name of the network the user is currently connected to
  const netId = await web3.eth.net.getId()

  switch (netId) {
    case 1:
      return 'Main'
    case 2:
      return 'Morden' // Morden test network is deprecated
    case 3:
      return 'Ropsten'
    case 4:
      return 'Rinkeby'
    case 42:
      return 'Kovan'
    default:
      return 'an unknown Network'
  }

}

export function capitalizeFirstLetter(string) {
  // capitalize the first letter of a string
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function formatNumberForWeb3(value) {
  // formats the value for use with Web3
  //   - removes scientific notation and converts to decimal format
  //   - formats number as a string
  // source: https://stackoverflow.com/questions/16139452/how-to-convert-big-negative-scientific-notation-number-into-decimal-notation-str

  var data = String(value).split(/[eE]/)
  if (data.length == 1) {
    return data[0]
  }

  var z = '', sign = this < 0 ? '-' : '',
    str = data[0].replace('.', ''),
    mag = Number(data[1]) + 1;

  if (mag < 0) {
    z = sign + '0.';
    while (mag++) z += '0';
    return z + str.replace(/^\-/, '');
  }
  mag -= str.length;
  while (mag--) z += '0';
  return str + z;
}

// =======================================================================================
//                                       Validators
// =======================================================================================

// Check if an Ethereum address is valid
export function isValidETHAddress(address) {
  return web3.utils.isAddress(address) && address.length == 42
}


// =======================================================================================
//                              Transaction UI Helpers
// =======================================================================================

export function createTXAlert(html, type) {
  // html: string, valid HTML to be used as the alert's text
  // type: string, adds color and icon, choose 'positive', 'negative', 'warning', 'info'

  const alert = Notify.create({
    message: '', // text is updated later
    timeout: 0,
    type: type,
    actions: [
      {
        label: 'Dismiss',
      }
    ]
  })

  // use setTimeout(function, 0) to ensure element is created by the time we add HTML
  setTimeout(function () {
    // the div containing the text has no class or id, so we first get its parent
    // based on its classes
    const el = document.getElementsByClassName('q-alert-content col self-center')
    // then we update the html of the most recently added notification
    el[el.length - 1].firstChild.innerHTML = html
  }, 0);

  return alert
}

export function createTXLink(network, txhash) {
  // network: string, ethereum network the TX is on (e.g. main, ropsten, etc.)
  // txhash: transaction hash

  // generate URL
  let url
  if (network === 'main') {
    url = 'https://etherscan.io/tx/' + txhash
  }
  else {
    url = 'https://' + network + '.etherscan.io/tx/' + txhash
  }

  const urlHTML = '<a href=' + url + ' target="_blank">' + txhash + '</a>'

  // put together HTML string
  return 'Transaction ID: ' + urlHTML
}

export function trimErrorMessage(msg) {
  // msg: string, error message to trim in length
  const maxLength = 199
  if (typeof msg === 'object') {
    // if input is an object, look for message property
    msg = msg.message.slice(0, maxLength) + ' .....<br><br>The portion of the error message shown above is likely the most important, but the full error message can be found in the console.'
  }

  else if (typeof msg === 'string') {
    // if input is a string, just trim it directly
    msg = msg.slice(0, maxLength) + ' .....<br><br>The portion of the error message shown above is likely the most important, but the full error message can be found in the console.'
  }

  return msg
}
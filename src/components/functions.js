// set of functions that get used with the EnterForm.vue template
// place this file in the src/components/common folder

import { Notify } from 'quasar'
import web3 from '@ethereum/web3'

// =======================================================================================
//                                       Generic
// =======================================================================================

export function requiredNetwork() {
  // returns the required network the user must be connected to in order to interact with this dapp
  // this currently is not needed and is more applicable to deployed smart contracts
  return 'Rinkeby'
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
//                                  ENS Functions
// =======================================================================================

// variables for ENS support, from https://github.com/ethereum/meteor-package-elements/blob/master/addressInput.js
// ENS support added for mainnet only
const ensContractAbi = [{ 'constant': true, 'inputs': [{ 'name': 'node', 'type': 'bytes32' }], 'name': 'resolver', 'outputs': [{ 'name': '', 'type': 'address' }], 'payable': false, 'type': 'function' }, { 'constant': true, 'inputs': [{ 'name': 'node', 'type': 'bytes32' }], 'name': 'owner', 'outputs': [{ 'name': '', 'type': 'address' }], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [{ 'name': 'node', 'type': 'bytes32' }, { 'name': 'label', 'type': 'bytes32' }, { 'name': 'owner', 'type': 'address' }], 'name': 'setSubnodeOwner', 'outputs': [], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [{ 'name': 'node', 'type': 'bytes32' }, { 'name': 'ttl', 'type': 'uint64' }], 'name': 'setTTL', 'outputs': [], 'payable': false, 'type': 'function' }, { 'constant': true, 'inputs': [{ 'name': 'node', 'type': 'bytes32' }], 'name': 'ttl', 'outputs': [{ 'name': '', 'type': 'uint64' }], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [{ 'name': 'node', 'type': 'bytes32' }, { 'name': 'resolver', 'type': 'address' }], 'name': 'setResolver', 'outputs': [], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [{ 'name': 'node', 'type': 'bytes32' }, { 'name': 'owner', 'type': 'address' }], 'name': 'setOwner', 'outputs': [], 'payable': false, 'type': 'function' }, { 'anonymous': false, 'inputs': [{ 'indexed': true, 'name': 'node', 'type': 'bytes32' }, { 'indexed': false, 'name': 'owner', 'type': 'address' }], 'name': 'Transfer', 'type': 'event' }, { 'anonymous': false, 'inputs': [{ 'indexed': true, 'name': 'node', 'type': 'bytes32' }, { 'indexed': true, 'name': 'label', 'type': 'bytes32' }, { 'indexed': false, 'name': 'owner', 'type': 'address' }], 'name': 'NewOwner', 'type': 'event' }, { 'anonymous': false, 'inputs': [{ 'indexed': true, 'name': 'node', 'type': 'bytes32' }, { 'indexed': false, 'name': 'resolver', 'type': 'address' }], 'name': 'NewResolver', 'type': 'event' }, { 'anonymous': false, 'inputs': [{ 'indexed': true, 'name': 'node', 'type': 'bytes32' }, { 'indexed': false, 'name': 'ttl', 'type': 'uint64' }], 'name': 'NewTTL', 'type': 'event' }]
const resolverContractAbi = [{ 'constant': true, 'inputs': [{ 'name': 'interfaceID', 'type': 'bytes4' }], 'name': 'supportsInterface', 'outputs': [{ 'name': '', 'type': 'bool' }], 'payable': false, 'type': 'function' }, { 'constant': true, 'inputs': [{ 'name': 'node', 'type': 'bytes32' }, { 'name': 'contentTypes', 'type': 'uint256' }], 'name': 'ABI', 'outputs': [{ 'name': 'contentType', 'type': 'uint256' }, { 'name': 'data', 'type': 'bytes' }], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [{ 'name': 'node', 'type': 'bytes32' }, { 'name': 'x', 'type': 'bytes32' }, { 'name': 'y', 'type': 'bytes32' }], 'name': 'setPubkey', 'outputs': [], 'payable': false, 'type': 'function' }, { 'constant': true, 'inputs': [{ 'name': 'node', 'type': 'bytes32' }], 'name': 'content', 'outputs': [{ 'name': 'ret', 'type': 'bytes32' }], 'payable': false, 'type': 'function' }, { 'constant': true, 'inputs': [{ 'name': 'node', 'type': 'bytes32' }], 'name': 'addr', 'outputs': [{ 'name': 'ret', 'type': 'address' }], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [{ 'name': 'node', 'type': 'bytes32' }, { 'name': 'contentType', 'type': 'uint256' }, { 'name': 'data', 'type': 'bytes' }], 'name': 'setABI', 'outputs': [], 'payable': false, 'type': 'function' }, { 'constant': true, 'inputs': [{ 'name': 'node', 'type': 'bytes32' }], 'name': 'name', 'outputs': [{ 'name': 'ret', 'type': 'string' }], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [{ 'name': 'node', 'type': 'bytes32' }, { 'name': 'name', 'type': 'string' }], 'name': 'setName', 'outputs': [], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [{ 'name': 'node', 'type': 'bytes32' }, { 'name': 'hash', 'type': 'bytes32' }], 'name': 'setContent', 'outputs': [], 'payable': false, 'type': 'function' }, { 'constant': true, 'inputs': [{ 'name': 'node', 'type': 'bytes32' }], 'name': 'pubkey', 'outputs': [{ 'name': 'x', 'type': 'bytes32' }, { 'name': 'y', 'type': 'bytes32' }], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [{ 'name': 'node', 'type': 'bytes32' }, { 'name': 'addr', 'type': 'address' }], 'name': 'setAddr', 'outputs': [], 'payable': false, 'type': 'function' }, { 'inputs': [{ 'name': 'ensAddr', 'type': 'address' }], 'payable': false, 'type': 'constructor' }, { 'anonymous': false, 'inputs': [{ 'indexed': true, 'name': 'node', 'type': 'bytes32' }, { 'indexed': false, 'name': 'a', 'type': 'address' }], 'name': 'AddrChanged', 'type': 'event' }, { 'anonymous': false, 'inputs': [{ 'indexed': true, 'name': 'node', 'type': 'bytes32' }, { 'indexed': false, 'name': 'hash', 'type': 'bytes32' }], 'name': 'ContentChanged', 'type': 'event' }, { 'anonymous': false, 'inputs': [{ 'indexed': true, 'name': 'node', 'type': 'bytes32' }, { 'indexed': false, 'name': 'name', 'type': 'string' }], 'name': 'NameChanged', 'type': 'event' }, { 'anonymous': false, 'inputs': [{ 'indexed': true, 'name': 'node', 'type': 'bytes32' }, { 'indexed': true, 'name': 'contentType', 'type': 'uint256' }], 'name': 'ABIChanged', 'type': 'event' }, { 'anonymous': false, 'inputs': [{ 'indexed': true, 'name': 'node', 'type': 'bytes32' }, { 'indexed': false, 'name': 'x', 'type': 'bytes32' }, { 'indexed': false, 'name': 'y', 'type': 'bytes32' }], 'name': 'PubkeyChanged', 'type': 'event' }]
const ensAddress = '0x314159265dd8dbb310642f98f50c066173c1259b'

// set ensContract
export const ensContract = new web3.eth.Contract(ensContractAbi, ensAddress);

function sha3(str, opt) {
  // source: https://github.com/ethereum/meteor-package-elements/blob/master/addressInput.js
  return "0x" + web3.utils.sha3(str, opt).replace("0x", "");
}

function namehash(name) {
  // source: https://github.com/ethereum/meteor-package-elements/blob/master/addressInput.js
  var node =
    "0x0000000000000000000000000000000000000000000000000000000000000000";
  if (name != "") {
    var labels = name.split(".");
    for (var i = labels.length - 1; i >= 0; i--) {
      node = sha3(node + sha3(labels[i]).slice(2), { encoding: "hex" });
    }
  }
  return node.toString();
}

export async function getAddr(name, ens, callback) {
  // source: https://github.com/ethereum/meteor-package-elements/blob/master/addressInput.js

  // NEW: added async check for which network we're connected to, since only mainnet ENS is supported
  // (this was not part of the original source code linked above)
  const network = await currentNetwork()
  if (network !== 'Main') {
    return null
  }

  var resolverContract = new web3.eth.Contract(resolverContractAbi);

  var node = namehash(name);
  // get a resolver address for that name
  ens.methods
    .resolver(node)
    .call()
    .then(function (resolverAddress) {
      if (resolverAddress != 0) {
        // if you find one, find the addr of that resolver
        resolverContract.options.address = resolverAddress;
        resolverContract.methods
          .addr(node)
          .call()
          .then(function (result) {
            if (result != 0 && callback) {
              callback(result);
            }
          });
      } else {
        // NEW: added this else block to ensure address state is set to null if invalid ENS name is entered
        // (this else block was not part of the original source code linked above)
        callback(null)
      }
    });
}

function getName(address, ens, callback) {
  // source: https://github.com/ethereum/meteor-package-elements/blob/master/addressInput.js
  var resolverContract = new web3.eth.Contract(resolverContractAbi);
  var node = namehash(
    address.toLowerCase().replace("0x", "") + ".addr.reverse"
  );

  // get a resolver address for that name
  ens.methods.resolver(node).call(function (error, resolverAddress) {
    if (error) {
      console.log("Error from ens getName: ", error);
      return;
    }

    if (resolverAddress != 0) {
      // if you find one, find the name on that resolver
      resolverContract.options.address = resolverAddress;
      resolverContract.methods.name(node, function (error, result) {
        if (!error && result != 0 && callback) {
          callback(result);
        }
      });
    }
  });
}


// =======================================================================================
//                                       Validators
// =======================================================================================

// Check if an Ethereum address is valid
export function isValidETHAddress(address) {
  return web3.utils.isAddress(address) && address.length == 42
}

export async function isValidENSDomain(name, ens) {
  // this is a modified version of getAddr to use for form validation
  // modified from getAddr: https://github.com/ethereum/meteor-package-elements/blob/master/addressInput.js

  // ensure address ends with .eth
  if (name.slice(-4) !== ".eth") {
    return false
  }

  var resolverContract = new web3.eth.Contract(resolverContractAbi);

  var node = namehash(name);

  let result;
  // get a resolver address for that name
  await ens.methods
    .resolver(node)
    .call()
    .then(function (resolverAddress) {
      if (resolverAddress != 0) {
        result = true

      } else {
        // NEW: added this else block to ensure address state is set to null if invalid ENS name is entered
        // (this else block was not part of the original source code linked above)
        result = false
      }
    });

  return result
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
  if (network.toUpperCase() === 'MAIN') {
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
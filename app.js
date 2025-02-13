import {
  ethers,
  formatEther,
} from 'https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js';
import { createAddressInfo, displayAddressError } from './utilities/dom.js';
// balance should update after every transaction.

let provider;

const initApp = () => {
  provider = new ethers.JsonRpcProvider('http://localhost:8545');
  console.log(provider);

  const addressInput = document.querySelector('#getBalance');
  addressInput.addEventListener('click', getCurrentBalance);
  displayCurrentBlock();
};

const displayCurrentBlock = async () => {
  const totalBlocks = await provider.getBlockNumber();
  document.querySelector('#totalBlocks').textContent = totalBlocks;
  // should refresh every transaction.
};

const validateAddressFormat = (address) => {
  if (
    address.length !== 42 ||
    address.slice(0, 2) !== '0x' ||
    !/^[a-z0-9]+$/i.test(address)
  ) {
    displayAddressError('Input did not match any address.');
  } else {
    return address;
  }
};

const getCurrentBalance = async () => {
  const address = validateAddressFormat(
    document.querySelector('#addressInput').value
  );

  if (!address) return;

  const balance = await provider.getBalance(address);
  createAddressInfo(address, formatEther(balance));
};

document.addEventListener('DOMContentLoaded', initApp);

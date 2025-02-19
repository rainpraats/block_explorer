import {
  ethers,
  formatEther,
  parseEther,
} from 'https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js';

import {
  displayAddressError,
  displayBalance,
  displayTransactionResult,
  displayTransactionError,
} from './utilities/dom.js';
// balance should update after every transaction.
// inputing address should automaticaly input address into sender.
// transaction timestamp should be used as transaction time.
// wrap every await in try catch

const initApp = () => {
  const button = document.querySelector('#getBalance');
  button.addEventListener('click', connectWallet);

  const transactionForm = document.querySelector('#transaction');
  transactionForm.addEventListener('submit', sendTransaction);

  displayCurrentBlock();
};

const connectWallet = async () => {
  const addressInput = document.querySelector('#addressInput');
  const address = validateAddressFormat(addressInput.value);

  if (!address) {
    displayAddressError('Input did not match any address.');
  }

  const balance = await getAccountBalance(address);
  displayBalance(address, balance);
};

const getAccountBalance = async (address) => {
  const provider = new ethers.JsonRpcProvider('HTTP://127.0.0.1:8545');
  const balance = await provider.getBalance(address);
  return formatEther(balance);
};

const displayCurrentBlock = async () => {
  const provider = new ethers.JsonRpcProvider('HTTP://127.0.0.1:8545');
  const totalBlocks = await provider.getBlockNumber();
  document.querySelector('#totalBlocks').textContent = totalBlocks;
  // should refresh every transaction.
};

export const validateAddressFormat = (address) => {
  if (
    address.length !== 42 ||
    address.slice(0, 2) !== '0x' ||
    !/^[a-z0-9]+$/i.test(address)
  ) {
    return;
  } else {
    return address;
  }
};

const sendTransaction = async (e) => {
  e.preventDefault();

  const data = new FormData(e.target);
  const formData = Object.fromEntries(data);

  // check that the input and output adresses go through the check
  if (!validateAddressFormat(formData.fromAddress)) {
    displayTransactionError(
      'Check the sender address. Input did not match any address.'
    );

    return;
  }

  if (!validateAddressFormat(formData.toAddress)) {
    displayTransactionError(
      'Check the reciver address. Input did not match any address.'
    );

    return;
  }

  const balance = await getAccountBalance(formData.fromAddress);
  if (balance < formData.amount) {
    displayTransactionError(
      'You cant send an amount bigger than the account balance.'
    );

    return;
  }

  // split the above into a seperate function.
  const provider = new ethers.JsonRpcProvider('HTTP://127.0.0.1:8545');
  const signer = await provider.getSigner(formData.fromAddress);

  const trx = await signer.sendTransaction({
    to: formData.toAddress,
    value: parseEther(formData.amount),
  });

  // split the above into a seperate function.
  const time = new Date();

  displayTransactionResult(
    formData.fromAddress,
    formData.toAddress,
    formData.amount,
    time.toLocaleString()
  );

  connectWallet(); // wierd that its called this.

  displayCurrentBlock();
};

document.addEventListener('DOMContentLoaded', initApp);

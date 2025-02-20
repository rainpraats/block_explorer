import {
  formatEther,
  parseEther,
} from 'https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js';

import DOMManipulator from './utilities/dom.js';
import { createProvider } from './utilities/provider.js';

// balance should update after every transaction.
// inputing address should automaticaly input address into sender.
// transaction timestamp should be used as transaction time.
// wrap every await in try catch
// add user experience for when server is down.

const initApp = () => {
  const button = document.querySelector('#getBalance');
  button.addEventListener('click', callAddress);

  const transactionForm = document.querySelector('#transaction');
  transactionForm.addEventListener('submit', sendTransaction);

  displayCurrentBlock();
};

const callAddress = async () => {
  const addressInput = document.querySelector('#addressInput');
  const address = validateAddressFormat(addressInput.value);

  if (!address) {
    return DOMManipulator.displayAddressError(
      'Input did not match any address.'
    );
  }

  try {
    const balance = await getAccountBalance(address);
    DOMManipulator.displayBalance(address, balance);
  } catch (error) {
    DOMManipulator.displayAddressError('Failed to fetch balance.');
  }
};

const getAccountBalance = async (address) => {
  const provider = createProvider();
  const balance = await provider.getBalance(address);
  return formatEther(balance);
};

const displayCurrentBlock = async () => {
  try {
    const provider = createProvider();
    const totalBlocks = await provider.getBlockNumber();
    document.querySelector('#totalBlocks').textContent = totalBlocks;
  } catch (error) {
    console.error('Failed to fetch block number.');
  }
};

export const validateAddressFormat = (address) => {
  if (
    address.length !== 42 ||
    address.slice(0, 2) !== '0x' ||
    !/^[a-z0-9]+$/i.test(address)
  ) {
    return null;
  }
  return address;
};

const sendTransaction = async (e) => {
  e.preventDefault();

  const data = new FormData(e.target);
  const formData = Object.fromEntries(data);

  if (!validateAddressFormat(formData.fromAddress)) {
    return DOMManipulator.displayTransactionError(
      'Check the sender address. Input did not match any address.'
    );
  }

  if (!validateAddressFormat(formData.toAddress)) {
    return DOMManipulator.displayTransactionError(
      'Check the receiver address. Input did not match any address.'
    );
  }

  try {
    const balance = await getAccountBalance(formData.fromAddress);
    if (balance < formData.amount) {
      return DOMManipulator.displayTransactionError(
        "You can't send an amount bigger than the account balance."
      );
    }

    await executeTransaction(formData);
    callAddress();
    displayCurrentBlock();
  } catch (error) {
    DOMManipulator.displayTransactionError('Transaction failed.');
  }
};

const executeTransaction = async (formData) => {
  const provider = createProvider();
  const signer = await provider.getSigner(formData.fromAddress);

  const trx = await signer.sendTransaction({
    to: formData.toAddress,
    value: parseEther(formData.amount),
  });

  const time = new Date();
  DOMManipulator.displayTransactionResult(
    formData.fromAddress,
    formData.toAddress,
    formData.amount,
    time.toLocaleString()
  );
};

document.addEventListener('DOMContentLoaded', initApp);

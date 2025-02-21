import {
  formatEther,
  parseEther,
} from 'https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js';

import {
  validateAddressFormat,
  validateTransactionForm,
} from './validation.js';
import {
  getAccountBalance,
  createSigner,
  getTransactionByHash,
  getBlockByHash,
  getCurrentBlock,
} from './rpcGetRequests.js';
import { DOMManipulator } from './dom.js';

const domManipulator = new DOMManipulator();

export const callAddress = async () => {
  const addressInput = document.querySelector('#addressInput');
  const address = validateAddressFormat(addressInput.value);

  if (!address) {
    return domManipulator.displayAddressError(
      'Input did not match any address.'
    );
  }

  try {
    const balance = await getAccountBalance(address);
    domManipulator.displayBalance(address, balance);
  } catch (error) {
    domManipulator.displayAddressError('Failed to fetch address data.');
    throw new Error(error);
  }
};

export const displayCurrentBlock = async () => {
  try {
    const totalBlocks = await getCurrentBlock();
    document.querySelector('#totalBlocks').textContent = totalBlocks;
  } catch (error) {
    throw new Error(`Failed to fetch block number. ${error}`);
  }
};

export const handleTransactionSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(e.target);
  const formData = Object.fromEntries(data);

  try {
    const validTransactionForm = await validateTransactionForm(formData);

    if (!validTransactionForm) return;

    const receipt = await executeTransaction(formData);
    handleTransactionSuccess(receipt);
  } catch (error) {
    domManipulator.displayTransactionError(
      'An error occured when creating the transaction.'
    );
    throw new Error(`Error on transaction submit - ${error}`);
  }
};

const executeTransaction = async (formData) => {
  try {
    const signer = await createSigner(formData.fromAddress);

    const trx = await signer.sendTransaction({
      to: formData.toAddress,
      value: parseEther(formData.amount),
    });

    const receipt = await trx.wait();

    return receipt;
  } catch (error) {
    domManipulator.displayTransactionError('Transaction failed.');
    throw new Error(error);
  }
};

const handleTransactionSuccess = async (receipt) => {
  try {
    await callAddress();
    await displayCurrentBlock();
    await handleReceipt(receipt);
  } catch (error) {
    throw new Error(error);
  }
};

const handleReceipt = async (receipt) => {
  try {
    const transaction = await getTransactionByHash(receipt.hash);
    const block = await getBlockByHash(receipt.blockHash);

    const transactionTime = new Date(block.timestamp * 1000).toLocaleString();

    domManipulator.displayTransactionReceipt(
      receipt.from,
      receipt.to,
      formatEther(transaction.value),
      transactionTime
    );
  } catch (error) {
    throw new Error(error);
  }
};

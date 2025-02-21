import { formatEther } from 'https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js';

import { createProvider } from './provider.js';
import DOMManipulator from './dom.js';

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

export const validateTransactionForm = async (formData) => {
  if (!validateAddressFormat(formData.fromAddress)) {
    DOMManipulator.displayTransactionError(
      'Check the sender address. Input did not match any address.'
    );
    return null;
  }

  if (!validateAddressFormat(formData.toAddress)) {
    DOMManipulator.displayTransactionError(
      'Check the receiver address. Input did not match any address.'
    );
    return null;
  }

  try {
    const balance = await getAccountBalance(formData.fromAddress);
    const balanceInNumber = parseFloat(balance);
    const amountInNumber = parseFloat(formData.amount);

    if (balanceInNumber < amountInNumber) {
      DOMManipulator.displayTransactionError(
        "You can't send an amount bigger than the account balance."
      );
      return null;
    }
  } catch (error) {
    throw new Error(error);
  }

  return true;
};

export const getAccountBalance = async (address) => {
  try {
    const provider = createProvider();
    const balance = await provider.getBalance(address);
    return formatEther(balance);
  } catch (error) {
    throw new Error(error);
  }
};

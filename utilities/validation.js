import { formatEther } from 'https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js';

import { getAccountBalance } from './rpcGetRequests.js';
import { DOMManipulator } from './dom.js';

const domManipulator = new DOMManipulator();

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
    domManipulator.displayTransactionError(
      'Check the sender address. Input did not match any address.'
    );
    return null;
  }

  if (!validateAddressFormat(formData.toAddress)) {
    domManipulator.displayTransactionError(
      'Check the receiver address. Input did not match any address.'
    );
    return null;
  }

  try {
    const balance = await getAccountBalance(formData.fromAddress);
    const balanceInNumber = parseFloat(balance);
    const amountInNumber = parseFloat(formData.amount);

    if (balanceInNumber < amountInNumber) {
      domManipulator.displayTransactionError(
        "You can't send an amount bigger than the account balance."
      );
      return null;
    }
  } catch (error) {
    throw new Error(error);
  }

  return true;
};

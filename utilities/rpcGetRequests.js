import { formatEther } from 'https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js';

import { createProvider } from './provider.js';

export const getAccountBalance = async (address) => {
  try {
    const provider = createProvider();
    const balance = await provider.getBalance(address);
    return formatEther(balance);
  } catch (error) {
    throw new Error(error);
  }
};

export const createSigner = async (senderAddress) => {
  try {
    const provider = createProvider();
    return await provider.getSigner(senderAddress);
  } catch (error) {
    throw new Error(error);
  }
};

export const getBlockByHash = async (blockHash) => {
  const provider = createProvider();
  try {
    return await provider.getBlock(blockHash);
  } catch (error) {
    throw new Error(error);
  }
};

export const getTransactionByHash = async (transactionHash) => {
  const provider = createProvider();
  try {
    return await provider.getTransaction(transactionHash);
  } catch (error) {
    throw new Error(error);
  }
};

export const getCurrentBlock = async () => {
  try {
    const provider = createProvider();
    return await provider.getBlockNumber();
  } catch (error) {
    throw new Error(error);
  }
};

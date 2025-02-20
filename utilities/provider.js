import { ethers } from 'https://cdnjs.cloudflare.com/ajax/libs/ethers/6.7.0/ethers.min.js';

const PROVIDER_URL = 'HTTP://127.0.0.1:8545';

export const createProvider = () => new ethers.JsonRpcProvider(PROVIDER_URL);

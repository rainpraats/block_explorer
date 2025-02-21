import {
  callAddress,
  handleTransactionSubmit,
  displayCurrentBlock,
} from './utilities/blockchainServices.js';

const initApp = () => {
  const button = document.querySelector('#getBalance');
  button.addEventListener('click', callAddress);

  const transactionForm = document.querySelector('#transaction');
  transactionForm.addEventListener('submit', handleTransactionSubmit);

  displayCurrentBlock();
};

document.addEventListener('DOMContentLoaded', initApp);

export const createAddressInfo = (address, balance) => {
  document.querySelector('#addressInfo').innerHTML = `
    <p>Address: ${address}</p>
    <p>Balance: ${balance}</p>
  `;
};

export const createTransactionResult = (from, to, amount, time) => {
  const div = document.querySelector('#transactionResult');

  div.innerHTML = `
    <p>Transaction created at: ${time}</p>
    <p>From: ${from}</p>
    <p>To: ${to}</p>
    <p>Amount: ${amount}</p>
  `;

  div.style.display = 'block';
};

export const displayAddressError = (message) => {
  const div = document.querySelector('#addressInfo');

  div.innerHTML = `
    <p>${message}</p>
  `;
  div.style.display = 'block';
};

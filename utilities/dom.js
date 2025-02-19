export const displayTransactionResult = (from, to, amount, time) => {
  const div = document.querySelector('#transactionInfo');

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

export const displayTransactionError = (message) => {
  const div = document.querySelector('#transactionInfo');

  div.innerHTML = `
    <p>${message}</p>
  `;
  div.style.display = 'block';
};

export const displayBalance = (address, balance) => {
  const div = document.querySelector('#addressInfo');

  div.innerHTML = `
    <p>Address: ${address}</p>
    <p>Balance: ${balance}</p>
  `;

  div.style.display = 'block';
};

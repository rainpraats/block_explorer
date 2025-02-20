class DOMManipulator {
  constructor() {
    this.addressInfoDiv = document.querySelector('#addressInfo');
    this.transactionInfoDiv = document.querySelector('#transactionInfo');
  }

  displayTransactionResult(from, to, amount, time) {
    this.transactionInfoDiv.innerHTML = `
      <p>Transaction created at: ${time}</p>
      <p>From: ${from}</p>
      <p>To: ${to}</p>
      <p>Amount: ${amount}</p>
    `;
    this.transactionInfoDiv.style.display = 'block';
  }

  displayAddressError(message) {
    this.addressInfoDiv.innerHTML = `<p>${message}</p>`;
    this.addressInfoDiv.style.display = 'block';
  }

  displayTransactionError(message) {
    this.transactionInfoDiv.innerHTML = `<p>${message}</p>`;
    this.transactionInfoDiv.style.display = 'block';
  }

  displayBalance(address, balance) {
    this.addressInfoDiv.innerHTML = `
      <p>Address: ${address}</p>
      <p>Balance: ${balance}</p>
    `;
    this.addressInfoDiv.style.display = 'block';
  }
}

export default new DOMManipulator();

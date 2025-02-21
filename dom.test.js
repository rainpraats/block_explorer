import fs from 'fs';
import path from 'path';
import { Window } from 'happy-dom';

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DOMManipulator } from './utilities/dom.js';

const docPath = path.join(process.cwd(), 'index.html');
const docContent = fs.readFileSync(docPath).toString();

const window = new Window();
const document = window.document;

vi.stubGlobal('document', document);

const domManipulator = new DOMManipulator();

beforeEach(() => {
  document.body.innerHTML = '';
  document.write(docContent);
});

describe('Search Address div', () => {
  it('Address info div should initially be invisible', () => {
    const div = document.querySelector('#addressInfo');
    expect(div.style.display).toBe('none');
  });

  it('Not inputting a correct address results in error.', () => {
    const input = document.querySelector('#addressInput');
    input.value = '0x0000';
    domManipulator.displayAddressError('Input did not match any address.');
    const div = document.querySelector('#addressInfo');
    expect(div.innerHTML).toContain('Input did not match any address.');
  });

  it('Problem getting the address info results in error', () => {
    const div = document.querySelector('#addressInfo');
    domManipulator.displayAddressError('Failed to fetch balance.');
    expect(div.innerHTML).toContain('Failed to fetch balance.');
  });

  it('Address should be the same as input value.', () => {
    const input = document.querySelector('#addressInput');
    input.value = '0x1234567890abcdef1234567890abcdef12345678';
    domManipulator.displayBalance(input.value, '10.0');
    const div = document.querySelector('#addressInfo');
    expect(div.innerHTML).toContain(
      '0x1234567890abcdef1234567890abcdef12345678'
    );
  });

  it('Balance should display a value in ETH.', () => {
    const input = document.querySelector('#addressInput');
    input.value = '0x1234567890abcdef1234567890abcdef12345678';
    domManipulator.displayBalance(input.value, '10.0');
    const div = document.querySelector('#addressInfo');
    expect(div.innerHTML).toContain('10.0');
  });
});

describe('Transaction div', () => {
  it('Transaction div should initially be invisible', () => {
    const div = document.querySelector('#transactionInfo');
    expect(div.style.display).toBe('none');
  });

  it('Should display the same values as the inputs after sending a transaction.', () => {
    const from = '0x1234567890abcdef1234567890abcdef12345678';
    const to = '0xabcdef1234567890abcdef1234567890abcdef12';
    const amount = '1.0';
    const time = new Date().toLocaleString();
    domManipulator.displayTransactionResult(from, to, amount, time);
    const div = document.querySelector('#transactionInfo');
    expect(div.innerHTML).toContain(from);
    expect(div.innerHTML).toContain(to);
    expect(div.innerHTML).toContain(amount);
    expect(div.innerHTML).toContain(time);
  });

  it('Send more than you have displays error message.', () => {
    domManipulator.displayTransactionError(
      "You can't send an amount bigger than the account balance."
    );
    const div = document.querySelector('#transactionInfo');
    expect(div.innerHTML).toContain(
      "You can't send an amount bigger than the account balance."
    );
  });

  it('Transaction failing should display an error message.', () => {
    domManipulator.displayTransactionError('Transaction failed.');
    const div = document.querySelector('#transactionInfo');
    expect(div.innerHTML).toContain('Transaction failed.');
  });
});

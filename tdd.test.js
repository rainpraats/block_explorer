import fs from 'fs';
import path from 'path';
import { Window } from 'happy-dom';

import { beforeEach, expect, it, vi } from 'vitest';
import {} from './';

const docPath = path.join(process.cwd(), 'index.html');
const docContent = fs.readFileSync(docPath).toString();

const window = new Window();
const document = window.document;

vi.stubGlobal('document', document);

beforeEach(() => {
  document.body.innerHTML = '';
  document.write(docContent);
});

describe('Address input', () => {
  it('Putting in an address thats too long results in error.', () => {
    // Arrange ...
    // Act ...
    // Assert ...
  });

  it('Using symbols other than a-z, A-Z and 0-9 results in error.', () => {
    // Arrange ...
    // Act ...
    // Assert ...
  });

  it('Address should start with 0x', () => {
    // Arrange ...
    // Act ...
    // Assert ...
  });
});

describe('Search Address div', () => {
  it('Address result div should initially be invisible', () => {
    const div = document.querySelector('#addressInfo');

    expect(div.getElementsByClassName.display).toBe('none');
  });

  it('Not inputing a correct address results in error.', () => {
    // Arrange ...
    // Act ...
    // Assert ...
  });

  it('Problem getting the address info results in error', () => {
    // Arrange ...
    const div = document.querySelector('#addressInfo');

    // Act ...

    // Assert ...
  });

  it('Address should be the same as input value.', () => {
    // Arrange ...
    // Act ...
    // Assert ...
  });

  it('Balance should display a value in ETH.', () => {
    // Arrange ...
    // Act ...
    // Assert ...
  });
});

describe('Transaction div', () => {
  it('Transaction div should initially be invisible', () => {
    const div = document.querySelector('#transactionResult');

    expect(div.getElementsByClassName.display).toBe('none');
  });

  it('Should display the same values as the inputs after sending a transaction.', () => {
    // Arrange ...
    // Act ...
    // Assert ...
  });

  it('Send more than you have displays error message.', () => {
    // Arrange ...
    // Act ...
    // Assert ...
  });

  it('Transaction failing should display an error message.', () => {
    // Arrange ...
    // Act ...
    // Assert ...
  });
});

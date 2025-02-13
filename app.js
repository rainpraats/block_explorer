const initApp = () => {
  displayCurrentBlock();
};

const displayCurrentBlock = () => {};

const validateAddressFormat = (address) => {
  if (
    address.length !== 42 ||
    address.slice(0, 2) !== '0x' ||
    !/^[a-z0-9]+$/i.test(address)
  ) {
    displayAddressError('Input did not match any address.');
  }
};

document.addEventListener('DOMContentLoaded', initApp);

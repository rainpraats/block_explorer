export class Provider {
  constructor() {
    this.provider = new ethers.JSONRpcProvider('http://localhost:8545');
  }
}

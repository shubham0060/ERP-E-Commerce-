
interface Block {
  timestamp: number;
  data: any;
  previousHash: string;
  hash: string;
  nonce: number;
}

export class Blockchain {
  private chain: Block[];
  private difficulty: number;

  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;
  }

  private createGenesisBlock(): Block {
    return {
      timestamp: Date.now(),
      data: "Genesis Block",
      previousHash: "0",
      hash: this.calculateHash(Date.now(), "Genesis Block", "0", 0),
      nonce: 0
    };
  }

  private calculateHash(timestamp: number, data: any, previousHash: string, nonce: number): string {
    const crypto = require('crypto');
    return crypto
      .createHash('sha256')
      .update(timestamp + JSON.stringify(data) + previousHash + nonce)
      .digest('hex');
  }

  private mineBlock(timestamp: number, data: any, previousHash: string): Block {
    let nonce = 0;
    let hash = this.calculateHash(timestamp, data, previousHash, nonce);

    while (hash.substring(0, this.difficulty) !== Array(this.difficulty + 1).join("0")) {
      nonce++;
      hash = this.calculateHash(timestamp, data, previousHash, nonce);
    }

    return { timestamp, data, previousHash, hash, nonce };
  }

  addBlock(data: any): Block {
    const previousBlock = this.chain[this.chain.length - 1];
    const newBlock = this.mineBlock(Date.now(), data, previousBlock.hash);
    this.chain.push(newBlock);
    return newBlock;
  }

  isValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }

      if (currentBlock.hash !== this.calculateHash(
        currentBlock.timestamp,
        currentBlock.data,
        currentBlock.previousHash,
        currentBlock.nonce
      )) {
        return false;
      }
    }
    return true;
  }

  getChain(): Block[] {
    return this.chain;
  }
}

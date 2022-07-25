import Arweave from 'arweave';
import fetch from 'node-fetch';
import { JWKInterface } from 'arweave/node/lib/wallet';
import Blockweave from 'blockweave';
import { stringToBuffer } from 'blockweave/dist/utils/buffer';
export default class Arg8 {
  private wallet: JWKInterface;
  private gatewayUrl: string;
  arweave: Arweave;
  constructor(wallet: JWKInterface, gatewayUrl?: string) {
    this.wallet = wallet;
    this.gatewayUrl = gatewayUrl ? gatewayUrl : 'https://arweave.live';
    const url = new URL(this.gatewayUrl);
    this.arweave = Arweave.init({
      host: url.hostname,
      port: url.port ? url.port : url.protocol === 'https' ? 443 : 80,
      protocol: url.protocol.slice(0, -1),
    });
  }

  public async deposit(
    quantity: number,
    target: string,
  ): Promise<{
    status: number;
    statusText: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
  }> {
    const transaction = await this.arweave.createTransaction(
      {
        target,
        quantity: `${quantity}`,
      },
      this.wallet,
    );
    await this.arweave.transactions.sign(transaction, this.wallet);
    return this.arweave.transactions.post(transaction);
  }
  public async getTx(txId: string) {
    const url = new URL(`tx/${txId}`, this.gatewayUrl);
    return this.get(url.href);
  }
  public async getTxData(txId: string) {
    const url = new URL(txId, this.gatewayUrl);
    return this.get(url.href);
  }
  public async getBalance() {
    const url = new URL('balance', this.gatewayUrl);
    return this.get(url.href);
  }
  private async get(url: string) {
    return fetch(url, {
      headers: await this.createHeaders(),
    });
  }
  private async createHeaders() {
    const address = await this.arweave.wallets.getAddress(this.wallet);

    const rawSignature = await Blockweave.crypto.sign(this.wallet, stringToBuffer(address));
    const signature = Arweave.utils.bufferTob64Url(rawSignature);
    return {
      address,
      signature,
    };
  }
}

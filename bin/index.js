'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const arweave_1 = __importDefault(require('arweave'));
const node_fetch_1 = __importDefault(require('node-fetch'));
const blockweave_1 = __importDefault(require('blockweave'));
const buffer_1 = require('blockweave/dist/utils/buffer');
class Arg8 {
  constructor(wallet, gatewayUrl) {
    this.wallet = wallet;
    this.gatewayUrl = gatewayUrl ? gatewayUrl : 'https://arweave.live';
    const url = new URL(this.gatewayUrl);
    this.arweave = arweave_1.default.init({
      host: url.hostname,
      port: url.port ? url.port : url.protocol === 'https' ? 443 : 80,
      protocol: url.protocol.slice(0, -1),
    });
  }
  deposit(quantity, target) {
    return __awaiter(this, void 0, void 0, function* () {
      const transaction = yield this.arweave.createTransaction(
        {
          target,
          quantity: `${quantity}`,
        },
        this.wallet,
      );
      yield this.arweave.transactions.sign(transaction, this.wallet);
      return this.arweave.transactions.post(transaction);
    });
  }
  getTx(txId) {
    return __awaiter(this, void 0, void 0, function* () {
      const url = new URL(`tx/${txId}`, this.gatewayUrl);
      return this.get(url.href);
    });
  }
  getTxData(txId) {
    return __awaiter(this, void 0, void 0, function* () {
      const url = new URL(txId, this.gatewayUrl);
      return this.get(url.href);
    });
  }
  getBalance() {
    return __awaiter(this, void 0, void 0, function* () {
      const url = new URL('balance', this.gatewayUrl);
      return this.get(url.href);
    });
  }
  get(url) {
    return __awaiter(this, void 0, void 0, function* () {
      return (0, node_fetch_1.default)(url, {
        headers: yield this.createHeaders(),
      });
    });
  }
  createHeaders() {
    return __awaiter(this, void 0, void 0, function* () {
      const address = yield this.arweave.wallets.getAddress(this.wallet);
      const rawSignature = yield blockweave_1.default.crypto.sign(this.wallet, (0, buffer_1.stringToBuffer)(address));
      const signature = arweave_1.default.utils.bufferTob64Url(rawSignature);
      return {
        address,
        signature,
      };
    });
  }
}
exports.default = Arg8;

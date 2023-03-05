import { StardustCustodialSDK, StardustApp, StardustWallet } from '../src';
import { ethers } from 'ethers';

const uuidRegex =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;
describe('e2e', () => {
  let apiKey: string;
  let walletId: string;
  describe('basic create and get flows', () => {
    it('should create an app in the Stardust database', async () => {
      const app: StardustApp = new StardustApp('name', 'email', 'description');
      await StardustCustodialSDK.createApp(app);
      apiKey = app.apiKey!;
      expect(app).toBeDefined();
      expect(app.name).toEqual('name');
      expect(app.email).toEqual('email');
      expect(app.description).toEqual('description');
      expect(app.id).toMatch(uuidRegex);
      expect(app.apiKey).toMatch(uuidRegex);
    });

    it('should retrieve an app from the Stardust database', async () => {
      const sdk = new StardustCustodialSDK(apiKey);
      const app = await sdk.getApp();
      expect(app).toBeDefined();
      expect(app.name).toEqual('name');
      expect(app.email).toEqual('email');
      expect(app.description).toEqual('description');
      expect(app.id).toMatch(uuidRegex);
      expect(app.apiKey).toMatch(uuidRegex);
    });

    it('should create a wallet in the Stardust database', async () => {
      const sdk = new StardustCustodialSDK(apiKey);
      const wallet = await sdk.createWallet();
      walletId = wallet.id;
      expect(wallet).toBeDefined();
      expect(wallet.id).toMatch(uuidRegex);
      expect(wallet.createdAt).toBeInstanceOf(Date);
    });

    it('should retrieve a wallet from the Stardust database', async () => {
      const sdk = new StardustCustodialSDK(apiKey);
      const wallet = await sdk.getWallet(walletId);
      expect(wallet).toBeDefined();
      expect(wallet.id).toMatch(walletId);
      expect(wallet.createdAt).toBeInstanceOf(Date);
    });
  });

  describe('e2e - signer flows', () => {
    let stardustWallet: StardustWallet;
    const provider = new ethers.providers.JsonRpcProvider(
      'https://api.avax-test.network/ext/bc/C/rpc'
    );
    it('should allow us to connect a wallet to a provider', async () => {
      const sdk = new StardustCustodialSDK(apiKey);
      stardustWallet = await sdk.getWallet(walletId);

      let signer = stardustWallet.signers.ethers.connect(provider);
      expect(await signer.getChainId()).not.toBeNull();
      expect(stardustWallet.signers.ethers).toBeDefined();
    });

    it('Should allow us to get our on chain address', async () => {
      const signer = stardustWallet.signers.ethers.connect(provider); // signer connected in last test
      const address = await signer.getAddress();
      expect(address).toMatch(/^0x[a-fA-F0-9]{40}$/);
    });

    it('Should return the same address if we call getAddress() twice', async () => {
      const signer = stardustWallet.signers.ethers.connect(provider); // signer connected in last test
      const address = await signer.getAddress();
      const address2 = await signer.getAddress();
      expect(address).toEqual(address2);
    });
  });
});

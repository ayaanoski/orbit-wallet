import { ethers } from 'ethers';
import { switchToSepolia } from './networks';
import { getFaucetLinks } from './faucets';

export const connectMetaMask = async () => {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('MetaMask is not installed');
  }

  // Switch to Sepolia network first
  await switchToSepolia();

  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const address = await signer.getAddress();

  return { provider, signer, address };
};

export const sendEth = async (signer: any, recipientAddress: string, amount: string) => {
  try {
    const tx = await signer.sendTransaction({
      to: recipientAddress,
      value: ethers.parseEther(amount)
    });

    await tx.wait();
    return tx;
  } catch (error: any) {
    if (error.message.includes('insufficient funds')) {
      throw new Error(`Insufficient funds. Get test ETH from these faucets:\n${getFaucetLinks()}`);
    }
    throw error;
  }
};
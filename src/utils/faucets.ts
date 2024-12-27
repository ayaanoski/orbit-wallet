interface Faucet {
    name: string;
    url: string;
    description: string;
  }
  
  export const SEPOLIA_FAUCETS: Faucet[] = [
    {
      name: 'Alchemy Sepolia Faucet',
      url: 'https://sepoliafaucet.com',
      description: 'Get 0.5 Sepolia ETH daily (requires sign-in)'
    },
    {
      name: 'Infura Sepolia Faucet',
      url: 'https://www.infura.io/faucet/sepolia',
      description: 'Get up to 0.5 Sepolia ETH (requires Infura account)'
    },
    {
      name: 'QuickNode Sepolia Faucet',
      url: 'https://faucet.quicknode.com/ethereum/sepolia',
      description: 'Get 0.1 Sepolia ETH (requires social login)'
    }
  ];
  
  export const getFaucetLinks = (): string => {
    return SEPOLIA_FAUCETS
      .map(faucet => `${faucet.name}: ${faucet.url}`)
      .join('\n');
  };
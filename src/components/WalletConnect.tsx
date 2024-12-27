import React from 'react';
import { Wallet } from 'lucide-react';

interface WalletConnectProps {
  isConnected: boolean;
  walletAddress: string;
  onConnect: () => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({
  isConnected,
  walletAddress,
  onConnect,
}) => {
  return (
    <div className="pixel-card p-6 mb-8">
      {!isConnected ? (
        <button
          onClick={onConnect}
          className="pixel-button flex items-center justify-center gap-2 w-full"
        >
          <Wallet size={20} /> Connect Wallet
        </button>
      ) : (
        <div className="text-green-400">
          <p className="text-sm mb-2">Connected Wallet:</p>
          <p className="break-all">{walletAddress}</p>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
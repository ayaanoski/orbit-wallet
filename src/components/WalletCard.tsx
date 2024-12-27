
import React from 'react';
import ethLogo from '../assets/ether.png';

interface WalletCardProps {
  nickname: string;
  walletAddress: string;
  avatar: string;
}

const WalletCard: React.FC<WalletCardProps> = ({ nickname, walletAddress, avatar }) => {
  // Construct the correct avatar path
  const avatarPath = `/src/assets/avatars/${avatar}`;

  return (
    <div className="relative bg-gray-900 text-white p-8 rounded-lg shadow-lg w-96 mx-auto mb-6">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 rounded-lg blur-lg"></div>
      <div className="relative z-10">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold glow">ORBIT WALLET</h2>
          <img src={ethLogo} alt="Ethereum Logo" className="w-14 h-14" />
        </div>
        <div className="mt-4 flex items-center">
          <img src={avatarPath} alt="Avatar" className="w-16 h-16 rounded-full border-2 border-white mr-4" />
          <div>
            <p className="text-sm font-semibold text-black">Nickname:</p>
            <p className="text-lg text-yellow-400 glow">{nickname || 'Unknown'}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm font-semibold text-black">Wallet Address:</p>
          <p className="text-xs break-all text-yellow-400 glow">{walletAddress}</p>
        </div>
      </div>
    </div>
  );
};

export default WalletCard;
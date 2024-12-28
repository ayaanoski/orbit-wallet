import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import Modal from './components/Modal';
import Header from './components/Header';
import TransactionForm from './components/TransactionForm';
import TransactionHistory from './components/TransactionHistory';
import WalletCard from './components/WalletCard';
import AvatarPicker from './components/AvatarPicker';
import { connectMetaMask, sendEth } from './utils/web3';
import { Gift, Star } from 'lucide-react';

const ACHIEVEMENTS = {
  FIRST_CONNECT: { title: 'First Steps', description: 'Connected wallet', xp: 100 },
  FIRST_TRANSACTION: { title: 'Crypto Pioneer', description: 'First transaction', xp: 200 },
  STREAK_3: { title: 'Consistent Trader', description: '3-day streak', xp: 300 },
  STREAK_7: { title: 'Weekly Warrior', description: '7-day streak', xp: 500 }
};

const RetroToast = ({ message, isVisible }: { message: string; isVisible: boolean }) => (
  <div
    className={`fixed top-4 right-4 bg-green-500 border-2 border-white p-4 transition-opacity duration-300 z-50 ${
      isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}
    style={{ fontFamily: '"Press Start 2P", cursive' }}
  >
    <div className="text-white text-sm">{message}</div>
  </div>
);

const LevelProgress = ({ xp }: { xp: number }) => {
  const level = Math.floor(xp / 1000) + 1;
  const progress = (xp % 1000) / 10;

  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-8">
      <div className="flex justify-between mb-3">
        <span className="text-white text-lg">Level {level}</span>
        <span className="text-white text-lg">{xp} XP</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-6">
        <div 
          className="bg-green-500 h-6 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [transactions, setTransactions] = useState<any[]>([]);
  const [signer, setSigner] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [nickname, setNickname] = useState(() => localStorage.getItem('nickname') || '');
  const [avatar, setAvatar] = useState(() => localStorage.getItem('avatar') || 'default_avatar.png');
  const [showCard, setShowCard] = useState(false);
  const [streak, setStreak] = useState(() => parseInt(localStorage.getItem('streak') || '0'));
  const [lastTransaction] = useState(() => localStorage.getItem('lastTransaction') || '');
  const [showConnectConfetti, setShowConnectConfetti] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [xp, setXp] = useState(() => parseInt(localStorage.getItem('xp') || '0'));
  const [achievements, setAchievements] = useState(() => JSON.parse(localStorage.getItem('achievements') || '[]'));
  const [showReward, setShowReward] = useState(false);
  const [rewardAmount, setRewardAmount] = useState(0);

  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress');
    if (savedAddress) {
      checkWalletConnection();
    }
  }, []);

  const addXp = (amount: number) => {
    setXp(prev => {
      const newXp = prev + amount;
      localStorage.setItem('xp', newXp.toString());
      return newXp;
    });
  };

  const addAchievement = (achievementKey: string) => {
    if (!achievements.includes(achievementKey)) {
      const achievement = ACHIEVEMENTS[achievementKey];
      setAchievements(prev => {
        const newAchievements = [...prev, achievementKey];
        localStorage.setItem('achievements', JSON.stringify(newAchievements));
        return newAchievements;
      });
      addXp(achievement.xp);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const checkWalletConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          const { signer, address } = await connectMetaMask();
          setSigner(signer);
          setWalletAddress(address);
          setIsConnected(true);
          setShowCard(true);

          const savedNickname = localStorage.getItem('nickname');
          const savedAvatar = localStorage.getItem('avatar');

          if (savedNickname) setNickname(savedNickname);
          if (savedAvatar) setAvatar(savedAvatar);
        }
      } catch (err) {
        console.error('Error checking wallet connection:', err);
        setError('Failed to check wallet connection.');
      }
    } else {
      setError('MetaMask is not installed.');
    }
  };

  const handleConnect = async () => {
    try {
      setError(null);

      if (!nickname || !avatar) {
        alert("Please enter your nickname and select an avatar.");
        return;
      }

      const { signer, address } = await connectMetaMask();

      setSigner(signer);
      setWalletAddress(address);
      setIsConnected(true);
      setShowCard(true);
      setShowConnectConfetti(true);
      setShowToast(true);

      if (!achievements.includes('FIRST_CONNECT')) {
        addAchievement('FIRST_CONNECT');
      }

      setTimeout(() => {
        setShowConnectConfetti(false);
      }, 3000);

      setTimeout(() => {
        setShowToast(false);
      }, 5000);

      localStorage.setItem('walletAddress', address);
      localStorage.setItem('nickname', nickname);
      localStorage.setItem('avatar', avatar);
    } catch (err: any) {
      console.error('Error connecting wallet:', err);
      setError(err.message || 'Failed to connect wallet.');
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setShowCard(false);
    setWalletAddress('');
    setSigner(null);
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('nickname');
    localStorage.removeItem('avatar');
    setNickname('');
    setAvatar('default_avatar.png');
  };

  const handleTransaction = async (recipientAddress: string, amount: string) => {
    if (!signer) {
      setError('Signer not available. Please reconnect your wallet.');
      return;
    }

    try {
      setError(null);
      const tx = await sendEth(signer, recipientAddress, amount);

      const newTransaction = {
        hash: tx.hash,
        to: recipientAddress,
        value: amount,
        timestamp: Math.floor(Date.now() / 1000),
      };

      setTransactions([newTransaction, ...transactions]);

      const today = new Date().toDateString();
      if (lastTransaction !== today) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        localStorage.setItem('streak', newStreak.toString());
        localStorage.setItem('lastTransaction', today);

        if (newStreak === 3) addAchievement('STREAK_3');
        if (newStreak === 7) addAchievement('STREAK_7');
      }

      if (!achievements.includes('FIRST_TRANSACTION')) {
        addAchievement('FIRST_TRANSACTION');
      }

      // Random reward chance
      if (Math.random() < 0.3) {
        const reward = Math.floor(Math.random() * 50) + 10;
        setRewardAmount(reward);
        setShowReward(true);
        setTimeout(() => setShowReward(false), 3000);
        addXp(reward);
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);

    } catch (err: any) {
      console.error('Error sending transaction:', err);
      setError(err.message || 'Failed to send transaction.');
    }
  };

  const handleAvatarSelect = (newAvatar: string | File) => {
    setAvatar(newAvatar);
    if (typeof newAvatar === 'string') {
      localStorage.setItem('avatar', newAvatar);
    }
  };

  return (
    <div className="min-h-screen">
      {(success || showConnectConfetti) && <Confetti />}
      <RetroToast message="WALLET SUCCESSFULLY CONNECTED!" isVisible={showToast} />
      {showReward && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-green-500 p-8 rounded-xl transform animate-bounce">
            <Gift className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-center">Lucky Reward!</h2>
            <p className="text-xl text-center">+{rewardAmount} XP</p>
          </div>
        </div>
      )}
      <div className="neon-grid"></div>
      <div className="container mx-auto px-4 py-8 relative z-10">
        <Header />
        <div className="max-w-3xl mx-auto pt-10">
          {error && (
            <Modal 
              title="Error" 
              message={error} 
              steps={[
                'Ensure your wallet is connected.',
                'Verify the recipients address.',
                'Check your wallet balance.',
                'Try again after some time.',
              ]} 
              onClose={() => setError(null)} 
            />
          )}

        {!isConnected && (
            <div className="mb-4">
              <label htmlFor="nickname" className="block text-white mb-2">
                Enter your nickname:
              </label>
              <input 
                type="text" 
                id="nickname" 
                value={nickname} 
                onChange={(e) => setNickname(e.target.value)} 
                placeholder="Your nickname" 
                className="pixel-input p-2 w-full" 
              />
              <AvatarPicker onSelect={handleAvatarSelect} />
              <button 
                onClick={handleConnect} 
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Connect Wallet
              </button>
            </div>
          )}

          {isConnected && showCard && (
            <>
              <LevelProgress xp={xp} />
              <div className="space-y-4 mt-16">
                <WalletCard 
                  nickname={nickname} 
                  avatar={avatar} 
                  walletAddress={walletAddress} 
                />

                <div className="flex justify-center mt-10">
                  <button 
                    onClick={handleDisconnect}
                    className="bg-red-400 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors"
                  >
                    Disconnect Wallet
                  </button>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-4">Achievements</h3>
                  <div className="space-y-3">
                    {Object.entries(ACHIEVEMENTS).map(([key, achievement]) => (
                      <div
                        key={key}
                        className={`p-3 rounded flex justify-between items-center ${
                          achievements.includes(key)
                            ? 'bg-green-500 bg-opacity-20'
                            : 'bg-gray-700'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-white text-lg">{achievement.title}</div>
                          <div className="text-sm text-gray-300">{achievement.description}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className={achievements.includes(key) ? 'text-yellow-400' : 'text-gray-600'} />
                          <span className="text-white text-lg">{achievement.xp} XP</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {isConnected && (
            <>
              <TransactionForm onSendTransaction={handleTransaction} />
              <TransactionHistory transactions={transactions} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

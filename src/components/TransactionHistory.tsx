import React from 'react';
import { History } from 'lucide-react';

interface Transaction {
  hash: string;
  to: string;
  value: string;
  timestamp: number;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  return (
    <div className="pixel-card p-6">
      <h2 className="text-green-400 mb-4 flex items-center gap-2">
        <History size={20} /> Transaction History
      </h2>
      <div className="space-y-4">
        {transactions.map((tx) => (
          <div key={tx.hash} className="border-b border-green-400 pb-4">
            <p className="text-xs mb-2">To: {tx.to}</p>
            <p className="text-xs mb-2">Amount: {tx.value} ETH</p>
            <p className="text-xs text-green-400">
              {new Date(tx.timestamp * 1000).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface TransactionFormProps {
  onSendTransaction: (address: string, amount: string) => Promise<void>;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onSendTransaction }) => {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSendTransaction(recipientAddress, amount);
    setRecipientAddress('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="pixel-card p-6 mb-8 mt-20">
      <h2 className="text-green-400 mb-4">Send ETH</h2>
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipientAddress}
        onChange={(e) => setRecipientAddress(e.target.value)}
        className="pixel-input"
      />
      <input
        type="text"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="pixel-input"
      />
      <button type="submit" className="pixel-button flex items-center justify-center gap-2 w-full">
        <Send size={20} /> Send Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
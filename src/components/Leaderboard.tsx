import React from 'react';

interface User {
  nickname: string;
  transactions: number;
}

interface LeaderboardProps {
  data: User[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ data }) => {
  return (
    <div className="bg-gray-800 p-4 rounded shadow-md mt-6">
      <h2 className="text-white text-center font-press-start mb-4">Leaderboard</h2>
      <table className="w-full text-white">
        <thead>
          <tr className="text-left border-b border-gray-600">
            <th className="px-2 py-1">Rank</th>
            <th className="px-2 py-1">Nickname</th>
            <th className="px-2 py-1">Transactions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={index} className="hover:bg-gray-700">
              <td className="px-2 py-1">{index + 1}</td>
              <td className="px-2 py-1">{user.nickname || "Anonymous"}</td>
              <td className="px-2 py-1">{user.transactions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;

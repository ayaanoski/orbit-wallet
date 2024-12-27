
# ORBIT Wallet

ORBIT Wallet is a retro-themed Ethereum wallet application that offers a gamified user experience. Users can connect their wallet, make transactions, track achievements, and level up based on their activity.

##  make sure you star this repo ✨  ,heheheh thanks :-P

## Features

- **Wallet Connection**: Easily connect your Ethereum wallet using MetaMask.
- **Gamified Experience**:
  - Unlock achievements (e.g., first connection, transaction streaks).
  - Gain XP and level up based on your activity.
  - Receive random XP rewards during transactions.
- **User Profile**: Customize your profile with a nickname and avatar.
- **Transaction History**: View all past transactions in a structured layout.
- **Streak Tracking**: Maintain transaction streaks to unlock bonuses.
- **Error Handling**: Friendly modal with actionable steps for troubleshooting.
- **Responsive Design**: Optimized for desktop and mobile devices.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/orbit-wallet.git
   cd orbit-wallet
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## Dependencies

The project uses the following libraries and frameworks:

- **React**: Frontend framework.
- **react-confetti**: To display confetti effects for achievements.
- **lucide-react**: Icon library for a modern look.
- **MetaMask**: Connect to Ethereum blockchain.
- **CSS Modules**: For styling the retro UI components.

## Achievements System

| Key               | Title                 | Description                 | XP  |
|-------------------|-----------------------|-----------------------------|-----|
| `FIRST_CONNECT`   | First Steps           | Connected wallet            | 100 |
| `FIRST_TRANSACTION` | Crypto Pioneer       | First transaction           | 200 |
| `STREAK_3`        | Consistent Trader     | 3-day streak                | 300 |
| `STREAK_7`        | Weekly Warrior        | 7-day streak                | 500 |

## Development Notes

- **Local Storage**: The app uses local storage to persist user data (nickname, avatar, XP, achievements).
- **Error Handling**: Provides user-friendly error messages for common issues like connection failure or insufficient balance.
- **Customization**: You can easily expand the achievements system or update the retro UI styles.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Enjoy the retro vibes with ORBIT Wallet! 🚀

---

## 🚀 Getting Started with Daytona

### 1. Install Daytona
Follow the Daytona installation guide to get Daytona installed on your machine. You can find the guide [here](https://daytona.com/docs/installation).

### 2. Create the Workspace
To create your workspace, run the following command:
```bash
daytona create <SAMPLE_REPO_URL>
```
Replace `<SAMPLE_REPO_URL>` with the URL of your repository. This will set up your workspace and initialize the necessary files.

### 3. More Steps (if needed)
If there are additional steps, follow the prompts or instructions in the Daytona documentation to configure the workspace further.

### 4. Start the Application
Once the workspace is ready, start the application by running:
```bash
daytona start
```
This will initiate the application and allow you to begin development.

---

Ensure that you’ve followed all steps and are in the correct directory to run the commands successfully.

# Setup

## Getting Started
- Clone the repo: git clone https://github.com/sushant-rumsan/msig-xlm.git
- Install dependencies: npm i
- Configuring Accounts: Go to accounts.ts and replace with your addresses in master and signer keys. (You can replace all 4 accounts or only the master)

### Creating a stellar account
- Go to: https://demo-wallet.stellar.org/
- Generate KeyPair for new account
- Create account (Important)
- Copy Secret and Public Key

***You need to create 4 accounts in total and replace if you prefer to replace all accounts and only 1 if you prefer to replace only the master.***

## Create a MultiSig Account
- Run: npm run setup

## Listen to transaction
- Run: npm run listen
(This process starts a server to listen for trigger)

## Create Trigger
- Run: npm run trigger
(This will create a multisig transaction, which is being listened by the listener)

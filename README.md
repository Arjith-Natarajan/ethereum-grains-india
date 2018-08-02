# ethereum-grains-india

## Pre-Requisites
Node and NPM are pre-requisites. *Make sure they are installed on your system*

### Test Network
This project recommends using `ganache-cli` as a test block chain network to build and develop
```
npm i -g ganache-cli
```
and run `ganache-cli` cmd from terminal to start the test network with fake accounts

## Installation 
```
git clone https://github.com/Arjith-Natarajan/ethereum-grains-india.git
cd ethereum-grains-india
npm i
```

## Deployment
Once you have done your changes to smart contracts, the following is the sequence of cmds to deploy them onto the network
```
truffle compile
truffle migrate 
```

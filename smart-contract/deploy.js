const HDWalletProvider = require('truffle-hdwallet-provider');

const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

require('dotenv').config();


const provider = new HDWalletProvider(
    'before twenty close crucial minor shy wild quick angry casino marble immune', 
    'https://goerli.infura.io/v3/9b3837b86e0e450f99268d4b628350d6'

);

const web3 = new Web3(provider);
const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attemping to deploy to accounts ', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ gas: '5000000', from:accounts[0] });

    console.log('Contract deploy to ', result.options.address);
};

deploy();
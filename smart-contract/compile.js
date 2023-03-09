const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

function compileContract() {
  let CampaignsSOL = fs.readFileSync(path.join(__dirname, "./contracts/Campaigns.sol"), "utf8");
  let complierInput = {
    language: "Solidity",
    sources: {
      "Campaigns.sol": {
        content: CampaignsSOL,
      },
    },
    settings: {
      optimizer: {
        enabled: true,
      },
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  };
  console.log("compiling contract");
  let compiledContract = JSON.parse(
    solc.compile(JSON.stringify(complierInput))
  );
  console.log("Contract Compiled");
  for (let contractName in compiledContract.contracts["Campaigns.sol"]) {
    console.log(
      contractName,
      compiledContract.contracts["Campaigns.sol"][contractName].abi
    );
    let abi = compiledContract.contracts["Campaigns.sol"][contractName].abi;
    fs.writeFileSync(
      path.join(__dirname, `./contracts/bin/${contractName}_abi.json`),
      JSON.stringify(abi)
    );
    return compiledContract.contracts["Campaigns.sol"][contractName];
  }
}

compileContract();

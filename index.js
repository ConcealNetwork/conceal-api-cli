const { Command } = require("commander");
const prompt = require('prompt-sync')();
const ccx = require("conceal-api");
// creating a command instance
const program = new Command();

const ccxApi = new ccx({
  daemonHost: 'http://127.0.0.1', 
  walletHost: 'http://127.0.0.1', 
  daemonRpcPort: 16000,
  walletRpcPort: 6061,
  timeout: 5000
})

// creating tool
program
  .name("conceal-api-demo")
  .description("A CLI demo for conceal api")
  .version("1.0.0");

// ****************************************************
// adding deposit related commands
// *****************************************************

let deposits = program.command("deposit");
deposits.description("Deposit related commands....");
deposits
  .command('createDeposit')
  .description('The createDeposit method creates a new deposit with a source address and a term. The output will return the transactionHash of the creating transaction. The deposit will only reflect in the count and deposit index when the tx is confirmed. This method is available from version 6.3.0 and newer versions only.')
  .argument('address <string>', 'Wallet address')
  .argument('amount <integer>', 'The amount to deposit')
  .argument('term <integer>', 'The length of the deposit (Minimum 21,900)')
  .action(() => {
    let address = prompt('Enter source address: ');
    let amount = parseFloat(prompt('Enter ammount: '));
    let term = parseInt(prompt('Enter term: '));
    
    ccxApi.createDeposit({
      sourceAddress: address,
      amount: amount,
      term: term
    }).then(result => {
      console.log(result);
    }).catch(err => {
      console.error(err);
    });
  });
deposits
  .command('getDeposit')
  .description('The getDeposit method returns the details of a deposit given the depositId.')
  .argument('depositId <integer>', 'The depositId')
  .action(() => {
    let id = parseInt(prompt('Enter deposit id: '));
    
    ccxApi.getDeposit(id).then(result => {
      console.log(result);
    }).catch(err => {
      console.error(err);
    });
  });

// ****************************************************
// adding wallet related commands
// *****************************************************

let wallet = program.command("wallet");
wallet.description("Wallet related commands....");
wallet
  .command('getStatus')
  .description('The getStatus method returns information about the current RPC Wallet state including the number of addresses, transactions, peers, and block information.')
  .action(() => {
    ccxApi.status().then(result => {
      console.log(result);
    }).catch(err => {
      console.error(err);
    });
  });
wallet
  .command('reset')
  .description(`The reset method allows you to re-sync (rescan) your wallet container including all the containers addresses. Please note that on containers with a lot of wallets and transactions, the process can take some time.`)
  .argument('privateViewKey <string>', 'A privateViewKey to substitute the existing wallet with')
  .action(() => {
    let key = prompt('Enter private view Key (optional): ');

    ccxApi.resetOrReplace(key).then(result => {
      console.log(result);
    }).catch(err => {
      console.error(err);
    });
  });
wallet
  .command('save')
  .description('The save method allows you to save your wallet.')
  .action(() => {
    ccxApi.save().then(result => {
      console.log(result);
    }).catch(err => {
      console.error(err);
    });
  });
wallet
  .command('getBalance')
  .description('The getBalance method returns a balance for a specified address. If address is not specified, returns the balance of the first address in the wallet.')
  .argument('address <string>', 'Wallet address')
  .action(() => {
    let address = prompt('Enter address: ');
    
    ccxApi.getBalance(address).then(result => {
      console.log(result);
    }).catch(err => {
      console.error(err);
    });
  });
  
// ****************************************************
// adding daemon related commands
// *****************************************************

let daemon = program.command("daemon");
daemon.description("Daemon related commands....");
daemon
  .command('getInfo')
  .action(() => {
    ccxApi.info().then(result => {
      console.log(result);
    }).catch(err => {
      console.error(err);
    });
  });
daemon
  .command('getHeight')
  .action(() => {
    ccxApi.index().then(result => {
      console.log(result);
    }).catch(err => {
      console.error(err);
    });
  });
daemon
  .command('getBlockCount')
  .action(() => {
    ccxApi.count().then(result => {
      console.log(result);
    }).catch(err => {
      console.error(err);
    });
  });
daemon
  .command('getCurrencyId')
  .action(() => {
    ccxApi.currencyId().then(result => {
      console.log(result);
    }).catch(err => {
      console.error(err);
    });
  });
daemon
  .command('getBlockHeaderByHeight')
  .action(() => {
    let block = parseInt(prompt('Enter block number: '));

    ccxApi.blockHeaderByHeight(block).then(result => {
      console.log(result);
    }).catch(err => {
      console.error(err);
    });
  });
daemon
  .command('getBlockHeaderByHash')
  .action(() => {
    let hash = prompt('Enter block hash: ');

    ccxApi.blockHeaderByHash(hash).then(result => {
      console.log(result);
    }).catch(err => {
      console.error(err);
    });
  });
daemon
  .command('getBlockHashByHeight')
  .action(() => {
    let block = parseInt(prompt('Enter block number: '));

    ccxApi.blockHashByHeight(block).then(result => {
      console.log(result);
    }).catch(err => {
      console.error(err);
    });
  });
daemon
  .command('getLastBlockHeader')
  .action(() => {
    ccxApi.lastBlockHeader().then(result => {
      console.log(result);
    }).catch(err => {
      console.error(err);
    });
  });
daemon
  .command('getBlock')
  .action(() => {
    let hash = prompt('Enter block hash: ');

    ccxApi.block(hash).then(result => {
      console.log(result);
    }).catch(err => {
      console.error(err);
    });
  });
daemon
  .command('getBlocks')
  .action(() => {
    let height = parseInt(prompt('Enter height: '));

    ccxApi.blocks(height).then(result => {
      console.log(result);
    }).catch(err => {
      console.error(err);
    });
  });
daemon
  .command('getTransaction')
  .action(() => {
    let hash = prompt('Enter tx hash: ');

    ccxApi.transaction(hash).then(result => {
      console.log(result);
    }).catch(err => {
      console.error(err);
    });
  });
daemon
  .command('getTransactionPool')
  .action(() => {
    ccxApi.transactionPool().then(result => {
      console.log(result);
    }).catch(err => {
      console.error(err);
    });
  });


program.parse();
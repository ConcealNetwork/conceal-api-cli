import { Command } from 'commander';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';
import ccx from 'conceal-api';
import path from 'path';
import fs from  'fs';
// creating a command instance
const program = new Command();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let config = {
  daemonHost: 'http://127.0.0.1', 
  walletHost: 'http://127.0.0.1', 
  daemonRpcPort: 16000,
  walletRpcPort: 6061,
  timeout: 5000
}

// check if we have config.json present in same dir
if (fs.existsSync(path.join(__dirname, 'config.json'))) {
  config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'));
} 

// create the api with the config
const ccxApi = new ccx(config);

// creating tool
program
  .name("conceal-api-demo")
  .description("A CLI demo for conceal api")
  .version("1.0.0");

// ****************************************************
// adding deposit related commands
// *****************************************************

let deposit = program.command("deposit");
deposit.description("Deposit related commands....");
deposit
  .command('createDeposit')
  .description('The createDeposit method creates a new deposit with a source address and a term.')
  .action(() => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'address',
        message: 'Enter source address:'
      },{
        type: 'number',
        name: 'amount',
        message: 'Enter ammount:'
      },{
        type: 'number',
        name: 'term',
        message: 'Enter term:'
      }
    ]).then((answers) => {    
      ccxApi.createDeposit({
        sourceAddress: answers.address,
        amount: answers.amount,
        term: answers.term
      }).then(result => {
        console.log(result);
      }).catch(err => {
        console.error(err);
      });
    });    
  });
deposit
  .command('sendDeposit')
  .description('The sendDeposit method creates a new deposit with a source address and a term and sends it to another wallet.')
  .action(() => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'srcAddress',
        message: 'Enter source address:'
      },{
        type: 'input',
        name: 'destAddress',
        message: 'Enter destionation address:'
      },{
        type: 'number',
        name: 'amount',
        message: 'Enter ammount:'
      },{
        type: 'number',
        name: 'term',
        message: 'Enter term:'
      }
    ]).then((answers) => {    
      ccxApi.createDeposit({
        sourceAddress: answers.srcAddress,
        amount: answers.amount,
        term: answers.term,
        destinationAddress: answers.destAddress
      }).then(result => {
        console.log(result);
      }).catch(err => {
        console.error(err);
      });
    });        
  });
deposit
  .command('getDeposit')
  .description('The getDeposit method returns the details of a deposit given the depositId.')
  .action(() => {
    inquirer.prompt([
      {
        type: 'number',
        name: 'id',
        message: 'Enter deposit id:'
      }
    ]).then((answers) => {    
      ccxApi.getDeposit(answers.id).then(result => {
        console.log(result);
      }).catch(err => {
        console.error(err);
      });
    });        
  });
deposit
  .command('withdrawDeposit ')
  .description('The getDeposit method returns the details of a deposit given the depositId.')
  .action(() => {
    inquirer.prompt([
      {
        type: 'number',
        name: 'id',
        message: 'Enter deposit id:'
      }
    ]).then((answers) => {    
      ccxApi.withdrawDeposit(answers.id).then(result => {
        console.log(result);
      }).catch(err => {
        console.error(err);
      });
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
  .description('The reset method allows you to re-sync (rescan) your wallet container including all the containers addresses.')
  .action(() => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'key',
        message: 'Enter private view Key (optional):'
      }
    ]).then((answers) => {    
      ccxApi.resetOrReplace(answers.key).then(result => {
        console.log(result);
      }).catch(err => {
        console.error(err);
      });
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
  .action(() => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'address',
        message: 'Enter address:'
      }
    ]).then((answers) => {    
      ccxApi.getBalance(answers.address).then(result => {
        console.log(result);
      }).catch(err => {
        console.error(err);
      });
    });
  });
wallet
  .command('exportWallet')
  .description('The exportWallet method exports the wallet into a new file. The exported wallet is stored in the same folder as the running wallet.')
  .action(() => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'filename',
        message: 'Enter filename:'
      }
    ]).then((answers) => {    
      ccxApi.exportWallet({
        exportFilename: filename
      }).then(result => {
        console.log(result);
      }).catch(err => {
        console.error(err);
      });
    });
  });
wallet
  .command('exportWalletKeys')
  .description('The exportWalletKeys method exports the keys of the wallet into a new file. The exported wallet is stored in the same folder as the running wallet.')
  .action(() => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'filename',
        message: 'Enter filename:'
      }
    ]).then((answers) => {    
      ccxApi.exportWallet({
        exportFilename: filename
      }).then(result => {
        console.log(result);
      }).catch(err => {
        console.error(err);
      });
    });
  });
  
// ****************************************************
// adding address related commands
// *****************************************************

let address = program.command("address");
address.description("Address related commands....");
address
  .command('getAddresses')
  .description('The getAddresses method returns the array of addresses from the current container.')
  .action(() => {    
    ccxApi.getAddresses().then(result => {
      console.log(result);
    }).catch(err => {
      console.error(err);
    });
  });
address
  .command('createAddress')
  .description('The createAddress method creates an additional address in your wallet.')
  .action(() => {   
    inquirer.prompt([
      {
        type: 'confirm',
        name: 'import',
        default: false,
        message: 'Do you want to import your address?'
      },{
        type: 'input',
        name: 'privateSpendKey',
        message: 'Private spend key:',
        when(answers) {
          return answers.import;
        }
      },{
        type: 'input',
        name: 'publicSpendKey',
        message: 'Public spend key:',
        when(answers) {
          return answers.import;
        }
      },
    ]).then((answers) => {    
      let opts = {};

      if (answers.import) {
        opts = {
          privateSpendKey: answers.privateSpendKey,
          publicSpendKey: answers.publicSpendKey
        }
      }

      ccxApi.createAddress(opts).then(result => {
        console.log(result);
      }).catch(err => {
        console.error(err);
      });
    });
  });
address
  .command('createAddressList')
  .description('The createAddressList method creates additional address in your wallet from the provided list of private keys.')
  .action(() => {   
    inquirer.prompt([
      {
        type: 'input',
        name: 'keyList',
        message: 'Enter array of private spend keys (delimited by comma):'
      },{
        type: 'confirm',
        name: 'reset',
        default: false,
        message: 'Reset the wallet?'
      },
    ]).then((answers) => {    
      ccxApi.createAddressList({
        privateSpendKeys: Array.from(answers.keyList),
        reset: answers.reset
      }).then(result => {
        console.log(result);
      }).catch(err => {
        console.error(err);
      });
    });
  });
address
  .command('deleteAddress')
  .description('The deleteAddress method deletes a specified wallet address from the container.')
  .argument('address <string>', 'Wallet address')
  .action(() => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'address',
        message: 'Enter address:'
      }
    ]).then((answers) => {    
      ccxApi.deleteAddress(answers.address).then(result => {
        console.log(result);
      }).catch(err => {
        console.error(err);
      });
    });
  });
address
  .command('createIntegrated')
  .description('The deleteAddress method deletes a specified wallet address from the container.')
  .action(() => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'address',
        message: 'Enter address:'
      },
      {
        type: 'input',
        name: 'paymentId',
        message: 'Enter paymentId:'
      }
    ]).then((answers) => {    
      ccxApi.createIntegrated(answers.address, answers.paymentId).then(result => {
        console.log(result);
      }).catch(err => {
        console.error(err);
      });
    });
  });  
address
  .command('splitIntegrated')
  .description('The splitIntegrated method takes an integrated address and returns its address and its payment ID.')
  .action(() => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'address',
        message: 'Enter address:'
      }
    ]).then((answers) => {    
      ccxApi.splitIntegrated(answers.address).then(result => {
        console.log(result);
      }).catch(err => {
        console.error(err);
      });
    });
  }); 

// ****************************************************
// adding transaction related commands
// *****************************************************

let transaction = program.command("transaction");
transaction.description("Transaction related commands....");
transaction
  .command('getTransaction')
  .description('The getTransaction method returns information about a particular transaction.')
  .action(() => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'hash',
        message: 'Enter tx hash:'
      }
    ]).then((answers) => {    
      ccxApi.getTransaction(answers.hash).then(result => {
        console.log(result);
      }).catch(err => {
        console.error(err);
      });
    });
  });
transaction
  .command('getTransactions')
  .description('The getTransactions method returns an array of block and transaction hashes.')
  .action(() => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'addressList',
        message: 'Enter array of addressed to include (delimited by comma):'
      },
      {
        type: 'number',
        name: 'blockCount',
        message: 'The number of blocks to return:'
      },
      {
        type: 'input',
        name: 'blockHash',
        message: 'The hash of the first block to include: '
      },
      {
        type: 'number',
        name: 'firstBlockIndex',
        message: 'The height of the first block to include:'
      },
      {
        type: 'input',
        name: 'paymentId',
        message: 'A paymentId that must be used in the returned transaction hashes:'
      }
    ]).then((answers) => {
      ccxApi.getTransactions({
        addresses: Array.from(answers.addressList),
        blockCount: answers.blockCount,
        blockHash: answers.blockHash,
        firstBlockIndex: answers.firstBlockIndex,
        paymentId: answers.paymentId
      }).then(result => {
        console.log(result);
      }).catch(err => {
        console.error(err);
      });  
    });
  });
transaction
  .command('getTransactionHashes')
  .description('The getTransactionHashes method returns an array of block and transaction hashes.')
  .action(() => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'addressList',
        message: 'Enter array of addressed to include (delimited by comma):'
      },
      {
        type: 'number',
        name: 'blockCount',
        message: 'The number of blocks to return:'
      },
      {
        type: 'input',
        name: 'blockHash',
        message: 'The hash of the first block to include: '
      },
      {
        type: 'number',
        name: 'firstBlockIndex',
        message: 'The height of the first block to include:'
      },
      {
        type: 'input',
        name: 'paymentId',
        message: 'A paymentId that must be used in the returned transaction hashes:'
      }
    ]).then((answers) => {
      ccxApi.getTransactionHashes({
        addresses: Array.from(answers.addressList),
        blockCount: answers.blockCount,
        blockHash: answers.blockHash,
        firstBlockIndex: answers.firstBlockIndex,
        paymentId: answers.paymentId
      }).then(result => {
        console.log(result);
      }).catch(err => {
        console.error(err);
      });  
    });
  });
transaction
  .command('getUnconfirmedTransactionHashes')
  .description('The getUnconfirmedTransactionHashes method returns an array of block and transaction hashes.')
  .action(() => {
    inquirer.prompt([
      {
        type: 'number',
        name: 'addressList',
        message: 'Addresses to check for unconfirmed transactions (delimited by comma). If addresses is empty, all addresses of the container will be checked:'
      }
    ]).then((answers) => {    
      ccxApi.getUnconfirmedTransactionHashes(Array.from(answers.addressList)).then(result => {
        console.log(result);
      }).catch(err => {
        console.error(err);
      });
    });
  });
transaction
  .command('sendTransaction')
  .description('The sendTransaction method allows you to send transaction to an address.')
  .action(() => {
    inquirer.prompt([
      {
        type: 'confirm',
        name: 'simple',
        message: 'Do you want simple version?',
      },
      {
        type: 'input',
        name: 'addressList',
        message: 'Enter array of addressed to include (delimited by comma):',
        when(answers) {
          return !answers.simple;
        }
      },
      {
        type: 'input',
        name: 'address',
        message: 'Destination address:'
      },
      {
        type: 'number',
        name: 'amount',
        message: 'Amount to transfer:'
      },
      {
        type: 'input',
        name: 'message',
        message: 'Additional message (optional):'
      },
      {
        type: 'input',
        name: 'paymentId',
        message: 'PaymentId:'
      },
      {
        type: 'number',
        name: 'unlockTime',
        message: 'Height of the block until which transaction is going to be locked for spending:',
        when(answers) {
          return !answers.simple;
        }
      },
      {
        type: 'input',
        name: 'changeAddress',
        message: 'Valid and existing in this container, it will receive the change of the transaction (optional):',
        when(answers) {
          return !answers.simple;
        }
      }
    ]).then((answers) => {
      let opts = {
        anonymity: 5,
        fee: 1000,        
        transfers: [
          {
            amount: answers.amount * 1000000,
            address: answers.address
          }
        ]
      };    
  
      if (answers.changeAddress) { opts["changeAddress"] = answers.changeAddress; }    
      if (answers.addressList) { opts["addresses"] = Array.from(answers.addressList); }
      if (answers.unlockTime) { opts["changeAddress"] = answers.unlockTime; }    
      if (answers.paymentId) { opts["paymentId"] = answers.paymentId; }
    
      ccxApi.sendTransaction(opts).then(result => {
        console.log(result);
      }).catch(err => {
        console.error(err);
      });  
    });
  });
transaction
  .command('createDelayedTransaction')
  .description('The createDelayedTransaction method creates a delayed transaction.')
  .action(() => {
    inquirer.prompt([
      {
        type: 'confirm',
        name: 'simple',
        message: 'Do you want simple version?',
      },
      {
        type: 'input',
        name: 'addressList',
        message: 'Enter array of addressed to include (delimited by comma):',
        when(answers) {
          return !answers.simple;
        }
      },
      {
        type: 'input',
        name: 'address',
        message: 'Destination address:'
      },
      {
        type: 'number',
        name: 'amount',
        message: 'Amount to transfer:'
      },
      {
        type: 'input',
        name: 'message',
        message: 'Additional message (optional):'
      },
      {
        type: 'input',
        name: 'paymentId',
        message: 'PaymentId:'
      },
      {
        type: 'number',
        name: 'unlockTime',
        message: 'Height of the block until which transaction is going to be locked for spending:',
        when(answers) {
          return !answers.simple;
        }
      },
      {
        type: 'input',
        name: 'changeAddress',
        message: 'Valid and existing in this container, it will receive the change of the transaction (optional):',
        when(answers) {
          return !answers.simple;
        }
      }
    ]).then((answers) => {
      let opts = {
        anonymity: 5,
        fee: 1000,        
        transfers: [
          {
            amount: answers.amount * 1000000,
            address: answers.address
          }
        ]
      };    
  
      if (answers.changeAddress) { opts["changeAddress"] = answers.changeAddress; }    
      if (answers.addressList) { opts["addresses"] = Array.from(answers.addressList); }
      if (answers.unlockTime) { opts["changeAddress"] = answers.unlockTime; }    
      if (answers.paymentId) { opts["paymentId"] = answers.paymentId; }
    
      ccxApi.sendTransaction(opts).then(result => {
        console.log(result);
      }).catch(err => {
        console.error(err);
      });  
    });    
  });
transaction
  .command('sendDelayedTransaction')
  .description('The sendDelayedTransaction method sends a specified delayed transaction.')
  .action(() => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'hash',
        message: 'Delayed transaction to send:'
      }
    ]).then((answers) => {    
      ccxApi.sendDelayedTransaction (answers.hash).then(result => {
        console.log(result);
      }).catch(err => {
        console.error(err);
      });
    });
  });
  transaction
  .command('deleteDelayedTransaction')
  .description('The deleteDelayedTransaction method deletes a specified delayed transaction.')
  .action(() => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'hash',
        message: 'Delayed transaction to delete:'
      }
    ]).then((answers) => {    
      ccxApi.deleteDelayedTransaction (answers.hash).then(result => {
        console.log(result);
      }).catch(err => {
        console.error(err);
      });  
    });    
  });
transaction
  .command('getDelayedTransactionHashes')
  .description('The getDelayedTransactionHashes method returns hashes of delayed transactions.')
  .action(() => {
    ccxApi.getDelayedTransactionHashes().then(result => {
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
  .description('Get the current chain info.')
  .action(() => {
    ccxApi.info().then(result => {
      console.log(result);
    }).catch(err => {
      console.error(err);
    });
  });
daemon
  .command('getHeight')
  .description('Get the current height.')
  .action(() => {
    ccxApi.index().then(result => {
      console.log(result);
    }).catch(err => {
      console.error(err);
    });
  });
daemon
  .command('getBlockCount')
  .description('Get the block count.')
  .action(() => {
    ccxApi.count().then(result => {
      console.log(result);
    }).catch(err => {
      console.error(err);
    });
  });
daemon
  .command('getCurrencyId')
  .description('Get the id of the CCX currency.')
  .action(() => {
    ccxApi.currencyId().then(result => {
      console.log(result);
    }).catch(err => {
      console.error(err);
    });
  });
daemon
  .command('getBlockHeaderByHeight')
  .description('Get the block header at the given height.')
  .action(() => {
    inquirer.prompt([
      {
        type: 'number',
        name: 'block',
        message: 'Enter block number:'
      }
    ]).then((answers) => {    
      ccxApi.blockHeaderByHeight(answers.block).then(result => {
        console.log(result);
      }).catch(err => {
        console.error(err);
      });
    });
  });
daemon
  .command('getBlockHeaderByHash')
  .description('Get the block header for the given hash.')
  .action(() => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'hash',
        message: 'Enter block hash:'
      }
    ]).then((answers) => {    
      ccxApi.blockHeaderByHash(answers.hash).then(result => {
        console.log(result);
      }).catch(err => {
        console.error(err);
      });
    });
  });
daemon
  .command('getBlockHashByHeight')
  .description('Get the block hash at the given height.')
  .action(() => {
    inquirer.prompt([
      {
        type: 'number',
        name: 'block',
        message: 'Enter block number:'
      }
    ]).then((answers) => {    
      ccxApi.blockHashByHeight(answers.block).then(result => {
        console.log(result);
      }).catch(err => {
        console.error(err);
      });
    });
  });
daemon
  .command('getLastBlockHeader')
  .description('Get the block header for the last block on the chain.')
  .action(() => {
    ccxApi.lastBlockHeader().then(result => {
      console.log(result);
    }).catch(err => {
      console.error(err);
    });
  });
daemon
  .command('getBlock')
  .description('Get the block for the given hash.')
  .action(() => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'hash',
        message: 'Enter block hash:'
      }
    ]).then((answers) => {    
      ccxApi.block(answers.hash).then(result => {
        console.log(result);
      }).catch(err => {
        console.error(err);
      });
    });
  });
daemon
  .command('getBlocks')
  .description('Get the blocks for the given height.')
  .action(() => {
    inquirer.prompt([
      {
        type: 'number',
        name: 'height',
        message: 'Enter tx hash:'
      }
    ]).then((answers) => {    
      ccxApi.blocks(answers.height).then(result => {
        console.log(result);
      }).catch(err => {
        console.error(err);
      });
    });

  });
daemon
  .command('getTransaction')
  .description('Get the transaction for the given hash.')
  .action(() => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'hash',
        message: 'Enter tx hash:'
      }
    ]).then((answers) => {    
      ccxApi.transaction(answers.hash).then(result => {
        console.log(result);
      }).catch(err => {
        console.error(err);
      });
    });
  });
daemon
  .command('getTransactionPool')
  .description('Get the transactio pool status.')
  .action(() => {
    ccxApi.transactionPool().then(result => {
      console.log(result);
    }).catch(err => {
      console.error(err);
    });
  });


program.parse();
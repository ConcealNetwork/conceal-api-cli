# Conceal API CLI
CLI for Conceal JS API allows you to easily communicate with the conceal daemon or the walletd through command line interface.
# How to use
The project is using node.js as main language. Simply clone or download the repository then do the following

```
npm install
node index.js
```

You will get a list of available modules. Each modules has a list of commands you can call. 

```
node index.js address
```

For instance will give you list of all address related commands

```
node index.js address getAddresses
```

This example calls the getAddreses command that returns all the addresses present in the container. Result would be:

```
{
  addresses: [
    'ccx7HoRxHKxBgUMXjjpr4DKhy8B68SvAvFzx1VapxzeT5Hy81CM8rhW6ihmry9adA26SARBufBXDWVV2EzHeJgTb5aHKY9u72S',
    'ccx7DLbgW9dEPRanscJ5rwAKUtdB6DD6VXF85CsWDaAwQxh3KfZWQyN6ihmry9adA26SARBufBXDWVV2EzHeJgTb5aHKbAoPH6',
    'ccx7UMVEdPve768aRoPQKyB6VLY8CrbQogbBYCALoWYverWY3mHA5Fe6ihmry9adA26SARBufBXDWVV2EzHeJgTb5aHKZ5nqxy',
    'ccx7CAoviZCSnw3fbU52584A88YizJosnN9vKuKtL5VCcLnfd8cW7uJ6ihmry9adA26SARBufBXDWVV2EzHeJgTb5aHKc4nJHV'
  ]
}
```
# How to build
You can also build the Windows executable. Later other OS executables will be also added.

```
npm install
node build.js
```
This will make a "conceal-cli.exe" ready to use executable. No need for node.js from then on.

# How to set daemon and walletd connection info
If you are using it with node, you can just edit the config.json with the correct info. If you are using the precompiled exectuable you can simply use it from command line.

For the daemon
```
conceal-cli --dh=http://127.0.0.1 --dp=16000 daemon getInfo
```
or
```
conceal-cli --daemon-host=http://127.0.0.1 --daemon-port=16000 daemon getInfo
```
And for the walletd
```
conceal-cli --wh=http://127.0.0.1 --wp=3333 address getAddresses
```
or
```
conceal-cli --walletd-host=http://127.0.0.1 --walletd-port=3333 address getAddresses
```

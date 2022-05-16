'use strict';

var express = require('express');
var bodyParser = require('body-parser'); 

var app = express();
app.use(bodyParser.json());

const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const fs = require('fs'); 

app.post('/api/v1.0/minter', async function (req, res) {

    try {
        const username = req.body.id

        const ccpPath = path.resolve(__dirname, '..', '..', 'network', 'organizations', 'ccp', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
            
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
            
        const identity = await wallet.get(username);
        if (!identity) {
            console.log(`An identity for the user ${username} does not exist in the wallet`);
            console.log('Run the registerUser.js application before retrying');
            return;
        }
        
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: username , discovery: { enabled: true, asLocalhost: true } });
        
        const network = await gateway.getNetwork('mychannel');
        const contract = network.getContract('erc20');

        const result = await contract.submitTransaction('Mint', req.body.totalsupply);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.status(200).json({response: "ok"});

        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(404).json({"response":"잘못된 값 또는 서버에서 값이 제대로 처리되지 않았습니다."});
    }
});


app.post('/api/v1.0/Burn', async function (req, res) {
    try {
        const username = req.body.id
        const ccpPath = path.resolve(__dirname, '..', '..', 'network', 'organizations', 'ccp', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        const identity = await wallet.get(username);
        if (!identity) {
            console.log(`An identity for the user ${username} does not exist in the wallet`);
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: username, discovery: { enabled: true, asLocalhost: true } });

        const network = await gateway.getNetwork('mychannel');
        const contract = network.getContract('erc20');

        const result = await contract.submitTransaction('Burn', req.body.totalsupply);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.status(200).json({response: result.toString("ok")});

        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`); 
        
        res.status(404).json({"response":"잘못된 값 또는 서버에서 값이 제대로 처리되지 않았습니다."});
    }
});

app.post('/api/v1.0/Transfer', async function (req, res) {
    try {
        const username = req.body.id

        const ccpPath = path.resolve(__dirname, '..', '..', 'network', 'organizations', 'ccp', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
            
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
            
        const identity = await wallet.get(username);
        if (!identity) {
            console.log(`An identity for the user ${username} does not exist in the wallet`);
            return;
        }
        
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: username, discovery: { enabled: true, asLocalhost: true } });
        
        const network = await gateway.getNetwork('mychannel');
        const contract = network.getContract('erc20');

        const result = await contract.submitTransaction('Transfer', req.body.to, req.body._value);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.status(200).json({response: result.toString("ok")});

        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(404).json({"response":"잘못된 값 또는 서버에서 값이 제대로 처리되지 않았습니다."});
    }
});

app.post('/api/v1.0/BalanceOf', async function (req, res) {

    try {
        const username = req.body.id
        const ccpPath = path.resolve(__dirname, '..', '..', 'network', 'organizations', 'ccp', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
            
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
            
        const identity = await wallet.get(username);
        if (!identity) {
            console.log(`An identity for the user ${username} does not exist in the wallet`);
            console.log('Run the registerUser.js application before retrying');
            return;
        }
        
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: username, discovery: { enabled: true, asLocalhost: true } });
        
        const network = await gateway.getNetwork('mychannel');
        const contract = network.getContract('erc20');

        const result = await contract.submitTransaction('BalanceOf', req.body.minter);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.status(200).json({response: result.toString()});

        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`); 
        res.status(404).json({"response":"잘못된 값 또는 서버에서 값이 제대로 처리되지 않았습니다."});
    }
});

app.post('/api/v1.0/ClientAccountBalance', async function (req, res) {

    try {
        const username = req.body.id
        const ccpPath = path.resolve(__dirname, '..', '..', 'network', 'organizations', 'ccp', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
            
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
            
        const identity = await wallet.get(username);
        if (!identity) {
            console.log(`An identity for the user ${username} does not exist in the wallet`);
            return;
        }
        
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: username, discovery: { enabled: true, asLocalhost: true } });
        
        const network = await gateway.getNetwork('mychannel');
        const contract = network.getContract('erc20');

        const result = await contract.evaluateTransaction('ClientAccountBalance'); //
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.status(200).json({response: result.toString()});

        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(404).json({"response":"잘못된 값 또는 서버에서 값이 제대로 처리되지 않았습니다."});
    }
});

app.post('/api/v1.0/ClientAccountID', async function (req, res) {
    try {
        const username = req.body.id

        const ccpPath = path.resolve(__dirname, '..', '..', 'network', 'organizations', 'ccp', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
            
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
            
        const identity = await wallet.get(username);
        if (!identity) {
            console.log(`An identity for the user ${username} does not exist in the wallet`);
            return;
        }
        
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: username, discovery: { enabled: true, asLocalhost: true } });
        
        const network = await gateway.getNetwork('mychannel');
        const contract = network.getContract('erc20');

        const result = await contract.evaluateTransaction('ClientAccountID');
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.status(200).json({response: result.toString()});

        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(404).json({"response":"잘못된 값 또는 서버에서 값이 제대로 처리되지 않았습니다."});
    }
});

app.post('/api/v1.0/TotalSupply', async function (req, res) {
    try {
        const username = req.body.id

        const ccpPath = path.resolve(__dirname, '..', '..', 'network', 'organizations', 'ccp', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
            
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
            
        const identity = await wallet.get(username);
        if (!identity) {
            console.log(`An identity for the user ${username} does not exist in the wallet`);
            console.log('Run the registerUser.js application before retrying');
            return;
        }
        
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: username, discovery: { enabled: true, asLocalhost: true } });
        
        const network = await gateway.getNetwork('mychannel');
        const contract = network.getContract('erc20');

        const result = await contract.evaluateTransaction('TotalSupply');
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.status(200).json({response: result.toString()});

        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(404).json({"response":"잘못된 값 또는 서버에서 값이 제대로 처리되지 않았습니다."});
    }
});

app.post('/api/v1.0/Approve', async function (req, res) {

    try {

        const username = req.body.id
        const ccpPath = path.resolve(__dirname, '..', '..', 'network', 'organizations', 'ccp', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
            
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
            
        const identity = await wallet.get(username);
        if (!identity) {
            console.log(`An identity for the user ${username} does not exist in the wallet`);
            console.log('Run the registerUser.js application before retrying');
            return;
        }
        
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: username, discovery: { enabled: true, asLocalhost: true } });
        
        const network = await gateway.getNetwork('mychannel');
        const contract = network.getContract('erc20');

        const result = await contract.submitTransaction('Approve', req.body.spender, req.body.value);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.status(200).json({response: result.toString("ok")});

        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(404).json({"response":"잘못된 값 또는 서버에서 값이 제대로 처리되지 않았습니다."});
    }
});

app.post('/api/v1.0/Allowance', async function (req, res) {
    try {
        const username = req.body.id
        const ccpPath = path.resolve(__dirname, '..', '..', 'network', 'organizations', 'ccp', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
            
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
            
        const identity = await wallet.get(username);
        if (!identity) {
            console.log(`An identity for the user ${username} does not exist in the wallet`);
            return;
        }
        
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: username, discovery: { enabled: true, asLocalhost: true } });
        
        const network = await gateway.getNetwork('mychannel');
        const contract = network.getContract('erc20');

        const result = await contract.evaluateTransaction('Allowance', req.body.minter, req.body.spender);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.status(200).json({response: result.toString()});

        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(404).json({"response":"잘못된 값 또는 서버에서 값이 제대로 처리되지 않았습니다."});
    }
});

app.post('/api/v1.0/TransferFrom', async function (req, res) {
    try {
        const username = req.body.id
        const ccpPath = path.resolve(__dirname, '..', '..', 'network', 'organizations', 'ccp', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
            
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
            
        const identity = await wallet.get(username);
        if (!identity) {
            console.log(`An identity for the user ${username} does not exist in the wallet`);
            return;
        }
        
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: username, discovery: { enabled: true, asLocalhost: true } });
        
        const network = await gateway.getNetwork('mychannel');
        const contract = network.getContract('erc20');

        const result = await contract.submitTransaction('TransferFrom', req.body.from ,req.body.to, req.body.value);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.status(200).json({response: result.toString()});

        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(404).json({"response":"잘못된 값 또는 서버에서 값이 제대로 처리되지 않았습니다."});
    }
});

app.post('/api/v1.0/register', async function (req, res) {
    try {

        const username = req.body.id;
        const password = req.body.password;
        
        if(!username){
            return res.status(404).json({"response":"id 파라미터의 값이 존재하지 않습니다."});
        }
        if(!password){
            return res.status(404).json({"response":"password 파라미터의 값이 존재하지 않습니다."});
        }

        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'network', 'organizations', 'ccp', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new CA client for interacting with the CA.
        const caInfo = ccp.certificateAuthorities['ca.org1.blin.com'];
        const caTLSCACerts = caInfo.tlsCACerts.pem;
        const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the admin user.
        const userIdentity = await wallet.get(username);
        if (userIdentity) {
            console.log(userIdentity)
            console.log(`An identity for the user "${username}" already exists in the wallet`);
            return;
        }

        const adminIdentity = await wallet.get('admin');
        if (!adminIdentity) {
            console.log('An identity for the admin user "admin" does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        }

        // build a user object for authenticating with the CA
        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, 'admin');

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({
            // affiliation: 'org1.example.com',
            enrollmentID: username,
            role: 'client'
        }, adminUser);

        // Enroll the admin user, and import the new identity into the wallet.
        const enrollment = await ca.enroll({ enrollmentID: username, enrollmentSecret: secret });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'Org1MSP',
            type: 'X.509',
        };
        await wallet.put(username, x509Identity);
        console.log('Successfully enrolled admin user "admin" and imported it into the wallet');
        res.status(200).json({response: `${username} User Register Successfully`});

    } catch (error) {
        console.error(`Failed to enroll Error: ${error}`);
        // process.exit(1);
    }
});

app.listen(8100, '0.0.0.0');
console.log('Running on api server');
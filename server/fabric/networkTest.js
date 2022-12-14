const { connect, Identity, signers } = require('@hyperledger/fabric-gateway');
const path = require("path");
const fs = require("fs");



async function main(): Promise<void> {
    const credentials = await fs.readFile('path/to/certificate.pem');
    const identity: Identity = { mspId: 'myorg', credentials };

    const privateKeyPem = await fs.readFile('path/to/privateKey.pem');
    const privateKey = crypto.createPrivateKey(privateKeyPem);
    const signer = signers.newPrivateKeySigner(privateKey);

    const client = new grpc.Client('gateway.example.org:1337', grpc.credentials.createInsecure());

    const gateway = connect({ identity, signer, client });
    try {
        const network = gateway.getNetwork('channelName');
        const contract = network.getContract('chaincodeName');

        const putResult = await contract.submitTransaction('put', 'time', new Date().toISOString());
        console.log('Put result:', utf8Decoder.decode(putResult));

        const getResult = await contract.evaluateTransaction('get', 'time');
        console.log('Get result:', utf8Decoder.decode(getResult));
    } finally {
        gateway.close();
        client.close()
    }
}


const connectNetwork = async (ogname, userid) => {
    const orgname = ogname + ".example.com";
    const connectionname = "connection-" + ogname + ".json";
    const ccpPath = path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "test-network",
      "organizations",
      "peerOrganizations",
      orgname,
      connectionname
    );
    const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));
    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "wallet", ogname);
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    const userExists = await wallet.get(userid);
    if (!userExists) {
      return null;
    }


    // Create a new gateway for connecting to our peer node.
    const identity = { mspId: 'myorg', credentials };
    const signer = signers.newPrivateKeySigner(privateKey);
    const client = new grpc.Client('gateway.example.org:1337', grpc.credentials.createInsecure());
    const gateway = connect({ identity, signer, client });
    // const gateway = new Gateway();
    // await gateway.connect(ccp, {
    //   wallet,
    //   identity: userid,
    //   discovery: { enabled: true, asLocalhost: true },
    // });
    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork("mychannel");
    return network;
  };


main().catch(console.error);
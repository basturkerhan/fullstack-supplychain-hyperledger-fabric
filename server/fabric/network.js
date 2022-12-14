const { Wallets, Gateway } = require("fabric-network");
const path = require("path");
const fs = require("fs");

const connect = async (ogname, userid) => {
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
  const gateway = new Gateway();
  await gateway.connect(ccp, {
    wallet,
    identity: userid,
    discovery: { enabled: true, asLocalhost: true },
  });
  // Get the network (channel) our contract is deployed to.
  const network = await gateway.getNetwork("mychannel");
  return network;
};

const invoke = async (network, contractName, txName, ...args) => {
  try {
    const contract = network.getContract(contractName);
    if (!contract) {
      throw new Error("User not exist in the wallet");
    }
    let response = await contract.submitTransaction(txName, ...args);
    return JSON.parse(response);
  } catch (error) {
    throw new Error(error);
  } finally {
    if (network.gatway) {
      await network.gateway.disconnect();
    }
  }
};

const query = async (network, contractName, queryName, ...args) => {
  try {
    const contract = network.getContract(contractName);
    if (!contract) {
      throw new Error("User not exist in the wallet");
    }
    let response = await contract.evaluateTransaction(queryName, ...args);
    return JSON.parse(response);
  } catch (error) {
    throw new Error(error);
  } finally {
    if (network.gatway) {
      await network.gateway.disconnect();
    }
  }
};

module.exports = {
  connect,
  invoke,
  query,
};

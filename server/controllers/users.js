require('dotenv').config()
const { Wallets, Gateway } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const fs = require('fs');
const customResponse = require('../helpers/customResponse');
const Network = require("../fabric/network");
const authenticateHelper = require("../helpers/authenticate");
const contractName = process.env.CONTRACT;

const login = async (req, res) => {
    const {organization, username, password} = req.body;
    try {
        const network = await Network.connect(organization, username);
        if(network === null) {
            return customResponse.badRequest(res, "User not found");
        }
        const result = await Network.invoke(network, contractName, 'SignIn', username, password);
        const {id, role}  = result;
        const accessToken = authenticateHelper.generateAccessToken({id, role, organization});
        return customResponse.success(res, "Succesfully login", {id, role, organization, accessToken});
    } catch (err) {
        console.log(err);
        return customResponse.badRequest(res, err.message);
    }
}


const register = async (req, res) => {
    const {loggedUserOrganization, username, role, password} = req.body;
    try {
        const organization = 
        (role === "producer") ? process.env.PRODUCER_ORGANIZATION :
        (role === "shipper") ? process.env.SHIPPER_ORGANIZATION :
        (role === "retailer") ? process.env.RETAILER_ORGANIZATION :
        null;

        if(loggedUserOrganization !== organization) {
          return customResponse.badRequest(res, 'Yeni üye sizinle aynı organizasyonda olmalıdır');
        }

        //Should be like org1 in small letters
       const orgname = `${organization}.example.com`;
       const connectionname = `connection-${organization}.json`;
       const canname = `ca.${organization}.example.com`;
       const msp = organization.replace('o','O')+'MSP';
   
       // load the network configuration
       const ccpPath = path.resolve(__dirname, '..', '..','..', 'test-network', 'organizations', 'peerOrganizations', orgname, connectionname);
       const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
   
       // Create a new CA client for interacting with the CA.
       const caURL = ccp.certificateAuthorities[canname].url;
       const ca = new FabricCAServices(caURL);
       
       // Create a new file system based wallet for managing identities.
       const walletPath = path.join(process.cwd(), 'wallet',organization);
       const wallet = await Wallets.newFileSystemWallet(walletPath);
       
       // Check to see if we've already enrolled the user.
       const userIdentity = await wallet.get(username);
    
       if (userIdentity) {
          return customResponse.badRequest(res, 'User already Registered in the wallet');
       }
       
       // Check to see if we've already enrolled the admin user.
       const adminIdentity = await wallet.get('admin');
       if (!adminIdentity) {
          return customResponse.badRequest(res, 'An identity for the admin user "admin" does not exist in the wallet');
       }
       // build a user object for authenticating with the CA
       const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
       const adminUser = await provider.getUserContext(adminIdentity, 'admin');
       // Register the user, enroll the user, and import the new identity into the wallet.
     
       const secret = await ca.register({ 
           //affiliation: affliatename,
           enrollmentID: username, 
           role: 'client',
           attrs: [{ name: "role", value: role, ecert: true },
           { name: "pswd", value: password, ecert: true }] }, adminUser);
   
    
       const enrollment = await ca.enroll({
           enrollmentID: username,
           enrollmentSecret: secret
       });
       const x509Identity = {
           credentials: {
               certificate: enrollment.certificate,
               privateKey: enrollment.key.toBytes(),
           },
           mspId: msp,
           type: 'X.509',
       };
       await wallet.put(username, x509Identity);
       return customResponse.success(res, 'Registeration Successful');
      } catch (error) {
          return customResponse.badRequest(res, error.message);
      }
 }


module.exports = {
    login,
    register
}
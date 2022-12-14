cd server
rm -r ./wallet/*
node enrollAdmin.js org1 admin adminpw
node enrollAdmin.js org2 admin adminpw
node enrollAdmin.js org3 admin adminpw
chmod 777 wallet
chmod 777 ./wallet/*

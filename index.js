const express = require('express');
const bodyParser = require('body-parser');
const IndyReq = require('./lib/indy-req');

const gtxn = {
  data: {
    alias: 'Node1',
    blskey:
      '4N8aUNHSgjQVgkpm8nhNEfDf6txHznoYREg9kirmJrkivgL4oSEimFF6nsQ6M41QvhM2Z33nves5vfSn9n1UwNFJBYtWVnHYMATn76vLuL3zU88KyeAYcHfsih3He6UHcXDxcaecHVz6jhCYz1P2UZn2bDVruL5wXpehgBfBaLKm3Ba',
    blskey_pop:
      'RahHYiCvoNCtPTrVtP7nMC5eTYrsUA8WjXbdhNc8debh1agE9bGiJxWBXYNFbnJXoXhWFMvyqhqhRoq737YQemH5ik9oL7R4NTTCz2LEZhkgLJzB3QRQqJyBNyv7acbdHrAT8nQ9UkLbaVL9NBpnWXBTw4LEMePaSHEw66RzPNdAX1',
    client_ip: '127.0.0.1',
    client_port: 9702,
    node_ip: '127.0.0.1',
    node_port: 9701,
    services: ['VALIDATOR'],
  },
  dest: 'Gw6pDLhcBcoQesN72qfotTgFa7cbuqZpkX3Xo6pLhPhv',
};

const PORT = '3000';
const app = express();

app.use(bodyParser.json());

app.post('/nym', async (request, response) => {
  const ledger = IndyReq({genesisTxn: JSON.stringify({txn: {data: gtxn}})});
  let resp;
  try {
    resp = await ledger.send(request.body);
  } catch (error) {
    response.status(500).json({message: error.message});
  }
  response.status(200).json(resp);
});

app.listen(PORT, async () => {
  console.log(`Application started on port ${PORT}`);
});

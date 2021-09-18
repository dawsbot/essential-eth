// server.js
const bodyParser = require('body-parser');
const express = require('express');
// import supertest from 'supertest';
const app = express();
const jsonParser = bodyParser.json();

const port = 3001;
/**
 * An endpoint which simply returns the POST body.
 * This is used to verify the exact same POST body between essential-eth, web3, and ethers.js
 *  */
app.post('/post', jsonParser, async (req, res) => {
  console.log('\nBODY:\n');
  console.log(req.body);
  res.json(req.body);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
// const request = supertest(app);
//
// module.exports = app;

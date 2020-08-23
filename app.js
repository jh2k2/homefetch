const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/database');
const fs = require('fs');
const http = require('http');
const https = require('https');
var logger = require('morgan');


const stripe = require("stripe")("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");

const users = require('./routes/users');
const upload = require('./routes/upload');
const properties = require('./routes/properties');
const admin = require('./routes/admin');

mongoose.connect(config.database, {
  useNewUrlParser: true
});
mongoose.connection.on('connected', () => {
  console.log('Connected to database: ' + config.database);
});
mongoose.connection.on('error', (err) => {
  console.log('Error with connection to db: ' + err);
});
const app = express();
app.use(cors());

app.set('views', __dirname + '/public');
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname, {
  dotfiles: 'allow'
}));
app.use(logger('dev'));
app.use(bodyParser.json());

app.use(passport.initialize());

app.use(passport.session());
require('./config/passport')(passport);


app.use('/user', users);
app.use('/admins', admin);
app.use('/uploads', upload);
app.use('/propertie', properties);

app.post("/create-payment-intent", async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    //TODO
    amount: (req.body.deposit * 100) + (req.body.monthly * .3 * 100),
    currency: "usd"
  });
  res.send({
    clientSecret: paymentIntent.client_secret
  });
});

app.post("/refund-payment", async (req, res) => {
  const refund = await stripe.refunds.create({
    payment_intent: req.body.paymentId,
  });
  console.log('test');
})


app.get('**', (req, res) => {
  res.sendfile(__dirname + '/public/index.html');
});

const privateKey = fs.readFileSync('/etc/letsencrypt/live/homefetch.es/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/homefetch.es/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/homefetch.es/chain.pem', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
};


const httpServer = http.createServer(function(req, res) {
  res.writeHead(301, {
    "Location": "https://" + req.headers['host'] + req.url
  });
    res.end('secure!');
}, app);

const httpsServer = https.createServer(credentials, app);

const port = process.env.PORT || 80;

httpServer.listen(port, () => {
  console.log("server started on port: " + port);
});


httpsServer.listen(443, () => {
  console.log('HTTPS Server running on port 443');
});




//app.listen(80);

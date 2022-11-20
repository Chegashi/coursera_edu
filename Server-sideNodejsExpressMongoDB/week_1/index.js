const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const hostname = 'localhost';
const port = 3000;
const dishRouter = require('./routes/dishRouter');
const leadersRouter = require('./routes/leadersRouter');
const promoRouter = require('./routes/promoRouter');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leadersRouter);

app.use(express.static((__dirname, 'public')));

app.use((req, res, next) => {
	res.statusCode = 200;
	res.setHeader('content-type', 'text/html');
	res.end('<!DOCTYPE html><html><body><h1>Express Server</h1></body></html>');
});

const server =http.createServer(app);
server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

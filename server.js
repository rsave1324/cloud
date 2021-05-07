const express = require("express")

const app = express();

app.use('/', express.static('frontend'));

app.use(express.json());
app.use(express.urlencoded());

app.listen(8080);
require('dotenv').config();

const { start, router } = require('./handlers/endpoint_handlers');
const { error, open } = require('./handlers/db_handlers');
const { mustGet } = require('./handlers/env_handlers');

const mongoose = require('mongoose');
const express = require('express');
const app = express();

const port = 1819;

const CONN_HOST = mustGet('MONGO_HOST');
const CONN_PORT = mustGet('MONGO_PORT');
const CONN_DB = mustGet('MONGO_DB');
mongoose.connect(`mongodb://${CONN_HOST}:${CONN_PORT}/${CONN_DB}`, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (err) => error(err));
db.once('open', open);

app.use(express.json());
app.use(router);

app.listen(port, start(port));
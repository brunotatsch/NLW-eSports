import express, { response } from 'express';

const app = express();

app.get('/ads', (request, response) => { 
  return response.json({id : 1, name: 'Acessou ADS2'})});

app.listen(3333);
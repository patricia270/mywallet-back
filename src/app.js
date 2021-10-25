import express from 'express';
import cors from 'cors';
import signUp from './controllers/signUp.js';
import signIn from './controllers/signIn.js';
import postInput from './controllers/inputs.js';
import postOutput from './controllers/outputs.js';
import getRegistries from './controllers/registries.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/sign-up', signUp);
app.post('/sign-in', signIn);
app.post('/inputs', postInput);
app.post('/outputs', postOutput);
app.get('/registries', getRegistries);


export default app;
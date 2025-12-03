import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ msg: 'Backend funcionando' });
});

app.listen(3001, () => console.log('Backend na 3001'));

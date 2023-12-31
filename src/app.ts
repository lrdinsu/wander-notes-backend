import express from 'express';

const app = express();

app.get('/', (_, res) => {
  res
    .status(404)
    .json({ message: 'Hello from the server side!', app: 'Natours' });
});

app.post('/', (_, res) => {
  res.send('You can post to this endpoint...');
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App runing on port ${PORT}...`);
});

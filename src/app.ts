import express from 'express';
import { readFileSync } from 'fs';
import { writeFile } from 'fs/promises';

import { Tour } from './types/type.js';

const app = express();

app.use(express.json());

// app.get('/', (_, res) => {
//   res
//     .status(404)
//     .json({ message: 'Hello from the server side!', app: 'Natours' });
// });

// app.post('/', (_, res) => {
//   res.send('You can post to this endpoint...');
// });

const datapath = new URL('../dev-data/data', import.meta.url).pathname;

const tours = JSON.parse(
  readFileSync(`${datapath}/tours-simple.json`, 'utf-8'),
) as Tour[];

app.get('/api/v1/tours', (_, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.post('/api/v1/tours', async (req, res) => {
  // console.log(req.body);
  const newId = tours.length === 0 ? 1 : tours[tours.length - 1].id + 1;
  const newTour = { ...req.body, id: newId } as Tour;

  tours.push(newTour);
  await writeFile(`${datapath}/tours-simple.json`, JSON.stringify(tours));

  res.status(201).json({
    status: 'success',
    data: {
      our: newTour,
    },
  });
});

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});

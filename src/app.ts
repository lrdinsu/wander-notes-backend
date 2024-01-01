import express from 'express';

import { createTour, getAllTours, getTour } from '@/controllers/toursControllers.js';

const app = express();

app.use(express.json());

app.get('/api/v1/tours', getAllTours);
app.post('/api/v1/tours', createTour);
app.get('/api/v1/tours/:id', getTour);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});

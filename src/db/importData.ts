import * as fs from 'fs';

import { dataPath } from '@/utils/path.js';

const tours = fs.readFileSync(`${dataPath}/tours-simple-v2.json`, 'utf-8');

for (const tour of JSON.parse(tours)) {
  fetch('http://localhost:8000/api/v1/tours', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tour),
  })
    .then(() => console.log('Data successfully loaded!'))
    .catch((err) => console.error(err));
}

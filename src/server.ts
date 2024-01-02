import { app } from './app.js';

console.log(process.env);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});

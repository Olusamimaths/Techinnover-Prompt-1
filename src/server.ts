import app from './app';

const PORT = process.env.PORT || 3000;

console.log(process.env.NODE_ENV);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

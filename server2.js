import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from server 2!');
});
app.get('/health', (req, res) => {
  res.status(200).send('OK from server 2!');
});

app.listen(8082, () => {
  console.log('Backend server running on port 8082'); 
});
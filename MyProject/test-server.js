const express = require('express');
const app = express();
const PORT = 3000;

app.get('/test', (req, res) => {
  res.json({ message: 'Test server is working!' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Test server is running on port ${PORT}`);
  console.log(`Test URL: http://localhost:${PORT}/test`);
}); 
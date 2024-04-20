const cors=require('cors');
const express = require('express');
const sql = require('mssql');

const app = express();
app.use(cors());
const port = 3000;

const config = {
  user: 'bootcamp',
  password: 'Pass@123',
  server: 'april15server.database.windows.net',
  database: 'april15db',
  options: {
    encrypt: true
  }
};

app.get('/', (req, res) => {
    // console.log("hello");
  const pool = new sql.ConnectionPool(config);
  pool.connect().then(() => {
    return pool.request().query('SELECT TOP 20 * FROM [SalesLT].[Customer];');
  }).then(result => {
    res.json(result.recordset); // Send the retrieved data as JSON response
  }).catch(err => {
    console.error('Error executing query:', err);
    res.status(500).send('Internal Server Error');
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


const express = require('express');
const mysql2= require('mysql2');

const app = express();

const connection = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydatabase'
});

app.use(express.json());

// GET /characters
app.get('/characters', (req, res) => {
  connection.query('SELECT * FROM characters', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error retrieving characters from database');
      return;
    }

    res.json(results);
  });
});

// POST /characters
app.post('/characters', (req, res) => {
  const character = req.body;

  connection.query('INSERT INTO characters SET ?', character, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error inserting character into database');
      return;
    }

    res.status(201).json({ id: result.insertId });
  });
});

// PUT /characters/:id
app.put('/characters/:id', (req, res) => {
  const { id } = req.params;
  const updatedCharacter = req.body;

  connection.query('UPDATE characters SET ? WHERE id = ?', [updatedCharacter, id], (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error updating character in database');
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).send('Character not found');
      return;
    }

    res.status(200).send('Character updated successfully');
  });
});

// DELETE /characters/:id
app.delete('/characters/:id', (req, res) => {
  const { id } = req.params;

  connection.query('DELETE FROM characters WHERE id = ?', id, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error deleting character from database');
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).send('Character not found');
      return;
    }

    res.status(200).send('Character deleted successfully');
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

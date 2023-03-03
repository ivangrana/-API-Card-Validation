const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

app.use(bodyParser.json());

// Requisição GET
app.get('/items', (req, res) => {
  db.all('SELECT * FROM items', [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    } else {
      res.json(rows);
    }
  });
});

// GET de cada item através do id
app.get('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  db.get('SELECT * FROM items WHERE id = ?', [itemId], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    } else if (!row) {
      res.status(404).send('Item not found');
    } else {
      res.json(row);
    }
  });
});

// MEtodo POST
app.post('/items', (req, res) => {
    const newItem = req.body;
    db.run('INSERT INTO items (name) VALUES (?)', [newItem.name], function(err) {
      if (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      } else {
        newItem.id = this.lastID;
        res.status(201).json(newItem);
      }
    });
  });

// PUT (Atualização de um item existente)
app.put('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const updatedItem = req.body;
    db.run('UPDATE items SET name = ? WHERE id = ?', [updatedItem.name, itemId], function(err) {
      if (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      } else if (this.changes === 0) {
        res.status(404).send('Item not found');
      } else {
        updatedItem.id = itemId;
        res.json(updatedItem);
      }
    });
  });


  // Operação DELETE de um item através do ID
app.delete('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    db.run('DELETE FROM items WHERE id = ?', [itemId], function (err) {
      if (err) {
        res.status(500).send(err.message);
      } else if (this.changes > 0) {
        res.sendStatus(204);
      } else {
        res.status(404).send('Item not found'); //Resposta 404
      }
    });
  });
  
  app.listen(3000, () => {
    console.log('API listening on port 3000');
  });
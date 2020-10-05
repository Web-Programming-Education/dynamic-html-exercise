const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

var commentsFilePath = path.join(__dirname, 'comments.json');
var commentsDefaultFilePath = path.join(__dirname, 'comments_default.json')

app.get('/comments', (req, res) => {
    fs.readFile(commentsFilePath, (err, buffer) => {
      res.json(JSON.parse(buffer.toString()))
    });
});

app.post('/comments', (req, res) => {
  if (!req.body.title || !req.body.content || !req.body.username) {
    return res.status(400).json({
      error: "The data you're sending is missing some fields. Should have: title, content and username"
    })
  }

  if ( typeof req.body.title !== "string" 
    || typeof req.body.content !== "string"
    || typeof req.body.username !== "string") {
    return res.status(400).json({
      error: "The data you're sending is of a wrong type. All fields should be strings"
    })
  }
  
  fs.readFile(commentsFilePath, (err, buffer) => {
    const existing = JSON.parse(buffer.toString());
    existing.push(req.body);
    fs.writeFile(commentsFilePath, JSON.stringify(existing), () => {
      res.sendStatus(200);
    })
  });
})

app.post('/comments/reset', (req, res) => {
  fs.readFile(commentsDefaultFilePath, (err, buffer) => {
    fs.writeFile(commentsFilePath, buffer.toString(), () => {
      res.sendStatus(200);
    })
  });
});


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
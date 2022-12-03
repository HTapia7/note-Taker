const express = require('express');
const path = require('path');
const fs = require('fs')
const uuid = require('uuid')

const PORT = process.env.port || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('./Develop/public'));



// read json file
app.get('/api/notes' , (req , res) => {
  const noteData = fs.readFileSync('./Develop/db/db.json')
  res.json(JSON.parse(noteData));
})

// MODULE 11  
// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you)

app.post('/api/notes' , (req, res) => {
  const notes = JSON.parse(fs.readFileSync('./Develop/db/db.json'));
  const newNote = req.body;
  newNote.id = uuid.v4();
  notes.push(newNote);
  fs.writeFileSync('./Develop/db/db.json' , JSON.stringify(notes));
  res.json(notes);
})


// DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.

app.delete('/api/notes/:id' , (req, res) => {
  
n
})


// routes for index and notes
app.get('/', (req , res) => {
    res.sendFile(path.join(__dirname , './Develop/public/index.html'))
})

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname , './Develop/public/notes.html'))
})

app.get('*' , (req , res) => {
  res.sendFile(path.join(__dirname , './Develop/public/index.html'))
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

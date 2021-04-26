const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
})

app.get('/api/notes', (req, res) => {
    let allNotes = fs.readFile('./db.json');

    // allNotes.forEach((note) => {
    //     renderNoteList(note);
    // })

    res.json(allNotes);
})

app.post('/api/notes', (req, res) => {
    let newNote = req.body;

    let allNotes = fs.readFile('./db.json');

    allNotes.push(newNote);

    fs.writeFile('./db.json', allNotes);

    res.json(newNote); 
})

app.listen(PORT, () => {console.log(`Listening at port ${PORT}`)})
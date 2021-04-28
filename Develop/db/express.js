const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
})

app.get('/api/notes', (req, res) => {
    let allNotes = fs.readFileSync(path.join(__dirname, './db.json'));

    res.send(allNotes);
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

app.post('/api/notes', (req, res) => {
    let newNote = req.body;

    let allNotes = fs.readFileSync(path.join(__dirname, './db.json'));

    allNotes = JSON.parse(allNotes);

    if(allNotes.length > 0 && allNotes[allNotes.length-1].id){
        newNote.id = allNotes[allNotes.length-1].id+1
    } else {
        newNote.id = 1;
    }

    allNotes.push(newNote);

    fs.writeFileSync(path.join(__dirname, './db.json'), JSON.stringify(allNotes));

    res.send(newNote); 
})

app.listen(PORT, () => {console.log(`Listening at port ${PORT}`)})
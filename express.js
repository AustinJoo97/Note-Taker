const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.static(path.join(__dirname, './public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

app.get('/api/notes', (req, res) => {
    let allNotes = fs.readFileSync(path.join(__dirname, './db/db.json'));

    res.send(allNotes);
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.post('/api/notes', (req, res) => {
    let newNote = req.body;

    let allNotes = JSON.parse(fs.readFileSync(path.join(__dirname, './db/db.json')));

    // allNotes = JSON.parse(allNotes);

    if(allNotes.length > 0 && allNotes[allNotes.length-1].id){
        newNote.id = allNotes[allNotes.length-1].id+1
    } else {
        newNote.id = 1;
    }

    allNotes.push(newNote);

    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(allNotes));

    res.send(newNote); 
})

app.delete('/api/notes/:id', (req, res) => {
    let chosen = Number(req.params.id);
    let allNotes = JSON.parse(fs.readFileSync(path.join(__dirname, './db/db.json')));

    for(let i = 0; i < allNotes.length; i++){
        if(allNotes[i].id === chosen){
            allNotes.splice(i, 1);
        }
    }
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(allNotes));

    res.send();
})

app.listen(PORT, () => {console.log(`Listening at port ${PORT}`)})
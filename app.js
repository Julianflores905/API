const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let books = [
    {
        id:1,
        title: 'cien años de soledad',
        author: 'gabriel garcia marquez'
    },
    {
        id:2,
        title: 'don quijote',
        author: 'miguel de cervantes'
    }
];

app.get('/api/books',(req,res) =>{
    res.json(books);
});

app.get('/api/books/:id', (req,res) =>{

    const id = parseInt(req.params.id);

    const book = books.find(b => b.id === id);

    if (!book){
        return res.status(404).json({
            message: 'libro no encontrado'
        });
    }
    res.json(book);
});


app.post('/api/books', (req,res) =>{

    const {title,author} = req.body;

    if (!title || !author){
        return res.status(400).json({
            message: 'Datos obligatorios'
        });
    }

const newbook = {
    id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
    title,
    author
};

books.push(newbook);

res
})

app.put('/api/books/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const {title, author} = req.body;

    const book = books.find(b=> b.id === id);

    if (!book){
        return res.status(404).json({
            message: 'No encontrado'
        });
    }
    
    book.title = title;
    book.author = author;

    res.json(book);
});

app.delete('/api/books/:id', (req, res)=> {
const id = parseInt(req.params.id);

const index = books.findIndex(b => b.id === id);

if (index === -1){
    return res.status(404).json({
        message: 'No encontrado'
    });
}

    books.splice(index,1);

    res.json({
    message:'eliminado'
    });
 
});



app.get('/',(req,res)=>{
    res.send('API funcionando!')
});


app.get('/',(req,res) =>{
    res.send('Holaaaa')
});

app.listen(port, () => {
    console.log(`servidor corriendo en http://localhost:${port}`)
});


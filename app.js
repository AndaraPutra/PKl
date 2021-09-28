const express = require('express')
const app = express()
const port = 1111
const expressLayouts = require('express-ejs-layouts');
const {Client} = require("pg");
const pg = require('pg')

//Connect
 const client = new Client({
user: "postgres",
password: "andara",
host: "localhost",
port: 5432,
database: "dbtanggal"
}) 
        
client.connect()
.then(() => console.log('database sudah connect'))

// gunakan ejs
app.set('view engine', 'ejs');
app.use(expressLayouts);

//Built-in middleware
app.use(express.static('public'));

app.get('/', (req, res) => {  
 
        const tanggal = client.query(`Select keterangan FROM tanggal WHERE tanggal = tanggal LIMIT 1 `,  (err, result) => { 
          if (err) { 
              console.log(res.rows); 
              res.status(400).send(err); 
          } 
        res.render('index', { 
          
          nama: 'Andara', 
          title: 'Menampilkan Hari', 
          data: result.rows,tanggal, 
          layout: 'layouts/main-layout',
          }); 
        }); 
    });
 
app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404</h1>');
  });

  
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});


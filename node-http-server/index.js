const express = require('express')
const app = express()

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/me/id?', (req, res) => {
    res.write('this is a different endpoint');
    console.log(req.params);
    res.end()
});

app.get('/heroes', (req, res) => {

    res.send([
        { "id": 11, "name": "Mr. Nice" },
        { "id": 12, "name": "Narco" },
        { "id": 13, "name": "Bombasto" },
        { "id": 14, "name": "Celeritas" },
        { "id": 15, "name": "Magneta" }
    ]

    );
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
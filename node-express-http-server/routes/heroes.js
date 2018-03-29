var express = require('express');
var router = express.Router();

let db = [
    { "id": 11, "name": "Mr. Nice" },
    { "id": 12, "name": "Narco" },
    { "id": 13, "name": "Bombasto" },
    { "id": 14, "name": "Celeritas" },
    { "id": 15, "name": "Magneta" },
    { "id": 16, "name": 'RubberMan' },
    { "id": 17, "name": "Dynama" },
    { "id": 18, "name": "Dr IQ" },
    { "id": 19, "name": "Magma" },
    { "id": 20, "name": "Tornado" }
];

function getNextId() {
    let ids = db.map((hero) => hero.id);
    let nextId = Math.max(...ids) + 1;
    return nextId;
}

/* GET heroes listing. */
router.get('/', function (req, res, next) {
    res.send(db);
});

router.get('/search', function (req, res) {
    if (!req.query.name) {
        res.send([]);
    }

    let searchResult = db.filter((hero) => hero.name.toLocaleLowerCase().includes(req.query.name.toLocaleLowerCase()));
    res.send(searchResult);
});

router.get('/:id', function (req, res) {

    let hero = db.find(h => h.id == req.params.id);
    res.send(hero);
});

router.delete('/:id', function (req, res) {

    let hero = db.find(h => h.id == req.params.id);
    db = db.filter(h => h !== hero);
    res.send(hero);
});

router.put('/', function (req, res) {
    updateHero(req);
    res.end();
});

router.post('/', function (req, res) {
    if (!req.body.id) {
        addHero(req);
    } else {
        updateHero(req);
    }
    res.end();
});

function updateHero(req) {
    let index = db.findIndex(h => h.id == req.body.id);
    db[index] = req.body;
}

function addHero(req) {
    db.push({ id: getNextId(), name: req.body.name });
}



module.exports = router;
const createCollectionTable = `
    CREATE TABLE IF NOT EXISTS collections (
        collection_id INTEGER PRIMARY KEY, name TEXT NOT NULL, author TEXT NOT NULL
    )
`;

const createCardTable = `
    CREATE TABLE IF NOT EXISTS cards (
        card_id INTEGER PRIMARY KEY, collection INTEGER NOT NULL, front TEXT NOT NULL, back TEXT NOT NULL,
        FOREIGN KEY (collection) REFERENCES collections (collection_id)
    )
`;

const getAllCollections = `
    SELECT * FROM collections
`;

const getAllCards = `
    SELECT * FROM cards INNER JOIN collections ON collections.collection_id = cards.collection
`;

const getCollectionById = `
    SELECT * FROM collections WHERE collection_id = ?
`;

const getCollectionByName = `
    SELECT * FROM collections WHERE name = ?
`;

const getCardsByCollection = `
    SELECT * FROM cards INNER JOIN collections ON collections.collection_id = cards.collection WHERE collection = ?
`;

const createCollection = `
    INSERT INTO collections(name, author) VALUES (?, ?)
`;

const createCard = `
    INSERT INTO cards(collection, front, back) VALUES (?, ?, ?)
`;

module.exports.createCollectionTable = function() { return createCollectionTable; };
module.exports.createCardTable = function() { return createCardTable; };

module.exports.getAllCollections = function() { return getAllCollections; };
module.exports.getAllCards = function() { return getAllCards; };
module.exports.getCollectionById = function() { return getCollectionById; };
module.exports.getCollectionByName = function() { return getCollectionByName; };
module.exports.getCardsByCollection = function() { return getCardsByCollection; };

module.exports.createCollection = function() { return createCollection; };
module.exports.createCard = function() { return createCard; };
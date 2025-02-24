const createUserTable = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY, username TEXT NOT NULL, password TEXT NOT NULL, joindate TEXT NOT NULL, bio TEXT, iconpath TEXT
    )
`;

const createCategoryTable = `
    CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY, name TEXT NOT NULL, description TEXT
    )
`;
const createThreadTable = `
    CREATE TABLE IF NOT EXISTS threads (
        id INTEGER PRIMARY KEY, category INTEGER NOT NULL, threadauthor TEXT NOT NULL, title TEXT NOT NULL, threadtimestamp TEXT NOT NULL,
        FOREIGN KEY (category) REFERENCES categories (id), FOREIGN KEY (threadauthor) REFERENCES users (id)
    )
`;
const createPostTable = `
    CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY, thread INTEGER NOT NULL, postauthor INTEGER NOT NULL, body TEXT NOT NULL, timestamp TEXT NOT NULL, imagepath TEXT,
        FOREIGN KEY (thread) REFERENCES threads (id), FOREIGN KEY (postauthor) REFERENCES users (id)
    )
`;

const getCategories = `SELECT * FROM categories`;
const getCategoryById = `SELECT * FROM categories WHERE id = ?`
const createCategory = `INSERT INTO categories(name, description) VALUES (?, ?)`;

const getAllThreads = `SELECT users.id AS user_id, categories.id AS category_id, threads.id AS thread_id, * FROM threads INNER JOIN users ON users.id = threads.threadauthor INNER JOIN categories ON categories.id = threads.category`;
const getThreadById = `SELECT users.id AS user_id, categories.id AS category_id, threads.id AS thread_id, * FROM threads INNER JOIN users ON users.id = threads.threadauthor INNER JOIN categories ON categories.id = threads.category WHERE threads.id = ?`;
const createThread = `INSERT INTO threads(category, threadauthor, title, threadtimestamp) VALUES (?, ?, ?, ?)`;

const getAllPosts = `SELECT threads.id AS thread_id, * FROM posts INNER JOIN users ON users.id = posts.postauthor INNER JOIN threads ON threads.id = posts.thread`;
const createPost = `INSERT INTO posts(thread, postauthor, body, timestamp) VALUES (?, ?, ?, ?)`;

const getAllUsers = `SELECT * FROM users`;
const getUserCredentials = `SELECT * FROM users WHERE username = ?`
const createUser = `INSERT INTO users(username, password, joindate, bio, iconpath) VALUES (?, ?, ?, ?, ?)`;

module.exports.createUserTable = () => { return createUserTable; };
module.exports.createCategoryTable = () => { return createCategoryTable; };
module.exports.createThreadTable = () => { return createThreadTable; };
module.exports.createPostTable = () => { return createPostTable; };

module.exports.getCategories = () => { return getCategories; };
module.exports.getCategoryById = () => { return getCategoryById; };
module.exports.createCategory = () => { return createCategory; };

module.exports.getAllThreads = () => { return getAllThreads; };
module.exports.getThreadById = () => { return getThreadById };
module.exports.createThread = () => { return createThread; };

module.exports.getAllPosts = () => { return getAllPosts; };
module.exports.createPost = () => { return createPost; };

module.exports.getAllUsers = () => { return getAllUsers; };
module.exports.getUserCredentials = () => { return getUserCredentials };
module.exports.createUser = () => { return createUser; };
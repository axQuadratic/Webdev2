const sql = require("sqlite3");
const { open } = require("sqlite");

let db = null;

async function initDatabase() {
    db = await open({
        filename: "components.db",
        driver: sql.Database
    });

    await db.run("PRAGMA foreign_keys = ON");
}

module.exports.initDatabase = () => { return initDatabase(); };
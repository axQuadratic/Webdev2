const sql = require("sqlite3");
const { open } = require("sqlite");

let db = null;

async function initDatabase() {
    db = await open({
        filename: "components.db",
        driver: sql.Database
    });

    await db.run("PRAGMA foreign_keys = ON");

    await db.exec(`CREATE TABLE IF NOT EXISTS motherboard (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        image TEXT,
        form_factor TEXT NOT NULL,
        socket TEXT NOT NULL,
        m2_gen5_count INTEGER NOT NULL,
        m2_gen4_count INTEGER NOT NULL,
        sata_count INTEGER NOT NULL
    )`);

    await db.exec(`CREATE TABLE IF NOT EXISTS cpu (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        image TEXT,
        socket TEXT NOT NULL,
        tdp INTEGER NOT NULL
    )`);

    await db.exec(`CREATE TABLE IF NOT EXISTS cpu_cooler (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        image TEXT,
        rad_size INTEGER,
        tdp INTEGER NOT NULL
    )`);

    await db.exec(`CREATE TABLE IF NOT EXISTS ram (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        image TEXT,
        rating INTEGER NOT NULL,
        module_count INTEGER NOT NULL
    )`);

    await db.exec(`CREATE TABLE IF NOT EXISTS m2 (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        image TEXT,
        generation TEXT NOT NULL
    )`);

    await db.exec(`CREATE TABLE IF NOT EXISTS sata (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        image TEXT
    )`);

    await db.exec(`CREATE TABLE IF NOT EXISTS gpu (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        image TEXT,
        length INTEGER NOT NULL,
        tdp INTEGER NOT NULL
    )`);

    await db.exec(`CREATE TABLE IF NOT EXISTS pc_case (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        image TEXT,
        max_gpu_length INTEGER NOT NULL,
        max_form_factor TEXT NOT NULL
    )`);

    await db.exec(`CREATE TABLE IF NOT EXISTS case_fan (
        id INTEGER PRIMARY KEY, 
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        image TEXT
    )`);

    await db.exec(`CREATE TABLE IF NOT EXISTS psu (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        rating INTEGER NOT NULL
    )`);
}

module.exports.initDatabase = () => { return initDatabase(); };
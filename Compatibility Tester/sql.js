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

async function getMotherboards() {
    return await db.all("SELECT * FROM motherboard");
}
async function getCpus() {
    return await db.all("SELECT * FROM cpu");
}
async function getCoolers() {
    return await db.all("SELECT * FROM cpu_cooler");
}
async function getRam() {
    return await db.all("SELECT * FROM ram");
}
async function getM2s() {
    return await db.all("SELECT * FROM m2");
}
async function getSatas() {
    return await db.all("SELECT * FROM sata");
}
async function getGpus() {
    return await db.all("SELECT * FROM gpu");
}
async function getCases() {
    return await db.all("SELECT * FROM pc_case");
}
async function getCaseFans() {
    return await db.all("SELECT * FROM case_fan");
}
async function getPsus() {
    return await db.all("SELECT * FROM psu");
}

async function getAllComponents() {
    let components = {
        "motherboard": [],
        "cpu": [],
        "cpu_cooler": [],
        "ram": [],
        "m2": [],
        "sata": [],
        "gpu": [],
        "case": [],
        "case_fan": [],
        "psu": []
    };

    components.motherboard = await getMotherboards();
    components.cpu = await getCpus();
    components.cpu_cooler = await getCoolers();
    components.ram = await getRam();
    components.m2 = await getM2s();
    components.sata = await getSatas();
    components.gpu = await getGpus();
    components.case = await getCases();
    components.case_fan = await getCaseFans();
    components.psu = await getPsus();

    return components;
}

module.exports = {
    initDatabase, getMotherboards, getCpus, getCoolers, getRam,
    getM2s, getSatas, getGpus, getCases, getCaseFans, getPsus,
    getAllComponents
};
const pool = require('../../db');
const queries = require('./queries')
const docTemplate = require('./documentTemplate')

//const initialDocument = docTemplate.getDocumentTemplate;
const initialTags = '';
const dcStatus = 1;
const getDCs = (req, res) => {
    pool.query(queries.getDCs, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

const getDCById = (req, res) => {
    const id = req.params.id;
    pool.query(queries.getDCById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const addDC = (req, res) => {
    const { familyname, firstname, email } = req.body;

    //check if DC exists
    pool.query(queries.checkDCExists, [familyname, firstname,], (error, results) => {
        if (results.rows.length) {
            res.send("Candidat already exists.");
        }
        else {
            //add DC to db
            let initialDocument = docTemplate.GetDocTemp(familyname, firstname, email);
            pool.query(queries.addDC, [familyname, firstname, email, dcStatus, initialDocument], (error, results) => {
                if (error) throw error;
                res.status(201).send("Candidat created Successfully!");
            })
        }

    });
};

const deleteDCById = (req, res) => {
    const id = req.params.id;
    pool.query(queries.getDCById, [id], (error, results) => {
        const noDCFound = !results.rows.length;
        if (noDCFound) {
            res.send("Candidat does not exist in the database");
        }
        else {
            pool.query(queries.deleteDCById, [id], (error, results) => {
                if (error) throw error;
                res.status(200).send("Candidat deleted Successfully!");
            });
        }
    });
};

const updateDC = (req, res) => {
    const id = req.params.id;
    const { tags, document } = req.body;
    pool.query(queries.getDCById, [id], (error, results) => {
        const noDCFound = !results.rows.length;
        if (noDCFound) {
            res.send("Candidat does not exist in the database");
        }
        else {
            pool.query(queries.updateDC, [id, tags, document], (error, results) => {
                if (error) throw error;
                res.status(200).send("Candidat updated Successfully!");
            });
        }
    });
};


module.exports = {
    getDCs,
    getDCById,
    addDC,
    updateDC,
    deleteDCById,
};
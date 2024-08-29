const data = {};
data.employees = require('../model/employees.json');

const getAllEmployees = (req, res) => {
    res.json(data.employees);
};

const createNewEmployee = (req, res) => {
    res.json({
        "id": req.body.id,
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "position": req.body.position
    })
}

const updateEmployee = (req, res) => {
    res.json({
        "id": req.body.id,
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "position": req.body.position
    })
}

const deleteEmployee = (req, res) => {
    res.json({ "id": req.body.id });
}

const getEmployee = (req, res) => {
    res.json({ "id": req.params.id });
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}
const mongoose = require('mongoose');

var Employee = mongoose.model('Employee', {
    name: { type: String },
    designation: { type: String },
    address: { type: String },
    salary: { type: Number }
});

module.exports = { Employee };
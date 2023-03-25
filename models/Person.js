const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
    name: String,
    salary: Number,
    aprooved: Boolean,
})

module.exports = Person;
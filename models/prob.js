const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const probSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true
    },
},{timestamps:true});

const Prob = mongoose.model('Prob',probSchema);

module.exports = Prob;

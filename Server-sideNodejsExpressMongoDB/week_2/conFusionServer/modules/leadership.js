const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const leadersSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    designation: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },	
    abbr: {
        type: String,
        default: ''
    },
    description: {
        type: Currency,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default:false      
    },
    timestamps: true
});

var leaders = mongoose.model('leaders', leadersSchema);

module.exports = leaders;

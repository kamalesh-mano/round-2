const { model, Schema } = require('mongoose');
const statesSchema = new Schema({
    //names: String,
    //phone:String,
    //area:String,
    statename:[],
});
module.exports = model('States',statesSchema);
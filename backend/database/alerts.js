const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Security_Patrol')
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error("Database connection error", err);
  });

const alertschema = new mongoose.Schema({

  alert_id:{
    type: Number,
    required: true
  },

  alert_name:{
    type:String,
    required:true
  },

  department:String,

  configurations:Object,

  status:Boolean

}, { timestamps: true });

const Alertmodel = mongoose.model("Alerts", alertschema);

module.exports = Alertmodel;
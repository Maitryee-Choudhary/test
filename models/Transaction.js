const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
     text:{
        type:String,
        trim: true,
        required: [true, 'Please add some text']
     },
     amount: {
        type:Number,
        required: [true,'Please add amount']
     },
     createdAt:{
        type:Date,
     },
     category:{
      type:String,
      required: [true, 'Please specify category']
     },
     user_id:{
       type:String,
       required: true
     }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
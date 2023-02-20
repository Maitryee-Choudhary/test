const Transaction = require('../models/Transaction');


//@desc   Get all transactions
//@route  /api/transaction/
const getTransactions = async (req,res,next) => {
//    res.send('Get transaction');
   const user_id = req.user._id;

    try{
       const transactions = await Transaction.find({user_id:user_id}).sort({$natural:-1});

       return res.status(201).json({
        success: true,
        count: transactions.length,
        data: transactions
      });
      next();
    }catch(e){
        return res.status(500).json({
            success: false,
            error: 'Server Error'
          });
    }
   
}

// //@desc   Get latest 5 transactions
// //@route  /api/transaction/latest
// const getLatestTransactions = async (req,res,next) => {
//   //    res.send('Get transaction');
//       try{
//          const transactions = await Transaction.find({}).sort({$natural:-1}).limit(5);
  
//          return res.status(201).json({
//           success: true,
//           count: transactions.length,
//           data: transactions
//         });
//       }catch(e){
//           return res.status(500).json({
//               success: false,
//               error: 'Server Error'
//             });
//       }
     
//   }
  

//@desc   Add transaction
//@route  /api/transaction/add
const addTransaction = async (req,res,next) => {
    // res.send('Post transaction');
    try{
       const user_id = req.user._id;
       const {text, amount,category, createdAt} = req.body;
       const response = await Transaction.create({text: text, amount: amount, category: category, createdAt: createdAt, user_id: user_id});
       return res.status(201).json({
        success: true,
        data: response
      }); 
      next();
    }catch(e){
        if(e.name === 'ValidationError'){
            const messages = Object.values(e.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                error: messages
              });
        }
        else
            return res.status(500).json({
                success: false,
                error: 'Server Error'
              });
    }
 }

 //@desc   Delete transaction
//@route  /api/transaction/delete
const deleteTransaction = async (req,res,next) => {
    // res.send('Get transaction');
    const _id = req.params.id;
    try{
        
        const response = await Transaction.findById({_id: _id});
        if(!response){
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
              });
        }
        await Transaction.deleteOne({_id: _id});
         
        return res.status(200).json({
            success: true,
            data: {}
          });
          next();
     }catch(e){
        return res.status(500).json({
            success: false,
            error: 'Server Error'
          });
     }
 }

module.exports = {
    getTransactions,
    addTransaction,
    deleteTransaction,
}
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app=express();





const OpiniateDb=mongoose.createConnection
(process.env.MONGOURI,
{useNewUrlParser:true,useUnifiedTopology:true},
()=>console.log('successfully connected to db'));


const User = OpiniateDb.model('bTree',{
 btree:[]
});

let arr=[]

app.get('/dfs', async (req, res)=>{
    
    await User.find({}).then((response)=>{
         arr=response[0].btree
        console.log(response[0].btree)
        // Above line will give array of binary tree [root,left,right] format
       
        function InOrderTraverse (arr,i) {
            if (arr && arr[i] !== 'null' || arr && i<arr.length) {
              //Traverse the left subtree
              InOrderTraverse(arr && arr[2*i+1]);
              
              //Print the node
              console.log(arr && arr[i]);
              
              //Traverse the right subtree
              InOrderTraverse(arr &&  arr[2*i+2]);
            }
           }

        InOrderTraverse(arr,0);
        res.send("Done")
    }).catch((err)=>console.log(err));
})
app.listen(3001,()=>{
    console.log('Listening on binary tree')
})


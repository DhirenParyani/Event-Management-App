const express= require('express');
const bodyParser=require('body-parser');
const graphqlHttp=require('express-graphql');
const mongoose= require('mongoose')
const isAuth=require('./middleware/is-auth');
const app=express();

const graphQlSchema=require('./graphql/schema/index');
const graphQlResolver=require('./graphql/resolvers/index');

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
  if(req.method ==='OPTIONS'){
    return res.sendStatus(200);
  }
  next();
});

app.use(bodyParser.json());
app.use(isAuth);



app.use('/graphql',graphqlHttp({

    schema: graphQlSchema,
    rootValue: graphQlResolver,
    graphiql:true

}));
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-nsrij.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`).then(()=>{
    app.listen(8000);

}).catch(err=>{
  console.log(err);    
});

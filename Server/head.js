const {ApolloServer} = require(`apollo-server`);
const gql = require(`graphql-tag`);
const mongoose = require(`mongoose`);

const States=require('./models/States')
const{MONGODB} = require("./config.js");


const variable="iowa"


const typeDefs= gql `
    type statename{
        name:String
    }
    type States{
       
        statename: [statename]
    }
    type Query{
        getStates: [States],
        
    }
`;
const resolvers= {
    Query:{
        async getStates(){
            try{
                const states = await States.find({});
                console.log(states);
                return states;

            }catch(err){
                throw new Error(err);
            }
        }
        
}
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})
mongoose.connect(MONGODB, {useNewUrlParser: true})
    .then(() =>{
        console.log('mongodb connected')
        return server.listen({port:8000})
    })
    .then(res=>{
        console.log(`Server running at ${res.url}`)
        
    });
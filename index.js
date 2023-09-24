var express = require("express")
var {createHandler} = require ("graphql-http/lib/use/express")
var { GraphQLSchema,GraphQLList, GraphQLObjectType, GraphQLInt, GraphQLString } = require("graphql")
const expressPlayground = require('graphql-playground-middleware-express')
  .default
// Construct a schema, using GraphQL schema language
var feed_array = [{
        id: 1,
        title: "It is a very sunny day",
        content: "... and i really don't feel like doing so much"
    },
    {
        id: 2,
        title: "I am enjoying this Pentest Course",
        content: "Learning about graphql is amazing"
    },
]

var pages_array = [{
        id: 1,
        title: "First Page",

    },
    {
        id: 2,
        title: "DevOps Group",

    },
]
var suggested_connections_array = [{
        id: 1,
        name: "John Doe",

    },
    {
        id: 2,
        name: "Alice Bob",

    },
]

var feedType = new GraphQLObjectType({ 
    name: "Feed",
    fields: {
       id: { type: GraphQLInt },
       title: { type:GraphQLString },
       content: { type:GraphQLString }
    }
});


var pageType = new GraphQLObjectType({ 
    name: "Page",
    fields: {
       id: { type: GraphQLInt },
       title: { type:GraphQLString },
    }
});


var SuggestedConnectionType = new GraphQLObjectType({ 
    name: "SuggestedConnection",
    fields: {
       id: { type: GraphQLInt },
       name: { type:GraphQLString },
    }
});

var schema = new GraphQLSchema ({

  mutation: new GraphQLObjectType({ 
     name: 'Mutation',
     fields: {
        addPage: {
           type: pageType,
           args:{ title: {
             type: GraphQLString 
           } },
           resolve:  (_, {title}) => {
        let new_object = { id: pages_array.length + 1, title: title }
        pages_array.push(new_object)
        return new_object;
    }
        } ,

      addFeed: {

           type: feedType,
           args:{ title: {
             type: GraphQLString 
           },
             content: {
             type: GraphQLString 
            }
            },
            resolve: (_, {title,content}) => {

        let new_object = { id: feed_array.length + 1, title: title, content: content }
        feed_array.push(new_object)
        return new_object;

  }
      }
     }
  }),
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
       feed: {type: new GraphQLList(feedType), resolve:  () => {
        return feed_array
    }
  } ,
      page: {
          type: new GraphQLList(pageType),
          resolve: () => {
        return pages_array
    }

      },
     suggested_connection: {

          type: new GraphQLList(SuggestedConnectionType),
          resolve: () => {
        return suggested_connections_array

    }
     }
 }
})
});
 

 


var app = express()
app.use(
    "/graphql",
    createHandler({
        schema
    })
)
app.get('/playground', expressPlayground({ endpoint: '/graphql' }))
app.listen(5000)
console.log("Running a GraphQL API server at http://localhost:5000/graphql\nPlayground is running at http://localhost:5000/playground")

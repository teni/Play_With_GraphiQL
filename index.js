var express = require("express")
var { graphqlHTTP } = require("express-graphql")
var { buildSchema } = require("graphql")

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


var schema = buildSchema(`
type Feed {
      id: Int,
      title: String,
      content: String
  }
type Page {
    id: Int
    title: String

}
input PageInput {
     title: String
 }
input FeedInput {
     title : String
     content: String
 }
 
type SuggestedConnection {
    id: Int
    name: String
}

  type Query {
   
    feed: [Feed],
    page: [Page],
    suggested_connection: [SuggestedConnection]

  }

  type Mutation {
     addPage (input: PageInput) : Page ,
     addFeed(input: FeedInput) : Feed
  }

 

`)

// The root provides a resolver function for each API endpoint
var root = {

    feed: () => {
        return feed_array
    },
    page: () => {
        return pages_array
    },
    suggested_connection: () => {
        return suggested_connections_array
    },
    addPage: (x) => {
        let new_object = { id: pages_array.length + 1, title: x.input.title }
        pages_array.push(new_object)
        return new_object;
    },
    addFeed: (x) => {
        let new_object = { id: feed_array.length + 1, title: x.input.title, content: x.input.content }
        feed_array.push(new_object)
        return new_object;
    }
}

var app = express()
app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    })
)
app.listen(5000)
console.log("Running a GraphQL API server at http://localhost:5000/graphql")
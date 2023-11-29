const express = require("express");
const http = require("http");
const path = require("path");
const axios = require("axios");
const cors=require("cors")
// GraphQL
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");

const app = express();

app.use(
  express.static(path.join(__dirname, "../public"), {
    maxAge: "5000",
  })
);

const server = http.createServer(app);

// GraphQL Setting
const graphQLSetting = async () => {
  const graphQLServer = new ApolloServer({
    typeDefs: `
    type User {
      id: ID!
      name: String!
      username: String!
      email: String!
      phone: String!
      website: String!
    }

    type Todo {
      id: ID!
      title: String!
      completed: Boolean
      user: User
    }

    type Query {
      getTodos: [Todo]
      getAllUsers: [User]
      getUser(id: ID!): User
    }
  `,
    resolvers: {
      Todo:{
        user:(todo)=>{
          console.log(todo)
          return axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)
          .then(res=>res.data)
        }
      },

      Query: {
        async getTodos() {
          return (await axios.get("https://jsonplaceholder.typicode.com/todos"))
            .data;
        },

        async getAllUsers() {
          return (await axios.get("https://jsonplaceholder.typicode.com/users"))
            .data;
        },

        async getUser(parent, { id }) {
          return (
            await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
          ).data;
        },
      },
    },
  });

  app.use(cors())
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  await graphQLServer.start();

  app.use("/graphql", expressMiddleware(graphQLServer));

  server.listen(4000, () => {
    console.log("server running at *4000 port");
  });
};

graphQLSetting();

const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: []
}

type Book {
    bookId: String
    authors: String
    description: String
    title: String
    image: {}
    link: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
    users: [User]
    user(username: Sting!): User
    books: [Book]
    book(bookId: String!): Book
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    removeBook(bookId: String!): User
}

input saveBook {
    authors: []
    description: String
    title: String!
    bookId: String!
    image: {}
    link: String!

}
`;

module.exports = typeDefs;
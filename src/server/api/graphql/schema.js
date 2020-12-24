const { gql } = require('apollo-server');

const typeDefs = gql`
  type Periode {
    id: ID!
    name: String!
    conseils: [Conseil!]!
    symptomes: [Symptome]
  }
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
  }
  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  type Conseil {
    id: ID!
    name: String!
    periode: Periode!
  }

  type Symptome {
    id: ID!
    name: String!
    periode: Periode!
  }

  type PostCategory {
    id: ID!
    name: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    category: PostCategory!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    content: String!
    Post: Post!
  }

  type Query {
    periode(id: ID!): Periode
    allPeriodes: [Periode!]!
    conseil(id: ID!): Conseil!
    allConseil: [Conseil!]!
    symptome(id: ID!): Symptome!
    allSymptome: [Symptome!]!
    posts: [Post!]!
    post(id: ID!): Post!
    categories: [PostCategory!]!
    category(id: ID!): PostCategory!
    comments(postId: ID!): [Comment!]!
  }

  type Mutation {
        createPeriode(name: String!): Periode!
        createConseil(
          periodeId: ID!
          title: String!
          name: String!
        ): Conseil!
        createSymptome(
          periodeId: ID!
          title: String!
          name: String!
        ): Symptome!
        createPostCategory(
          name: String!
        ): PostCategory!
        createPost(
          categoryId: String!
          title: String!
          content: String!
        ): Post!
        createComment(
          postId: String!
          content: String!
        ): Comment!
        createUser(
          username: String!
          email: String!
          password: String!
        ): User!
        login(
          email: String!
          password: String!
        ): AuthData!
    }

    type Subscription {
        newPeriode(periodeId: Int): Periode
        newPost: Post
        newComment: Comment
    }
`;

module.exports = typeDefs
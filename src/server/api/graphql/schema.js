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
    password: String!
    phone: String!
    profile: Profile
  }
  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  type Profile{
    id: ID
    name: String
    lastName: String
    avatar: String
    sex: String
    address: String
    phone: String
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
    body: String!
    author: User!
    category: PostCategory!
    comments: [Comment!]!
    commentCount: Int!
    likesCount: Int!
    # authCount: Int
  }

  type Comment {
    id: ID!
    content: String!
    post: Post!
    user: User!
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
          body: String!
        ): Post!
        createComment(
          postId: String!
          content: String!
        ): Comment!
        createUser(
          phone: String!
          password: String!
        ): User!
        login(
          phone: String!
          password: String!
        ): AuthData!
        profile(
          userId: String!
          name: String
          lastName: String
          sex: String
          avatar: String
          phone: String
          address: String
        ): Profile!
    }

    type Subscription {
        newPeriode(periodeId: ID): Periode
        newPost: Post
        newComment(postId: ID!): Comment
    }
`;

module.exports = typeDefs
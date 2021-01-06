const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar DateTime
  type Periode {
    id: ID!
    name: String!
    conseils: [Conseil!]!
    symptomes: [Symptome]
  }
  type User {
    id: ID!
    username: String 
    password: String!
    isVerified: Boolean!
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
    firstName: String
    lastName: String
    name: String
    avatar: String
    gender: String
    address: String
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

  type PostTag {
    id: ID!
    name: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    createdAt: DateTime!
    status: Boolean!
    author: User!
    isLiked: Boolean!
    tag: PostTag!
    comments: [Comment!]!
    commentCount: Int!
    likesCount: Int!
    total: Int!
    # likeVerifiedCount: Int!
  }

  type PostResult{
    totalItems: Int!
    totalPages: Int!
    currentPage: Int!
    hasMore: Boolean!
    posts: [Post]
  }

  type Comment {
    id: ID!
    content: String!
    status: Boolean!
    post: Post!
    user: User!
    createdAt: String!
  }
  type ResourceLiked {
    post: Post
    comment: Comment
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Query {
    users: [User!]
    user(id: ID!): User
    periode(id: ID!): Periode
    allPeriodes: [Periode!]!
    conseil(id: ID!): Conseil!
    allConseil: [Conseil!]!
    symptome(id: ID!): Symptome!
    allSymptome: [Symptome!]!
    postResult(page: Int, size: Int): PostResult!
    post(id: ID!): Post!
    tags: [PostTag!]!
    tag(id: ID!): PostTag!
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
        createPostTag(
          name: String!
        ): PostTag!
        createPost(
          tagId: String!
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
        likeResource(
          resourceId : String!
          model: String!
        ): ResourceLiked!
        profile(
          userId: String!
          firstName: String
          lastName: String
          name: String
          gender: String
          avatar: String
          address: String
        ): Profile!
        uploadFile(file: Upload!): File
    }

    type Subscription {
        newPeriode(periodeId: ID): Periode!
        newPost: Post!
        newComment(postId: ID!): Comment!
        resourcetLiked(
          resourceId: ID!
          model: String!
        ): ResourceLiked!
    }
`;

module.exports = typeDefs
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar DateTime
  type Periode {
    id: ID!
    name: String!
    symptomes: [Symptome]
  }
  type User {
    id: ID!
    username: String 
    password: String!
    phone: String!
    status: Boolean!
    profile: Profile
    createdAt: DateTime!
  }
  type AuthData {
    userId: ID!
    token: String!
    isLoggedIn: Boolean!
    user: User!
  }

  type Profile{
    id: ID
    firstName: String
    lastName: String
    name: String
    avatar: String
    gender: String
    address: String
    isVerified: Boolean!
    updatedAt: DateTime!
  }

  type Conseil {
    id: ID!
    title: String!
    description: String!
    status: Boolean!
    items(periodeId: ID): [ConseilItem!]!
  }

  type ConseilItem {
    id: ID!
    title: String!
    body: String!
    image: String
    status: Boolean!
    periode: Periode!
    conseil: Conseil!
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
    timeAgo: String!
    status: Boolean!
    author: User!
    isLiked: Boolean!
    tag: PostTag!
    comments: [Comment!]!
    commentCount: ID!
    likesCount: ID!
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
    author: User!
    createdAt: DateTime!
    timeAgo: String!
  }
  type ResourceLiked {
    post: Post
    comment: Comment
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
    path: String!
  }

  type Query {
    users: [User!]
    user(id: ID!): User
    phoneVerification(phone: String!): Boolean!
    periode(id: ID!): Periode
    periodes: [Periode!]!
    conseil(id: ID!): Conseil!
    conseils: [Conseil!]!
    conseilItems: [ConseilItem!]!
    symptome(id: ID!): Symptome!
    symptomes: [Symptome!]!
    postResult(page: Int, size: Int): PostResult!
    post(id: ID!): Post!
    tags: [PostTag!]!
    tag(id: ID!): PostTag!
    comments(postId: ID!): [Comment!]!
  }

  type Mutation {
        updatePeriode(id: ID, name: String!): Periode!
        updateConseil(
          id: ID
          title: String!
          description: String!
        ): Conseil!
        updateConseilItem(
          id: ID
          conseilId: ID!
          periodeId: ID!
          title: String!
          body: String!
          image: String
        ): ConseilItem!
        updateSymptome(
          periodeId: ID!
          title: String!
          name: String!
        ): Symptome!
        updatePostTag(
          id: ID,
          name: String!
        ): PostTag!
        updatePost(
          id: ID
          tagId: ID!
          title: String!
          body: String!
          status: Boolean
        ): Post!
        updateComment(
          id: ID
          postId: ID!
          content: String!
          status: Boolean
        ): Comment!
        updateUser(
          id: ID
          phone: String
          password: String
          isVerified: Boolean
          status: Boolean
          username: String
          firstName: String
          lastName: String
          name: String
          gender: String
          avatar: Upload
          address: String
        ): User!
        login(
          userID: String!
          password: String!
          device_id: String!
        ): AuthData!
        logout(
          device_id: String!
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
          avatar: Upload
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
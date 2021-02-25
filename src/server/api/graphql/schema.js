const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar DateTime

  input WhereInput {
    id: ID
    status: Boolean
    visible: Boolean
  }

  type Periode {
    id: ID!
    name: String!
    status: Boolean!
    symptomes: [Symptome]
  }
  type User {
    id: ID!
    username: String 
    password: String!
    phone: String!
    status: Boolean!
    visible: Boolean!
    role: String!
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
    speciality: String!
    isVerified: Boolean!
    updatedAt: DateTime!
  }

  type Conseil {
    id: ID!
    title: String!
    description: String!
    status: Boolean!
    image: String
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
    title: String!
    name: String!
    periode: Periode!
    status: Boolean
  }

  type PostTag {
    id: ID!
    name: String!
    status: Boolean
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
    verifiedcomment: ID!
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

  type CommentResult{
    totalItems: Int!
    totalPages: Int!
    currentPage: Int!
    hasMore: Boolean!
    comments: [Comment]
  }
  type UserResult{
    totalItems: Int!
    totalPages: Int!
    currentPage: Int!
    hasMore: Boolean!
    users: [User]
  }
  type Dashboard{
    usercount: Int!
    symptomecount: Int!
    conseilcount: Int!
    postcount: Int!
    periodecount: Int!
  }
  type OtpVerification{
    credetial: String
    phoneNumber: String
    otpCode: String
    isVerifed: Boolean
  }

  type Credetial{
    credetial: String
    isVerifed: Boolean
  }
 
  type Comment {
    id: ID!
    content: String!
    status: Boolean!
    post(postId: ID): Post
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
    # users: [User!]
    user(phone: String!): User

    phoneVerification(phone: String!, model: String!, countryCode: String!): Credetial

    periode(id: ID!): Periode

    periodes(status: Boolean): [Periode!]!

    conseil(id: ID!): Conseil!

    conseils(status: Boolean): [Conseil!]!

    conseilItems(periodeId: ID, conseilId: ID, status: Boolean): [ConseilItem!]!

    symptome(id: ID!): Symptome!

    symptomes(periodeId: ID): [Symptome!]!

    postResult(page: Int, size: Int, tagId: ID, query: String, status: Boolean): PostResult!
    
    commentResult(page: Int, size: Int, postId: ID, status: Boolean): CommentResult!

    userResult(
      page: Int,
      size: Int,
      query: String,
      status: Boolean,
      visible: Boolean
    ): UserResult!

    post(id: ID!): Post!

    tags(status: Boolean): [PostTag!]!

    tag(id: ID!, status: Boolean): PostTag!

    comments(postId: ID!,, status: Boolean): [Comment!]!

    showDashboard: Dashboard!
  }

  type Mutation {
        updatePeriode(id: ID, name: String!, status: Boolean!): Periode!
        updateConseil(
          id: ID
          title: String!
          description: String!
          image: String
          status: Boolean
        ): Conseil!
        updateConseilItem(
          id: ID
          conseilId: ID!
          periodeId: ID!
          title: String!
          body: String!
          status: Boolean
        ): ConseilItem!
        updateSymptome(
          id: ID
          periodeId: ID!
          title: String!
          name: String
          status: Boolean
        ): Symptome!
        updatePostTag(
          id: ID,
          name: String!
          status: Boolean!
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
          oldPassword: String
          password: String
          isVerified: Boolean
          status: Boolean
          visible: Boolean
          role: String
          username: String
          firstName: String
          lastName: String
          name: String
          gender: String
          avatar: Upload
          address: String
          restore: Boolean
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
        otpValidation(
          credetial: String!
          phoneNumber: String!
          otpCode: String!
        ): User
        uploadFile(file: Upload!): File
    }

    type Subscription {
        newPeriode(periodeId: ID): Periode!
        newPost: Post!
        newComment(postId: ID!): Comment!
        searchPost: PostResult!
        resourcetLiked(
          resourceId: ID!
          model: String!
        ): ResourceLiked!
    }
`;

module.exports = typeDefs
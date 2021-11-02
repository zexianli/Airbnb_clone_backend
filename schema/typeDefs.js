const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    hello: String!
    lodging(id: String!): Lodging
    lodgings: [Lodging]
  }

  type Lodging {
    _id: ID!
    propertyType: String!
    privacyType: String!
    address: Address!
    floorPlan: FloorPlan!
    pricePerDay: Int!
    amenities: [String]
    pictureUrls: [String]
  }

  type Address {
    street: String!
    zipCode: String!
    city: String!
    state: String!
  }

  type FloorPlan {
    guests: Int!
    beds: Int!
    bedrooms: Int!
    bathrooms: Int!
  }

  input AddressInput {
    street: String!
    zipCode: String!
    city: String!
    state: String!
  }

  input FloorPlanInput {
    guests: Int!
    beds: Int!
    bedrooms: Int!
    bathrooms: Int!
  }

  input CreateLodgingInput {
    _id: ID
    propertyType: String!
    privacyType: String!
    address: AddressInput!
    floorPlan: FloorPlanInput!
    pricePerDay: Int = 30
    amenities: [String]
    pictureUrls: [String]
  }

  type Mutation {
    createLodging(input: CreateLodgingInput): Lodging
  }
`;

module.exports = { typeDefs };

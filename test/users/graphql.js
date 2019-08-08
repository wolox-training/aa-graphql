const { gql } = require('apollo-server');

const getUser = id => gql`
    query {
        user(id: ${id}) {
          firstName,
          lastName,
          email
        }
      }`;

const getUsers = () => gql`
  query {
    users {
      firstName
      lastName
      email
    }
  }
`;

const createUser = userInput => ({
  mutation: gql`
    mutation user($firstName: String!, $lastName: String!, $password: String!, $email: String!) {
      user(firstName: $firstName, lastName: $lastName, password: $password, email: $email) {
        firstName
        lastName
        id
        password
        email
      }
    }
  `,
  variables: {
    firstName: userInput.firstName,
    lastName: userInput.lastName,
    password: userInput.password,
    email: userInput.email
  }
});

module.exports = { getUser, getUsers, createUser };

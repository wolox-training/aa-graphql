const { gql } = require('apollo-server');

const createUser = userInput => ({
  mutation: gql`
    mutation user($firstName: String!, $lastName: String!, $password: String!, $email: String!) {
      user(firstName: $firstName, lastName: $lastName, password: $password, email: $email) {
        firstName
        lastName
        name
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

module.exports = { createUser };

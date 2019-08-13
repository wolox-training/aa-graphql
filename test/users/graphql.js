const { gql } = require('apollo-server');

const createUser = userInput => ({
  mutation: gql`
    mutation user($user: UserInput!) {
      user(user: $user) {
        firstName
        lastName
        id
        password
        email
      }
    }
  `,
  variables: {
    user: {
      firstName: userInput.firstName,
      lastName: userInput.lastName,
      password: userInput.password,
      email: userInput.email
    }
  }
});

module.exports = { createUser };

const { gql } = require('apollo-server');

const createUser = userInput => ({
  mutation: gql`
    mutation user($user: UserInput!) {
      user(user: $user) {
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
    user: {
      firstName: userInput.firstName,
      lastName: userInput.lastName,
      password: userInput.password,
      email: userInput.email
    }
  }
});

const logIn = logInInput => ({
  mutation: gql`
    mutation logIn($logIn: LoginInput!) {
      logIn(logIn: $logIn)
    }
  `,
  variables: {
    logIn: logInInput
  }
});

module.exports = { createUser, logIn };

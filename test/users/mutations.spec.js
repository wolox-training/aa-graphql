const { mutate } = require('../server.spec'),
  { createUser } = require('./graphql'),
  userFactory = require('../factories/user');

describe('users', () => {
  describe('mutations', () => {
    it('should create an user successfuly', () => {
      userFactory.attributes({ email: 'ale@wolox.com.ar', password: '123456789' }).then(user => {
        mutate(createUser(user)).then(res => {
          const { firstName, lastName, email, id } = res.data.user;
          expect(firstName).toEqual(user.firstName);
          expect(lastName).toEqual(user.lastName);
          expect(name).toEqual(`${user.firstName} ${user.lastName}`);
          expect(email).toEqual(user.email);
          expect(id).toBeDefined();
        });
      });
    });
    it('should return error', () => {
      mutate(createUser({ notFirstName: 'Pepe', lastName: 1 })).then(res => {
        expect(typeof res.errors).toBe('object');
        expect(res.errors[0].statusCode).toBe('INTERNAL_SERVER_ERROR');
        expect(res.errors[1].statusCode).toBe('INTERNAL_SERVER_ERROR');
        expect(res.errors[2].statusCode).toBe('INTERNAL_SERVER_ERROR');
        expect(res.errors[3].statusCode).toBe('INTERNAL_SERVER_ERROR');
      });
    });
    it('should return not valid format email error', () => {
      userFactory.attributes({ email: 'asdfsdf' }).then(user => {
        mutate(createUser(user)).then(res => {
          expect(res.errors[0].statusCode).toBe(400);
          expect(res.errors[0].message).toBe('No valid format email. It should be example@wolox.com.ar');
        });
      });
    });
    it('should return not wolox email error', () => {
      userFactory.attributes({ email: 'aacevedo@live.com.ar' }).then(user => {
        mutate(createUser(user)).then(res => {
          expect(res.errors[0].statusCode).toBe(400);
          expect(res.errors[0].message).toBe('Not wolox email. It should be example@wolox.com.ar');
        });
      });
    });
    it('should return not alphanumeric password error', () => {
      userFactory.attributes({ email: 'aacevedo@wolox.com.ar', password: '123456789!!' }).then(user => {
        mutate(createUser(user)).then(res => {
          expect(res.errors[0].statusCode).toBe(400);
          expect(res.errors[0].message).toBe('Not alphanumeric password');
        });
      });
    });
    it('should return not long enough password error', () => {
      userFactory.attributes({ email: 'aacevedo@wolox.com.ar', password: '1234' }).then(user => {
        mutate(createUser(user)).then(res => {
          expect(res.errors[0].statusCode).toBe(400);
          expect(res.errors[0].message).toBe('Not long enough password. Minimun length is 8');
        });
      });
    });
  });
});

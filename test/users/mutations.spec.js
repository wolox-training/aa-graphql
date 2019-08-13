const { mutate } = require('../server.spec'),
  { createUser } = require('./graphql'),
  userFactory = require('../factories/user');

describe('users', () => {
  describe('mutations', () => {
    it('should create an user successfuly', async () => {
      const user = await userFactory.attributes({ email: 'ale@wolox.com.ar' });
      const res = await mutate(await createUser(user));
      const { firstName, lastName, email, id } = res.data.user;
      await expect(firstName).toEqual(user.firstName);
      await expect(lastName).toEqual(user.lastName);
      await expect(email).toEqual(user.email);
      await expect(id).toBeDefined();
    });
    it('should return error', async () => {
      const res = await mutate(await createUser({ notFirstName: 'Pepe', lastName: 1 }));
      await expect(typeof res.errors).toBe('object');
      await expect(res.errors[0].statusCode).toBe('INTERNAL_SERVER_ERROR');
      await expect(res.errors[1].statusCode).toBe('INTERNAL_SERVER_ERROR');
      await expect(res.errors[2].statusCode).toBe('INTERNAL_SERVER_ERROR');
      await expect(res.errors[3].statusCode).toBe('INTERNAL_SERVER_ERROR');
    });
    it('should return not valid format email error', async () => {
      const user = await userFactory.attributes({ email: 'asdfsdf' });
      const res = await mutate(await createUser(user));
      await expect(res.errors[0].statusCode).toBe(400);
      await expect(res.errors[0].message).toBe('No valid format email. It should be example@wolox.com.ar');
    });
    it('should return not wolox email error', async () => {
      const user = await userFactory.attributes({ email: 'aacevedo@live.com.ar' });
      const res = await mutate(await createUser(user));
      await expect(res.errors[0].statusCode).toBe(400);
      await expect(res.errors[0].message).toBe('Not wolox email. It should be example@wolox.com.ar');
    });
    it('should return not alphanumeric password error', async () => {
      const user = await userFactory.attributes({ email: 'aacevedo@wolox.com.ar', password: '123456789!!' });
      const res = await mutate(await createUser(user));
      await expect(res.errors[0].statusCode).toBe(400);
      await expect(res.errors[0].message).toBe('Not alphanumeric password');
    });
    it('should return not long enough password error', async () => {
      const user = await userFactory.attributes({ email: 'aacevedo@wolox.com.ar', password: '1234' });
      const res = await mutate(await createUser(user));
      await expect(res.errors[0].statusCode).toBe(400);
      await expect(res.errors[0].message).toBe('Not long enough password. Minimun length is 8');
    });
  });
});

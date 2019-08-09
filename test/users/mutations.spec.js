const { mutate } = require('../server.spec'),
  { createUser, logIn } = require('./graphql'),
  userFactory = require('../factories/user');

describe('users', () => {
  describe('mutations', () => {
    it('should create an user successfuly', async () => {
      const user = await userFactory.attributes({ email: 'ale@wolox.com.ar' });
      const res = await mutate(await createUser(user));
      const { firstName, lastName, name, email, id } = res.data.user;
      await expect(firstName).toEqual(user.firstName);
      await expect(lastName).toEqual(user.lastName);
      await expect(name).toEqual(`${user.firstName} ${user.lastName}`);
      await expect(email).toEqual(user.email);
      await expect(id).toBeDefined();
    });
    it('should log in an user successfuly', async () => {
      const user = await userFactory.attributes({ email: 'random@wolox.com.ar' });
      const res = await mutate(await createUser(user));
      await expect(res.errors).toBe(undefined);
      const token = await mutate(await logIn({ email: user.email, password: user.password }));
      await expect(token.data.logIn).toBeDefined();
    });
    it('should return error', async () => {
      const res = await mutate(await createUser({ notFirstName: 'Pepe', lastName: 1 }));
      await expect(typeof res.errors).toBe('object');
    });
    it('should return an non authorized error', async () => {
      const user = await userFactory.attributes({ email: 'random@wolox.com.ar' });
      const res = await mutate(await createUser(user));
      await expect(res.errors).toBe(undefined);
      const token = await mutate(await logIn({ email: user.email, password: 'userpassword' }));
      await expect(typeof token.errors).toBe('object');
    });
  });
});

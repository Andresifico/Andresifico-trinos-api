const request = require('supertest');

const app = require('../app');

const { generateAccessToken } = require('../src/services/jwt');

const database = require('../src/database');
const { User } = require('../src/database/models');

const COMENTS_PATH = '/coments';

const FIRST_USER = {
  username: 'user1',
  name: 'User 1',
  email: 'user1@test.com',
  password: '12345',
  passwordConfirmation: '12345',
};

const NEW_USER = {
  username: 'myusername',
  name: 'Tester user',
  email: 'tester@test.com',
  password: '1234',
  passwordConfirmation: '1234',
};

describe('Coments routes', () => {
  let firstUserAccessToken;
  let secondUserAccessToken;
  let firstUser;
  let secondUser;

  beforeAll(async () => {
    await database.init();

    firstUser = await User.create(FIRST_USER);
    firstUserAccessToken = generateAccessToken(firstUser.id, firstUser.role);

    secondUser = await User.create(Object.assign(FIRST_USER, { active: false }));
    secondUserAccessToken = generateAccessToken(secondUser.id, secondUser.role);

    const payload = {
      text: 'My tweet 1',
    };
    const payloadcomment = {
      text: 'My coment 1',
    };
    const responsetweet = await request(app).post('/tweets').send(payload).set('Authorization', `bearer ${firstUserAccessToken}`);

    const response = await request(app).post('/tweets/1/coments').send(payloadcomment).set('Authorization', `bearer ${firstUserAccessToken}`);
  });

  it('Should return Access token required on like coment', async () => {
    const response = await request(app).post(`${COMENTS_PATH}/1/likes`);

    expect(response.statusCode).toBe(401);
    expect(response.body.status).toBe('Access token required');

    expect(response.body.data).toBeNull();
  });

  it('Should like coment', async () => {
    const dataComent = {
      id: 1,
      likeCounter: 1,
    };
    const response = await request(app).post(`${COMENTS_PATH}/1/likes`)
      .send(dataComent)
      .set('Authorization', `bearer ${firstUserAccessToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');

    expect(response.body.data.id).toBe(dataComent.id);
    expect(response.body.data.likeCounter).toBe(dataComent.likeCounter);
    expect(response.body.data.createdAt).not.toBeNull();
    expect(response.body.data.updatedAt).not.toBeNull();

    expect(response.body.paginationInfo).toBeNull();
  });

  it('Should return comment not found when like a coment', async () => {
    const payload = {
      id: 0,
    };
    const response = await request(app)
      .post(`${COMENTS_PATH}/0/likes`)
      .send(payload)
      .set('Authorization', `bearer ${firstUserAccessToken}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.status).toBe('Coment not found');
  });

  it('Should delete coment', async () => {
    const dataComent = {
      id: 1,
    };
    const response = await request(app)
      .delete(`${COMENTS_PATH}/1`)
      .send(dataComent)
      .set('Authorization', `bearer ${firstUserAccessToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('success');

    expect(response.body.data).toBeNull();
    expect(response.body.paginationInfo).toBeNull();
  });

  it('Should return Coments not found error on coment delete', async () => {
    const response = await request(app)
      .delete(`${COMENTS_PATH}/2`)
      .set('Authorization', `bearer ${firstUserAccessToken}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.status).toBe('Coment not found');

    expect(response.body.data).toBeNull();
  });

  it('Should return Coment not found', async () => {
    const payload = {
      id: 0,
    };
    const response = await request(app).delete(`${COMENTS_PATH}/1`).send(payload).set('Authorization', `bearer ${firstUserAccessToken}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.status).toBe('Coment not found');

    expect(response.body.data).toBeNull();
  });
});

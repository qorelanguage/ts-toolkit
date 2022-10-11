import dotenv from 'dotenv';
import { QorusAuthenticator } from '../src';
import { QorusRequest } from '../src/QorusRequest';
dotenv.config();

describe('QorusRequest Utility Tests', () => {
  beforeAll(() => {
    QorusAuthenticator.initEndpoint({ url: process.env.ENDPOINT!, id: 'rippy' });
  });

  it('Should make a post request and return the result', async () => {
    const result = await QorusRequest.post({
      path: '/api/latest/public/login',
      data: { user: process.env.TESTUSER, pass: process.env.TESTPASS },
    });
    expect(typeof result?.data.token).toEqual('string');
  });

  it('Should make a get request and return the result', async () => {
    await QorusAuthenticator.login({ user: process.env.TESTUSER, pass: process.env.TESTPASS });

    const result = await QorusRequest.get({
      path: 'api/latest/dataprovider/browse',
      data: { user: process.env.TESTUSER, pass: process.env.TESTPASS },
    });
    expect(result?.data.type).toEqual('nav');
  });

  it('Should make a put request and return the result', async () => {
    if (!QorusAuthenticator.getSelectedEndpoint()?.authToken)
      await QorusAuthenticator.login({ user: process.env.TESTUSER, pass: process.env.TESTPASS });

    const result = await QorusRequest.put({
      path: 'api/latest/dataprovider/browse',
      params: { context: 'api' },
      data: { user: process.env.TESTUSER, pass: process.env.TESTPASS },
    });
    expect(result?.data.type).toEqual('nav');
  });

  // Todo delete request test
});

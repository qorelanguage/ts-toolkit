import dotenv from 'dotenv';
import { QorusAuthenticator, QorusRequest } from '../src';
import ErrorQorusRequest from '../src/managers/error/ErrorQorusRequest';
dotenv.config();

describe('QorusRequest Utility Tests', () => {
  beforeAll(async () => {
    QorusAuthenticator.addEndpoint({
      url: process.env.ENDPOINT!,
      endpointId: 'rippyRequest',
    });
    await QorusAuthenticator.login({
      user: process.env.TESTUSER,
      pass: process.env.TESTPASS,
    });
  });

  it('Should make a post request and return the result', async () => {
    const result = await QorusRequest.post({
      path: '/api/latest/public/login',
      data: { user: process.env.TESTUSER, pass: process.env.TESTPASS },
    });

    expect(typeof result.data.token).toEqual('string');
  });

  it('Should make a get request and return the result', async () => {
    const result = await QorusRequest.get({
      path: '/api/latest/dataprovider/browse',
    });

    expect(result.data.type).toEqual('nav');
  });

  it('Should make a put request and return the result', async () => {
    const result = await QorusRequest.put({
      path: '/api/latest/dataprovider/browse',
      params: { context: 'api' },
    });

    expect(result.data.type).toEqual('nav');
  });

  it('Should return response headers alongside data', async () => {
    const result = await QorusRequest.get({
      path: '/api/latest/dataprovider/browse',
    });

    expect(result.headers).toBeDefined();
    expect(typeof result.headers).toEqual('object');
  });

  it('Should get a forbidden error', async () => {
    try {
      await QorusRequest.get(
        {
          path: '403',
        },
        {
          url: 'https://free.mockerapi.com',
          endpointId: 'forbiddenTest',
        },
      );
    } catch (error) {
      expect(error instanceof ErrorQorusRequest).toBe(true);
    }
  });

  it('Should handle empty error response with fallback error object', async () => {
    try {
      await QorusRequest.get(
        {
          path: '500',
        },
        {
          url: 'https://httpbin.org/status',
          endpointId: 'emptyErrorTest',
        },
      );
      fail('Should have thrown an error');
    } catch (error) {
      expect(error instanceof ErrorQorusRequest).toBe(true);
      expect(error).toBeDefined();
    }
  });

  it('Should correctly concatenate URL and path - base URL without trailing slash, path with leading slash', async () => {
    const result = await QorusRequest.get({
      path: '/api/latest/dataprovider/browse',
    });
    expect(result.data.type).toEqual('nav');
  });

  it('Should handle form-urlencoded body type', async () => {
    const result = await QorusRequest.post({
      path: '/api/latest/public/login',
      data: { user: process.env.TESTUSER, pass: process.env.TESTPASS },
      bodyType: 'form-urlencoded',
    });

    expect(typeof result.data.token).toEqual('string');
  });
});

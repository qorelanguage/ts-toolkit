// First we initialize an Endpoint
await Qorus.QorusAuthenticator.initEndpoint({
  id: 'rippy',
  url: 'https://sandbox.qoretechnologies.com',
  version: 'latest',
});

// Then we authenticate the user for the Selected Endpoint
await Qorus.QorusAuthenticator.login({ user: 'sandbox', pass: 'sandbox' });

// Next we initialize a put request against our defined Qorus server
const result = await Qorus.QorusRequest.put({
  endpointUrl: 'api/latest/dataprovider/browse',
  params: { context: 'api' },
});

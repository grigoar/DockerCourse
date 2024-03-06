const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

app.post('/signup', async (req, res) => {
  // It's just a dummy service - we don't really care for the email
  const email = req.body.email;
  const password = req.body.password;

  if (
    !password ||
    password.trim().length === 0 ||
    !email ||
    email.trim().length === 0
  ) {
    return res
      .status(422)
      .json({ message: 'An email and password needs to be specified!' });
  }

  try {
    console.log(
      'AUTH_SERVICE_SERVICE_HOST: ',
      process.env.AUTH_SERVICE_SERVICE_HOST
    );
    const hashedPW = await axios.get(
      // ? kubernetes generates some ip addresses based on the service name and the port (USERS_SERVICE_SERVICE_HOST exists)
      // `http://${process.env.AUTH_ADDRESS}/hashed-password/` + password
      `http://${process.env.AUTH_SERVICE_SERVICE_HOST}/hashed-password/` +
        password
    );
    // const hashedPW = 'dummy text';
    // since it's a dummy service, we don't really care for the hashed-pw either
    console.log(hashedPW, email);
    res.status(201).json({ message: 'User created!' });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: 'Creating the user failed - please try again later.' });
  }
});

app.post('/login', async (req, res) => {
  // It's just a dummy service - we don't really care for the email
  const email = req.body.email;
  const password = req.body.password;

  if (
    !password ||
    password.trim().length === 0 ||
    !email ||
    email.trim().length === 0
  ) {
    return res
      .status(422)
      .json({ message: 'An email and password needs to be specified!' });
  }

  // normally, we'd find a user by email and grab his/ her ID and hashed password
  const hashedPassword = password + '_hash';
  const response = await axios.get(
    // `http://${process.env.AUTH_ADDRESS}/token/` +
    // ? kubernetes generates some ip addresses based on the service name and the port (USERS_SERVICE_SERVICE_HOST exists)
    `http://${process.env.AUTH_ADDRESS}/token/` +
      hashedPassword +
      '/' +
      password
  );

  // const response = { status: 200, data: { token: 'dummy' } };
  if (response.status === 200) {
    return res.status(200).json({
      token: response.data.token,
      host: JSON.stringify(process.env, null, 2),
    });
  }
  return res.status(response.status).json({ message: 'Logging in failed!' });
});

app.listen(8080);


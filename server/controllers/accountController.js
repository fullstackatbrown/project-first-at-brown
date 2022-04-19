const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const account = require('../models/account');

exports.login = asyncHandler(async (req, res) => {
  const token = req.body.token;
  const result = await account.login(token);
  if (result == null) {
    res.status(401).json({ error: 'Invalid credential' });
  } else {
    const accountId = result.account_id;
    // create jwt
    const jwtoken = jwt.sign({ accountId }, process.env.JWT_KEY);
    res.json({ token: jwtoken, accountId });
  }
});

exports.signup = asyncHandler(async (req, res) => {
  console.log('HI', req.file);
  const filePath = `${process.env.HOSTNAME}/uploads/${req.file.filename}`;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const year = req.body.year;
  const hometown = req.body.hometown;
  const pronouns = req.body.pronouns;
  const bio = req.body.bio;
  const email = req.body.email;
  const token = req.body.token;
  const result = await account.create({
    first_name: firstName,
    last_name: lastName,
    year,
    picture: filePath,
    hometown,
    pronouns,
    bio,
    email,
    token,
  });

  if (result.error) {
    res.status(400).json({ error: result.error });
  } else {
    const accountId = result.account_id;
    const jwtoken = jwt.sign({ accountId }, process.env.JWT_KEY);
    res.status(201).json({ token: jwtoken, accountId });
  }
});

exports.get = asyncHandler(async (req, res) => {
  const accountId = req.params.accountId;
  const result = await account.read(accountId);
  res.json(result);
});

exports.update = asyncHandler(async (req, res) => {
  const accountId = req.accountId;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const year = req.body.year;
  const picture = req.body.picture;
  const hometown = req.body.hometown;
  const pronouns = req.body.pronouns;
  const bio = req.body.bio;

  const result = await account.update(accountId, {
    first_name: firstName,
    last_name: lastName,
    year,
    picture,
    hometown,
    pronouns,
    bio,
  });

  res.json(result);
});

exports.list = asyncHandler(async (req, res) => {
  const accountIds = req.body.accountIds; // array of accountIds
  const result = [];
  for (const id of accountIds) {
    const accountDetails = await account.read(id);
    if (accountDetails != null) {
      result.push(accountDetails);
    }
  }
  res.json(result);
});

exports.setPhoto = asyncHandler(async (req, res) => {
  const filePath = `${process.env.HOSTNAME}/uploads/${req.file.filename}`;
  const result = await account.set(req.accountId, {
    field: 'picture',
    value: filePath,
  });
  res.json(result);
});

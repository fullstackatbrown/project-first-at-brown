const jwt = require("jsonwebtoken");
// const { validationResult } = require("express-validator");

const account = require("../models/account");

exports.login = async (req, res, next) => {
  const token = req.body.token; // TODO: what token is this? jwt?
  // User shouldn't have jwt if logging in though. Or is this related to google signin?

  try {
    // TODO: get userId after creating + is it async?
    const userId = await account.login(token);

    // create jwt
    const jwtoken = jwt.sign({ userId }, process.env.JWT_KEY);

    res.json({ token: jwtoken, userId });
  } catch (error) {
    return next(error);
  }
};

exports.signup = async (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const year = req.body.year;
  const concentration = req.body.concentration;
  const picture = ""; // TODO: upload or url?
  const pronouns = req.body.pronouns;
  const email = req.body.email;

  // TODO: What token should be stored? jwt? Related to google signin?

  try {
    // TODO: Need to get userId after creating (for jwt & frontend) + is it asynchronous?
    const userId = await account.create({
      first_name: firstName,
      last_name: lastName,
      year,
      concentration,
      pronouns,
      email,
    });
    // can use
    const token = jwt.sign({ email, userId }, process.env.JWT_KEY);

    res.status(201).json({ token, userId });
  } catch (err) {
    return next(err);
  }
};

exports.getAccount = async (req, res, next) => {
  const accountId = req.params.accountId;
  try {
    const userId = await account.read(accountId);
  } catch (err) {
    return next(err);
  }
};

exports.editAccount = async (req, res, next) => {
  const accountId = req.params.accountId;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const year = req.body.year;
  const picture = req.body.picture;
  const concentration = req.body.concentration;
  const pronouns = req.body.pronouns;

  try {
    const userId = await account.update({
      first_name: firstName,
      last_name: lastName,
      year,
      picture,
      concentration,
      pronouns,
      accountId,
    });
  } catch (err) {
    return next(err);
  }
};

exports.getAccounts = async (req, res, next) => {
  const accountIds = req.body.accountIds; // array of accountIds
};

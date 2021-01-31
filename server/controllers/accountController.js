exports.login = (req, res, next) => {};

exports.signup = (req, res, next) => {};

exports.getAccount = (req, res, next) => {
  const accountId = req.params.accountId;
};

exports.editAccount = (req, res, next) => {
  const accountId = req.params.accountId;
};

exports.getAccounts = (req, res, next) => {
  const accountIds = req.body.accountIds; // array of accountIds
};

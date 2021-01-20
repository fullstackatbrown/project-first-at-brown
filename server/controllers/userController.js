exports.login = (req, res, next) => {};

exports.signup = (req, res, next) => {};

exports.getUser = (req, res, next) => {
  const userId = req.params.userId;
};

exports.editUser = (req, res, next) => {
  const userId = req.params.userId;
};

exports.getUsers = (req, res, next) => {
  const userIds = req.body.userIds; // array of userIds
};

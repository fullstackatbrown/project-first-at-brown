const connectedAccounts = {};

const registerMessagingHandler = (io, socket) => {
  const accountId = socket.handshake.auth.accountId;
  if (!accountId) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }
  socket.accountId = accountId;
  connectedAccounts[accountId] = socket;
  console.log("connected", accountId);

  // when disconnect
  socket.on("disconnect", () => {
    console.log("disconnected", accountId);
    delete connectedAccounts[socket.accountId];
  });
};

const emitMessage = (accountId, data) => {
  if (connectedAccounts.hasOwnProperty(accountId)) {
    connectedAccounts[accountId].emit("message", data);
  }
};

module.exports = { registerMessagingHandler, emitMessage };

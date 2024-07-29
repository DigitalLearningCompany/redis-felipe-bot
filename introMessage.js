const { bold, fmt } = require("@grammyjs/parse-mode");

const introMessage = (name) => fmt`
👋🏻 ${name}, muito prazer… 
Esta é a mensagem que o usuário irá receber logo ao interagir com o bot
`;

module.exports = introMessage;

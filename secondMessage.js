const { bold, fmt } = require("@grammyjs/parse-mode");

const secondMessage = (name, queuePosition) => fmt`
👋🏻 ${name}, essa mensagem é a de 10 minutos, mas para fins de teste, coloquei para disparar 1 minuto depois

Sua posição na fila é: ${queuePosition}.

`;

module.exports = secondMessage;

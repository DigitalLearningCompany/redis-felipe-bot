const { bold, fmt } = require("@grammyjs/parse-mode");

const thirdMessage = (name, queuePosition) => fmt`
✅ ${name}, essa é a mensagem de 5 em 5 horas, mas por motivos de testes, foi reduzida para 5 minutos

Sua posição na fila é: ${queuePosition}

`;

module.exports = thirdMessage;

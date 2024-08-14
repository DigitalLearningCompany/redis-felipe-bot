const { bold, fmt } = require("@grammyjs/parse-mode");

const introMessage = (name) => fmt`
🎉💰 Parabéns ${name}, agora você terá acesso ao aplicativo Games Lucrativos e irá receber a sua alavancagem particular. ${bold('Veja como funciona')}:

1️⃣✅ Esse bot funciona para te sinalizar em qual lugar da fila de espera da alavancagem você está. ${bold('É rápido')}, fique atento aqui pois quando chegar a sua vez ${bold('EU MESMO')} (Não será um bot) vou te chamar no privado aqui do Telegram! 

2️⃣✅ Eu ${bold('NÃO VOU')} alavancar o seu dinheiro dentro da sua conta se a sua conta não estiver aquecida. Enquanto sua vez não chega na fila de espera, ${bold('aqueça a sua conta usando os sinais do aplicativo Games Lucrativos e vá lucrando e usando a sua conta!')}

3️⃣✅ O lucro é ${bold('GARANTIDO')} pois se eu entrar na sua conta e não conseguir alavancar (isso é muito raro de acontecer) eu vou devolver a sua conta com o valor de saldo inicial que tinha lá dobrado!

⬇️ ${bold('CLIQUE NO BOTÃO ABAIXO')} para entrar no meu grupo VIP e pegar seu: ${bold('Acesso ao aplicativo Games Lucrativos e conseguir assistir a aula onde eu te ensino a usar o app e aquecer a sua conta!')} ⬇️
`;

module.exports = introMessage;

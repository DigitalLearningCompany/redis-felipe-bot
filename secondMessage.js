const { bold, fmt } = require("@grammyjs/parse-mode");

const secondMessage = (name, queuePosition) => fmt`
📲 ${name}, ${bold('sua posição na fila de espera é')}: ${queuePosition} 

🚨 ${bold('Atenção')}: Continue aquecendo a sua conta com o aplicativo Games Lucrativos e sendo um jogador ativo. ${bold('Quanto mais aquecida estiver a sua conta, maior será a alavancagem!')} 

🏆 ${bold('Hack de aquecimento')}: No app clique em “Prêmios” e jogue com o foco de conquistar os prêmios. Assim você irá lucrar mais e a sua conta atingirá o nível máximo de aquecimento para a ${bold('sua alavancagem particular ter o valor multiplicado em até 30X!')}

⬇️ ${bold('CLIQUE NO BOTÃO ABAIXO')} para aprender a aquecer a sua conta, pois se ela não estiver aquecida, você voltará para o final da fila ⬇️
`;

module.exports = secondMessage;

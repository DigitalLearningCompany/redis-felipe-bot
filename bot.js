require("dotenv").config();
const express = require("express");
const { Bot, GrammyError, HttpError, InlineKeyboard } = require("grammy");
const { Queue, Worker } = require("bullmq");
const { ExpressAdapter } = require("@bull-board/express");
const { BullAdapter } = require("@bull-board/api/bullAdapter");
const { createBullBoard } = require("@bull-board/api");
const introMessage = require("./introMessage");
const secondMessage = require("./secondMessage");
const thirdMessage = require("./thirdMessage");

const { BOT_TOKEN, REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

if (!BOT_TOKEN || !REDIS_HOST || !REDIS_PORT || !REDIS_PASSWORD) {
  console.error("Missing environment variables");
  process.exit(1);
}

const bot = new Bot(BOT_TOKEN);
const app = express();

const queue = new Queue("messages", {
  connection: {
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD,
  },
});

const worker = new Worker(
  "messages",
  (job) => {
    try {
      const { chatId, username } = job.data;
      if (job.name === "10-min") {
        const { followUpAfter10Min, queuePosition } = job.data;
        const followUpAfter5h = secondMessage(username, queuePosition);
        bot.api.sendMessage(chatId, followUpAfter10Min.text, {
          reply_markup: new InlineKeyboard()
            .url("QUERO AQUECER MINHA CONTA AGORA!", "https://www.google.com")
            .row(),
          entities: followUpAfter10Min.entities,
        });
        queue.add(
          "5h",
          {
            followUpAfter5h,
            queuePosition: queuePosition - 1,
            username,
            chatId,
          },
          {
            delay: 5 * 60 * 1000,
            removeOnComplete: true,
            jobId: `${chatId}-${queuePosition - 1}`,
          }
        );
      }
      if (job.name === "5h") {
        const { followUpAfter5h, queuePosition, username, chatId } = job.data;
        if (queuePosition < 3) return;
        bot.api.sendMessage(chatId, newMessage.text, {
          reply_markup: new InlineKeyboard()
            .url("QUERO AQUECER MINHA CONTA AGORA!", "https://www.google.com")
            .row(),
          entities: followUpAfter5h.entities,
        });
        queue.add(
          "5h",
          {
            chatId,
            followUpAfter5h: newMessage,
            queuePosition: queuePosition - 1,
            username,
          },
          {
            delay: 5 * 60 * 1000,
            removeOnComplete: true,
            jobId: `${chatId}-${queuePosition - 1}`,
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
  },
  {
    connection: {
      host: REDIS_HOST,
      port: REDIS_PORT,
      password: REDIS_PASSWORD,
    },
  }
);

worker.on("error", (err) => console.error(err));

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [new BullAdapter(queue)],
  serverAdapter: serverAdapter,
});

app.use("/admin/queues", serverAdapter.getRouter());

bot.command("start", (ctx) => {
  const queuePosition = 22;
  const intro = introMessage(ctx.chat.first_name);
  const followUpAfter10Min = secondMessage(ctx.chat.first_name, queuePosition);

  queue.add(
    "10-min",
    {
      chatId: ctx.chat.id,
      followUpAfter10Min,
      queuePosition,
      username: ctx.chat.first_name,
    },
    {
      delay: 10 * 60 * 1000,
      removeOnComplete: true,
      jobId: `${ctx.chat.id}-10min`,
    }
  );

  ctx.api.sendMessage(ctx.chat.id, intro.text, {
    reply_markup: new InlineKeyboard().url(
      "QUERO ENTRAR NO GRUPO VIP E RECEBER O APP!",
      "https://www.google.com"
    ),
    entities: intro.entities,
  });
});

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});

bot.start();
app.listen(3000, () => {
  console.log("[SERVER]: Running on port 3000");
});

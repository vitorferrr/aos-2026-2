import "dotenv/config";
import { env } from "./utils/env.js";
import helmet from "helmet";
import express from "express";
import models, { sequelize } from "./models/index.js";
import routes from "./routes/index.js";
import middlewares from "./middlewares/index.js";

const app = express();

app.set("trust proxy", true);

// middlewares
app.use(helmet());
app.use(middlewares.cors);
app.use(middlewares.limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middlewares.logger);

// rotas
app.get("/", (req, res) => {
  return res.send("Servidor express exectuando...");
});
app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);
app.use("/tarefas", routes.tarefa);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = env.PORT;

const eraseDatabaseOnSync = env.ERASE_DATABASE_ON_SYNC;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages();
  }
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: "rwieruch",
      email: "rwieruch@email.com",
      password: "rwieruch123",
      role: "ADMIN",
      messages: [
        {
          text: "Published the Road to learn React",
        },
      ],
    },
    {
      include: [models.Message],
    },
  );

  await models.User.create(
    {
      username: "ddavids",
      email: "ddavids@email.com",
      password: "ddavids123",
      messages: [
        {
          text: "Happy to release ...",
        },
        {
          text: "Published a complete ...",
        },
      ],
    },
    {
      include: [models.Message],
    },
  );
};

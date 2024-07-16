import config from "./config";
import express from "express";
import router from "./routes/index";
import { requestLogger } from "./middlewares/logger.middleware";
import {
  genericErrorHandler,
  notFoundError,
} from "./middlewares/errorHandler.middleware";

const app = express();

app.use(express.json());

app.use(requestLogger);

app.use(router);

app.use(notFoundError);

app.use(genericErrorHandler);

app.listen(config.PORT, () => {
  console.log(`App listening on PORT : ${config.PORT}`);
});

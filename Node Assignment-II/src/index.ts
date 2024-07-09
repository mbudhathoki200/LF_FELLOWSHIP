import config from "./config";
import express from "express";
import router from "./routes/index";

const app = express();
app.use(express.json());
app.use(router);

app.listen(config.PORT, () => {
  console.log(`App listening on PORT : ${config.PORT}`);
});

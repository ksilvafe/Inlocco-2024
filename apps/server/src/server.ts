import app from "./app";
import env from "./config/env";
import logger from "./config/logger";

const PORT = env.port || 3333;

const onServerRunner = async () => {
  console.info(`Server is running on http://${env.baseUrl}:${PORT}`);
  //logger.info(`Server is running on PORT ${PORT}`);
};

app.listen(PORT, onServerRunner);

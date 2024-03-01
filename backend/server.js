import { logger } from "./application/logging.js";
import { app } from "./application/app.js";

const PORT = process.env.PORT;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

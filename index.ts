import { logger, server } from "./src/configs";

const PORT = 4000;

server.listen(PORT, () => logger.info(`Server running at port: ${PORT}`));

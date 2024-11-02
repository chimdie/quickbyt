import http from 'http';
import { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { DbConnection } from '@/common/db/mongodb';
import { expressInstance } from '@/common/appInstance';
import { corsOptions } from '@/common/config/cors-options';
import { PORT } from '@/common/config';
import { server } from '@/server';

(async (app: Express) => {
  try {
    const dbConnection = new DbConnection();
    await dbConnection.connectToMongoDb();

    app.use(helmet());

    app.use(cors(corsOptions));

    server(app);

    const httpServer = http.createServer(app);

    httpServer.listen(PORT, () => {
      console.log(`API endpoint = http://localhost:${PORT}`);
      console.info(`Server started on port ${PORT}`);
    });

    function gracefulShutdown() {
      httpServer.close(async () => {
        console.log('server is closing....');
        await dbConnection.closeDbConnection();
        console.log('Database closed..');
        process.exit(0);
      });
    }

    process.on('SIGINT', gracefulShutdown);

    process.on('SIGTERM', gracefulShutdown);

    process.on('uncaughtEcxeption', (error) => {
      console.log('--- Uncaught exception ---');
      console.error(error);
      console.log('*** Uncaught exception ***');
      gracefulShutdown();
    });
  } catch (error) {
    console.error({ error });
  }
})(expressInstance);

export { expressInstance };

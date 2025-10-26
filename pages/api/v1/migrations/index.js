import runner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

// api/v1/migrations
export default async function migrations(request, response) {
  const allowedMethods = ["GET", "POST"];
  if (!allowedMethods.includes(request.method)) {
    return response.status(405).json({
      error: `Method "${request.method}" not allowed`,
    });
  }

  let client;
  try {
    client = await database.getConnection();

    const defaultMigrationOptions = {
      dbClient: client,
      dir: join("infra", "migrations"),
      dryRun: true,
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    switch (request.method) {
      case "GET":
        const pendingMigrations = await runner(defaultMigrationOptions);
        return response.status(200).json(pendingMigrations);

      case "POST":
        const executedMigrations = await runner({
          ...defaultMigrationOptions,
          dryRun: false,
        });
        if (executedMigrations.length > 0) {
          return response.status(201).json(executedMigrations);
        }
        return response.status(200).json(executedMigrations);

      default:
        return response.status(405).end();
    }
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await client.end();
  }
}

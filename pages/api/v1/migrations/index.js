import runner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

// api/v1/migrations
export default async function migrations(request, response) {
  const client = await database.getConnection();

  const defaultMigrationOptions = {
    dbClient: client,
    //databaseUrl: process.env.DATABASE_URL,
    dir: join("infra", "migrations"),
    dryRun: true,
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  switch (request.method) {
    case "GET":
      const pendingMigrations = await runner(defaultMigrationOptions);
      await client.end();
      return response.status(200).json(pendingMigrations);

    case "POST":
      const executedMigrations = await runner({
        ...defaultMigrationOptions,
        dryRun: false,
      });
      await client.end();
      if (executedMigrations.length > 0) {
        return response.status(201).json(executedMigrations);
      }
      return response.status(200).json(executedMigrations);

    default:
      await client.end();
      return response.status(405).end();
  }
}

import database from "/infra/database";

// GET: /api/v1/status
async function status(request, response) {
  let queryResult = null;
  const updatedAt = new Date().toISOString();

  queryResult = await database.query("SHOW server_version");
  const serverVersion = queryResult[0].server_version;

  queryResult = await database.query("SHOW max_connections");
  const maxConnections = queryResult[0].max_connections;

  const queryObject = {
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname=$1",
    values: [process.env.POSTGRES_DB],
  };
  queryResult = await database.query(queryObject);
  const connections = queryResult[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: serverVersion,
        max_connections: parseInt(maxConnections),
        connections,
      },
    },
  });
}

export default status;

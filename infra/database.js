import { Client } from "pg";

async function query(queryObject) {
  let client;
  try {
    client = await getConnection();
    const result = await client.query(queryObject);
    return result.rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await client.end();
  }
}

async function getConnection() {
  const client = new Client({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    ssl: getSSLSection(),
  });
  await client.connect();
  return client;
}

function getSSLSection() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }

  return process.env.NODE_ENV === "production" ? true : false;
}

async function clean() {
  await query("DROP schema public cascade; CREATE schema public;");
}

export default {
  query,
  getConnection,
  clean,
};

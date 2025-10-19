import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    ssl: getSSLSection(),
  });

  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result.rows;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await client.end();
  }
}

function getSSLSection() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }

  return process.env.NODE_ENV === "development" ? false : true;
}

export default {
  query: query,
};

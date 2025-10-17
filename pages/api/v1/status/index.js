import database from "/infra/database";

// GET: /api/v1/status
async function status(request, response) {
  console.log(database);
  const result = await database.query("SELECT 1+1 as soma;");
  console.log(result);
  response.status(200).json({
    mensagem: "Hello, World!",
  });
}

export default status;

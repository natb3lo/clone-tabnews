import database from "infra/database";

beforeAll(async () => {
  await database.clean();
});

test("PATCH to api/v1/migrations should return 405", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "PATCH",
  });

  expect(response.status).toBe(405);
});

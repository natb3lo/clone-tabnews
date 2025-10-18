test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  const updatedDate = new Date(responseBody.updated_at).toISOString();
  expect(updatedDate).toEqual(responseBody.updated_at);

  expect(responseBody.dependencies.database.version).toBe("16.10");

  expect(responseBody.dependencies.database.max_connections).toBe(100);

  expect(responseBody.dependencies.database.connections).toBe(1);
});

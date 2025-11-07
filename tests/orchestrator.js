const retry = require("async-retry");

async function waitWebServer() {
  await retry(
    async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      if (response.status != 200) {
        throw Error();
      }
    },
    {
      retries: 100,
      maxTimeout: 1000,
    },
  );
}

const orchestrator = {
  waitWebServer,
};

export default orchestrator;

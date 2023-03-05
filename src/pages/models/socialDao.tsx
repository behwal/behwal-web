const { CosmosClient } = require("@azure/cosmos");

// Initialize Cosmos DB client
const endpoint = process.env.COSMOS_DB_ENDPOINT;
const key = process.env.COSMOS_DB_KEY;
const client = new CosmosClient({ endpoint, key });

// Query your Cosmos DB database
async function queryDatabase() {
  const databaseId = "<your database ID>";
  const containerId = "<your container ID>";

  const database = client.database(databaseId);
  const container = database.container(containerId);

  const query = "SELECT * FROM c";
  const { resources: results } = await container.items.query(query).fetchAll();

  return results;
}
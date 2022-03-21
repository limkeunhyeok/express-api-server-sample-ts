import { getConnection, closeDatabase } from "../../src/lib/database"

let connection;

beforeEach(async () => {
  connection = await getConnection();
});

afterEach(async () => {
  await closeDatabase(connection);
});

import { Response } from "./src/lib/response";
import mongoose from "mongoose"
import { createUser } from "./test/lib/mockup"

(async () => {
  await mongoose.connect(`mongodb://localhost/27017/test`, {
    dbName: "api-sample-ts-test"
  });
  const user = await createUser();
  console.log(user);
})();
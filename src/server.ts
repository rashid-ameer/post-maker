import "dotenv/config";
import { PORT } from "./constants/env";
import app from "./app";
import connectDB from "./lib/db";

// starting the server
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectDB();
});

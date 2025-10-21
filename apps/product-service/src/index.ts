import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.route";
import testRoutes from "./routes/test.route";
import { clerkMiddleware } from "@clerk/express";
import { authMiddleware } from "./middlewares/auth.middleware";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/v1/health", healthRoutes);

app.use("/api/v1/test", authMiddleware, testRoutes);

const PORT = Number(process.env.PORT || 4000);

app.listen(PORT, () => {
  console.log("product-service is listening on PORT: ", PORT);
});

import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.route";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/v1/health", healthRoutes);

const PORT = Number(process.env.PORT || 4000);

app.listen(PORT, () => {
  console.log("product-service is listening on PORT: ", PORT);
});

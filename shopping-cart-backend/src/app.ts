import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes.js";

const app = express();

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  }),
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Shopping Cart Backend API is running!",
  });
});

// Health check
app.get("/api/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Shopping Cart API is running",
  });
});

// Product routes
app.use("/api/products", productRoutes);

// Global error handler
app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Backend error:", error);

  const message =
    error instanceof Error ? error.message : "Something went wrong";

  if (message.toLowerCase().includes("file too large")) {
    res.status(400).json({
      success: false,
      message: "Image must be 5 MB or smaller",
    });
    return;
  }

  res.status(500).json({
    success: false,
    message,
  });
});

export default app;

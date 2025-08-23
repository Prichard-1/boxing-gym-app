import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import plansRoutes from "../plans.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for your frontend
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Plans routes
app.use("/api/plans", plansRoutes);

// Test root
app.get("/", (req, res) => res.send("Backend running 🚀"));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

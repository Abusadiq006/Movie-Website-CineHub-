import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

dotenv.config()

// Middleware
app.use(cors())
app.use(express.json())

// Example API route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from CineHub backend!" })
})

// Serve frontend build
app.use(express.static(path.join(__dirname, "dist")))

// ✅ Express 5 compatible wildcard
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"))
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 CineHub server running on port ${PORT}`))

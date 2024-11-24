const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

const connect = require("./Config/DB");
connect();

const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter  = require("./Routes/auth/auth-routes");
const adminProductsRouter = require('./Routes/admin/products-routes');

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.use("/api/auth", authRouter);

app.use("/api/admin/products", adminProductsRouter);

app.get("/", (req, res) => {
  res.send(
    `New MERN E-commerce web-app Backend Start on PORT No. ${PORT} successfully`
  );
});

app.listen(PORT, () => {
  console.log(`Server App running Successfully PORT No. ${PORT}....`);
});

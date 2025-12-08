import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router_user from "./src/routes/user/index.js";
import router_warning_sent_logs from "@/routes/warning-sent-logs/index.js";
import router_warning from "@/routes/warnings/index.js";
import auth_router from "@/routes/auth/index.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.json({ msg: "Backend funcionando" });
});

app.use("/users", router_user);
app.use("/warnings_logs", router_warning_sent_logs);
app.use("/warnings]", router_warning);
app.use("/auth", auth_router);

app.listen(3001, () => console.log("Backend na 3001"));

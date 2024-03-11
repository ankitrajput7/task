import Express from "express";
const app = Express();
import("./Db.js");
import userRouter from "./routes/userRoute.js";
import cors from "cors";

app.use(Express.json());
app.use(cors());
app.use(Express.urlencoded());

app.use(userRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("server is running");
});

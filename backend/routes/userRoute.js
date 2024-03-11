import Express from "express";
const userRouter = Express.Router();
import sendResponce from "../utils/helper.js";
import dbQuery from "../Db.js";
import jwt from "jsonwebtoken";
// import verifyUser from "../utils/middleware.js";

/**
 * Api for registering user
 */
userRouter.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    let [user] = await dbQuery("select * from users where email=?", [email]);

    if (user) {
      throw new Error("user already registerd.");
    }
    await dbQuery(
      "insert into users (firstName, lastName, email, password) values (?,?,?,?)",
      [firstName, lastName, email, password]
    );

    res.send(sendResponce(201, "New user Registered successfully.", true, []));
  } catch (error) {
    res.send(sendResponce(500, error.message));
  }
});

/**
 * Api for registering user
 */
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let [user] = await dbQuery("select * from users where email=?", [email]);

    if (!user) {
      throw new Error("user is not registerd.");
    }
    if (user?.password !== password) {
      throw new Error("Incorrect password.");
    }

    let token = jwt.sign({ id: user.id }, "Ankit@123", { expiresIn: "12h" });

    res.send(sendResponce(200, "Login successfully.", true, { token }));
  } catch (error) {
    res.send(sendResponce(500, error.message));
  }
});

/**
 * Api for getting user data
 */
userRouter.get("/userData", async (req, res) => {
  try {

    res.send(sendResponce(200, "user data fetched.", true, []));
  } catch (error) {
    res.send(sendResponce(500, error.message));
  }
});

export default userRouter;

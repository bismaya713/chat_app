import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const secureRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const verified = jwt.verify(token, process.env.JWT_TOKEN);
    if (!verified) {
      return res.status(401).json({
        message: "Invalid Token"
      });
    }
    const user = await User.findById(verified.userId).select("-password -__v");
    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(501).json({
      message: "Internal Server Error",
    });
  }
};
export default secureRoute;
// This middleware checks if the user is authenticated by verifying the JWT token.
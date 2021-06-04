import nc from "next-connect";
import connectDB from "../../../config/connectDB";

import {
  getSingleRoom,
  updateRoom,
  deleteRoom,
} from "../../../controllers/roomControllers";

import onError from "../../../middlewares/errors";
import { isAuthenticatedUser } from "../../../middlewares/auth";

const handler = nc({ onError });

connectDB();

handler.get(getSingleRoom);

handler.use(isAuthenticatedUser).put(updateRoom);

handler.use(isAuthenticatedUser).delete(deleteRoom);

export default handler;

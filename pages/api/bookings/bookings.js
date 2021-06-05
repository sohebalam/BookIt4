import nc from "next-connect";
import { newBooking } from "../../../controllers/BookingCont";
import connectDB from "../../../config/connectDB";
import onError from "../../../middlewares/errors";
import { isAuthenticatedUser } from "../../../middlewares/auth";

connectDB();

const handler = nc({ onError });

handler.use(isAuthenticatedUser).post(newBooking);

export default handler;

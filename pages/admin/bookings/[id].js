import { getSession } from "next-auth/client"
import Layout from "../../../components/layout/Layout"
import BookingDetails from "../../../components/booking/BookingDetails"
import { wrapper } from "../../../redux/store"

import { getBookingDetails } from "../../../redux/actions/bookingActions"

const BookingsDetailPage = () => {
  return (
    <Layout title="Booking Details">
      <BookingDetails />
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ req, params, store }) => {
    const session = await getSession({ req })

    if (!session || session.user.role !== "admin") {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      }
    }

    await store.dispatch(getBookingDetails(req.headers.cookie, req, params.id))
  }
)

export default BookingsDetailPage

import { getSession } from "next-auth/client"
import Layout from "../../components/layout/Layout"
import BookingDetails from "../../components/booking/BookingDetails"
import { wrapper } from "../../redux/store"

import { bookingDetails } from "../../redux/actions/bookingActions"

const BookingsPage = () => {
  return (
    <Layout title="My Bookings">
      <BookingDetails />
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ req, params, store }) => {
    const session = await getSession({ req })

    if (!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      }
    }

    await store.dispatch(bookingDetails(req.headers.cookie, req, params.id))
  }
)

export default BookingsPage

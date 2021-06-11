import { getSession } from "next-auth/client"
import Layout from "../../../components/layout/Layout"

import AllUsers from "../../../components/admin/AllUsers"

const allUsersRooms = () => {
  return (
    <Layout title="All Users">
      <AllUsers />
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  if (!session || session.user.role !== "admin") {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default allUsersRooms

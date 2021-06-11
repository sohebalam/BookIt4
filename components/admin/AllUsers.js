import React, { useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"

import { clearErrors, getAllUsers } from "../../redux/actions/userActions"

import { MDBDataTable } from "mdbreact"
import Loader from "../layout/Loader"

const AllUsers = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const allUsers = useSelector((state) => state.allUsers)
  const { loading, error, users } = allUsers

  useEffect(() => {
    dispatch(getAllUsers())
    if (error) {
      toast.error(error)
      dispatch(clearErrors())
    }
  }, [dispatch])

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: "User ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    }
    users &&
      users.forEach((user) => {
        // console.log(user)
        data.rows.push({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          actions: (
            <>
              <Link href={`/admin/users/${user._id}`}>
                <a className="btn btn-primary">
                  <i className="fa fa-pencil"></i>
                </a>
              </Link>
              <button className="btn btn-danger mx-2">
                <i className="fa fa-trash"></i>
              </button>
            </>
          ),
        })
      })
    return data
  }

  //   const deleteUserHandler = (id) => {
  //     dispatch(userDelete(id))
  //   }

  return (
    <div className="container container-fluid">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="my-5">{`${users && users.length} Users`}</h1>
          <MDBDataTable data={setUsers()} className="px-3" bordered striped />
        </>
      )}
    </div>
  )
}

export default AllUsers

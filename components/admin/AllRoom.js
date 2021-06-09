import React, { useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

import { useRouter } from "next/router"

import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"

import { MDBDataTable } from "mdbreact"
import Loader from "../layout/Loader"

import { allAdminRooms, clearErrors } from "../../redux/actions/roomActions"

const AllRoom = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const allAdminRooms = useSelector((state) => state.allAdminRooms)
  const { loading, error, rooms } = allAdminRooms

  useEffect(() => {
    dispatch(allAdminRooms())
    if (error) {
      toast.error(error)
      dispatch(clearErrors())
    }
  }, [dispatch])

  const setRooms = () => {
    const data = {
      columns: [
        {
          label: "Booking ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Check In",
          field: "checkIn",
          sort: "asc",
        },
        {
          label: "Check Out",
          field: "checkOut",
          sort: "asc",
        },
        {
          label: "Amount Paid",
          field: "amount",
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
    bookings &&
      bookings.forEach((booking) => {
        // console.log(booking)
        data.rows.push({
          id: booking._id,
          checkIn: new Date(booking.checkInDate).toLocaleString("en-US"),
          checkOut: new Date(booking.checkOutDate).toLocaleString("en-US"),
          amount: `$${booking.amountPaid}`,
          actions: (
            <>
              {" "}
              <Link href={`/bookings/${booking._id}`}>
                <a className="btn btn-primary">
                  <i className="fa fa-eye"></i>
                </a>
              </Link>
              <button
                className="btn btn-success mx-2"
                onClick={() => downloadInvoice(booking)}
              >
                <i className="fa fa-download"></i>
              </button>
            </>
          ),
        })
      })
    return data
  }

  return (
    <div>
      <h1>AllRoom </h1>
    </div>
  )
}

export default AllRoom

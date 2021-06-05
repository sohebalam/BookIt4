import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

import RoomFeatures from "./RoomFeatures";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Carousel } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// import { clearErrors } from "../../redux/actions/roomActions";

// import {
//   checkBooking,
//   getBookedDates,
// } from "../../redux/actions/bookingActions";
// import { CHECK_BOOKING_RESET } from "../../redux/constants/bookingConstants";

import axios from "axios";

const RoomDetails = () => {
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [daysOfStay, setDaysOfStay] = useState();

  const dispatch = useDispatch();
  const router = useRouter();

  const { user } = useSelector((state) => state.loadUser);
  const { room, error } = useSelector((state) => state.roomDetails);

  const onChange = (dates) => {
    const [checkInDate, checkOutDate] = dates;

    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate);

    if (checkInDate && checkOutDate) {
      // Calclate days of stay

      //   console.log(checkInDate.toISOString(), checkOutDate.toISOString());

      const days = Math.floor(
        (new Date(checkOutDate) - new Date(checkInDate)) / 86400000 + 1
      );

      setDaysOfStay(days);

      //   dispatch(
      //     checkBooking(id, checkInDate.toISOString(), checkOutDate.toISOString())
      //   );
    }
  };
  const { id } = router.query;
  console.log(id);
  const newBookingHandler = async () => {
    const bookingData = {
      room: id,
      checkInDate,
      checkOutDate,
      daysOfStay,
      amountPaid: 90,
      paymentInfo: {
        id: "STRIPE_PAYMENT_ID",
        status: "STRIPE_PAYMENT_STATUS",
      },
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/bookings/bookings`,
        bookingData,
        config
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>{room.name} - BookIT</title>
      </Head>

      <div className="container container-fluid">
        <h2 className="mt-5">{room.name}</h2>
        <p>{room.address}</p>

        <div className="ratings mt-auto mb-3">
          <div className="rating-outer">
            <div
              className="rating-inner"
              style={{ width: `${(room.ratings / 5) * 100}%` }}
            ></div>
          </div>
          <span id="no_of_reviews">({room.numOfReviews} Reviews)</span>
        </div>

        <Carousel hover="pause">
          {room.images &&
            room.images.map((image) => (
              <Carousel.Item key={image.public_id}>
                <div style={{ width: "100%", height: "440px" }}>
                  <Image
                    className="d-block m-auto"
                    src={image.url}
                    alt={room.name}
                    layout="fill"
                  />
                </div>
              </Carousel.Item>
            ))}
        </Carousel>

        <div className="row my-5">
          <div className="col-12 col-md-6 col-lg-8">
            <h3>Description</h3>
            <p>{room.description}</p>

            <RoomFeatures room={room} />
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="booking-card shadow-lg p-4">
              <p className="price-per-night">
                <b>${room.pricePerNight}</b> / night
              </p>

              <hr />

              <p className="mt-5 mb-3">Pick Check In & Check Out Date</p>

              <DatePicker
                className="w-100"
                selected={checkInDate}
                onChange={onChange}
                startDate={checkInDate}
                endDate={checkOutDate}
                minDate={new Date()}
                selectsRange
                inline
              />

              {/* {available === true && (
                <div className="alert alert-success my-3 font-weight-bold">
                  Room is available. Book now.
                </div>
              )}

              {available === false && (
                <div className="alert alert-danger my-3 font-weight-bold">
                  Room not available. Try different dates.
                </div>
              )} */}

              {/* {available && !user && (
                <div className="alert alert-danger my-3 font-weight-bold">
                  Login to book room.
                </div>
              )} */}

              {/* {available && user && (
                <button
                  className="btn btn-block py-3 booking-btn"
                  onClick={() => bookRoom(room._id, room.pricePerNight)}
                  disabled={bookingLoading || paymentLoading ? true : false}
                >
                  Pay - ${daysOfStay * room.pricePerNight}
                </button>
              )} */}

              <button
                className="btn btn-block py-3 booking-btn"
                onClick={newBookingHandler}
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomDetails;

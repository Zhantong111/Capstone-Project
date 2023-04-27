import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";

function Bookingscreen({}) {
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [room, setroom] = useState([]);

  let { roomid } = useParams();
  let [searchParams] = useSearchParams();
  const todate = searchParams.get("to-date");
  const fromdate = searchParams.get("from-date");
  console.log(searchParams);

  const firstdate = moment(fromdate);
  const lastdate = moment(todate);

  const totaldays = moment.duration(lastdate.diff(firstdate)).asDays() + 1;
  const [totalamount, settotalamount] = useState();

  useEffect(() => {
    const getroom = async () => {
      if (!localStorage.getItem("currentUser")) {
        window.location.reload = "/login";
      }
      try {
        setloading(true);
        const data = (await axios.get("/api/rooms/" + roomid)).data;

        settotalamount(data.rentperday * totaldays);
        setroom(data);
        setloading(false);
      } catch (error) {
        seterror(true);
        console.log(error);
        setloading(false);
      }
    };
    getroom();
  }, []);

  async function onToken(token) {
    console.log(token);

    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
      token,
    };

    try {
      setloading(true);
      const result = await axios.post("/api/bookings/bookroom", bookingDetails);
      setloading(false);
      Swal.fire(
        "Congratulations",
        "Your Room Booked Successfuly",
        "success"
      ).then((result) => {
        window.location.href = "/profile";
      });
    } catch (error) {
      setloading(false);
      Swal.fire("Oops", "Something went wrong", "error");
    }
  }

  return (
    <div className="m-5">
      {loading ? (
        <h1>
          <Loader />
        </h1>
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-6">
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} className="bigimg" />
            </div>

            <div className="col-md-6">
              <div style={{ textAlign: "right" }}>
                <h1>Booking Details</h1>
                <hr />

                <b>
                  <p>
                    Name :{" "}
                    {JSON.parse(localStorage.getItem("currentUser")).name}{" "}
                  </p>
                  <p>From Date : {fromdate} </p>
                  <p>To Date : {todate} </p>
                  <p>Max Count : {room.maxcount} </p>
                </b>
              </div>

              <div style={{ textAlign: "right" }}>
                <b>
                  <h1>Amount</h1>
                  <hr />
                  <p>Total days : {totaldays} </p>
                  <p>Rent per day : {room.rentperday}</p>
                  <p>Total Amount : {totalamount}</p>
                </b>
              </div>

              <div style={{ float: "right" }}>
                <StripeCheckout
                  amount={totalamount * 100}
                  token={onToken}
                  currency="SGD"
                  stripeKey="pk_test_51N11BmFI7UrBCBGzrZTkhF4sUl1CIKS08WBO3tZ6ykApcLzaRsZFSi9bo203Fu83EeeyhgeH5TwkZMBxq9zY1Bn3003zfwRbF7"
                >
                  <button className="btn btn-primary">Pay Now</button>
                </StripeCheckout>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Bookingscreen;

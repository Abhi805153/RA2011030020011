import React, { useState, useEffect } from "react"
import axios from "axios"

const TrainList = () => {
  const [trains, setTrains] = useState([])
  useEffect(() => {
    axios
      .request({
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTI3MTU2OTYsImNvbXBhbnlOYW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiMjMwMDI3MjItZWQ1NS00ODRhLWEyYmItODJlN2FiN2VlMGFlIiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IlJBMjAxMTAzMDAyMDAxMSJ9.Usr2N0moQiLlV7_o4uFQ8e7lYebyxXNEyJu_TXSHEes`,
        },
        method: "GET",
        url: "http://20.244.56.144:80/train/trains",
      })
      .then((response) => {
        console.log(response.data)
        setTrains(response.data)
      })
  }, [])

  return (
    <div>
      <h1>Train Schedule</h1>
      <table>
        <thead>
          <tr>
            <th>Train Number</th>
            <th>Departure Time</th>
            <th>Sleeper Seats</th>
            <th>AC Seats</th>
            <th>Sleeper Price</th>
            <th>AC Price</th>
          </tr>
        </thead>
        <tbody>
          {trains.map((train) => (
            <tr key={train.trainNumber}>
              <td>{train.trainNumber}</td>
              <td>{`${train.departureTime.Hours} : ${train.departureTime.Minutes} : ${train.departureTime.Seconds}`}</td>
              <td>{train.seatsAvailable.sleeper}</td>
              <td>{train.seatsAvailable.AC}</td>
              <td>{train.price.sleeper}</td>
              <td>{train.price.AC}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TrainList

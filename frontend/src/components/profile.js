import React, { useEffect, useState } from "react";
import NavBar from "./navbar";
import axios from "axios";

const Profile = () => {
  const [testHistory, setTestHistory] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/getTestHistory/${
          JSON.parse(localStorage.getItem("login")).user_id
        }`
      )
      .then((response) => {
        console.log(response);
        setTestHistory(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <NavBar />
      <div className="container text-center fs-3 m-auto my-4 w-100">
        Test History
      </div>
      <table class="table m-auto w-75 text-center">
        <thead>
          <tr>
            {/* <th scope="col">#</th> */}
            <th scope="col">Paper</th>
            <th scope="col">Year</th>
            <th scope="col">Score</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          {!testHistory
            ? null
            : testHistory.map((test, idx) => (
                <tr key={idx}>
                  {/* <th scope="row">2</th> */}
                  <td>{test.paper_name}</td>
                  <td>{test.year}</td>
                  <td>{test.score}</td>
                  <td>{test.attempt_no}</td>
                </tr>
              ))}
        </tbody>
        {/* <tbody>
          <tr>
            
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            
            <td colspan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody> */}
      </table>
    </>
  );
};

export default Profile;

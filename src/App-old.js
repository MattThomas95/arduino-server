import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [response, setResponse] = useState("");
  const [oldId, setOldId] = useState("");
  const [recentAmount, setRecent] = useState("");
  const [action, setAction] = useState("");
  const options = { method: "GET", headers: { accept: "application/json" } };

  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);
    // 3p9XMiyCYlkZQT28dUGjE1EjfpogTKediFp2xPxc
    console.log("value is:", event.target.value);
  };

  // todo add input field for access_token
  useEffect(() => {
    if(message){
      const interval = setInterval(() => {
        console.log("This will run every 10 seconds!");
        fetch(`https://shielded-bastion-43828.herokuapp.com/https://streamlabs.com/api/v1.0/donations?access_token=${message}`, options)
          .then((response) => response.json())
          .then((response) => {
            setResponse(response);
            console.log("response", response);
          })
          .catch((err) => console.error(err));
      }, 10000);
      return () => clearInterval(interval);

    }
  }, [message]);

  useEffect(() => {
    if (response) {
      const amount = response["data"][0]["amount"];
      const donationId = response["data"][0]["donation_id"];
      console.log(donationId, "id");
      if (donationId !== oldId) {
        console.log(response["data"][0]);

        if (amount >= 15) {
          console.log("SHOOT");
          setAction("SHOOT");
          // Run esp code here
        } else {
          console.log("DONT SHOOT");
          setAction("DONT SHOOT");
        }

        setRecent(amount);
      }
      setOldId(donationId);
      console.log(oldId, "olde");
    }
  }, [response]);

  return (
    <>
      <div className="w-screen h-screen p-10">
        <h1>Arduino Server</h1>
        <div className="flex my-3">
        <h2 className="flex">access_token:</h2>
        <input
        className="border mx-3"
          type="text"
          id="message"
          name="message"
          onChange={handleChange}
          value={message}
        />

        </div>
        <div className="my-3">
          Last Donation Amount {recentAmount} {action}
        </div>
        <ul>{/* {response["data"]} */}</ul>
      </div>
    </>
  );
}

export default App;

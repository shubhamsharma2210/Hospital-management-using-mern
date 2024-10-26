import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Message = () => {
  const [messages, setMessages] = useState([]); // Initialized with an empty array
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4001/api/v1/message/getmessage",
          { withCredentials: true }
        );
        console.log(data); // Check if data is received correctly
        setMessages(data.message || []); // Use `data.message` or fallback to an empty array
      } catch (error) {
        console.log("Error occurred while fetching messages", error);
      }
    };
    fetchMessages();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  // Redirect to login if the user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="page messages">
      <h1>Messages</h1>
      <div className="banner">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div className="card" key={message._id}>
              <div className="details">
                <p>
                  First Name: <span>{message.firstName}</span>
                </p>
                <p>
                  Last Name: <span>{message.lastName}</span>
                </p>
                <p>
                  Email: <span>{message.email}</span>
                </p>
                <p>
                  Phone: <span>{message.phone}</span>
                </p>
                <p>
                  Message: <span>{message.message}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <h1>No Messages Found!</h1>
        )}
      </div>
    </section>
  );
};

export default Message;

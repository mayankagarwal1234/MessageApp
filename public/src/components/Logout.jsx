import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BiPowerOff } from "react-icons/bi";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";

export default function Logout() {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("chat-app-user"));
      const userId = user && user._id;

      if (!userId) {
        localStorage.clear();
        navigate("/login");
        return;
      }

      const { status, data } = await axios.get(`${logoutRoute}/${userId}`);

      if (status === 200) {
        localStorage.clear();
        navigate("/login");
      } else {
        console.error("Logout failed: ", data.msg);
        alert(`Logout failed: ${data.msg}`);
      }
    } catch (error) {
      console.error("An error occurred during logout: ", error);
      alert("An error occurred during logout. Please try again later.");
    }
  };

  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;

import React, { useEffect, useState } from 'react'
import { getAllRoutes } from '../utils/apiRoutes.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components"
import Contacts from '../components/Contacts.jsx';
import Welcome from '../components/Welcome.jsx';
import ChatContainer from '../components/ChatContainer.jsx';

function Chat() {

  const [contacts, setContacts] = useState([]);
  const [currUser, setCurrUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    ; (async function () {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      }
      else {
        let user = await JSON.parse(localStorage.getItem("chat-app-user"));
        setCurrUser(user);
      }
    })()

  }, []);

  useEffect(() => {
    ; (async function () {
      if (currUser) {

        if (currUser.isAvatarImageSet) {

          await axios.get(`${getAllRoutes}/${currUser._id}`)
            .then((data) => {
              setContacts(data.data);
              // console.log(data.data);
              // console.log(contacts);

            }).catch(() => {

            })
        }
        else {
          navigate("/setavatar");
        }
      }

    })();
  }, [currUser])

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };


  return (
    <Container>
      <div className='container'>
        <Contacts contacts={contacts} changeChat={handleChatChange} />

        {
          Object.keys(currentChat).length === 0 ? (<Welcome />) : (<ChatContainer currentChat={currentChat} currUser={currUser}/>)
        }
      
      </div>
    </Container>
  )
}
const Container = styled.div`
      height: 100vh;
      width: 100vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1rem;
      align-items: center;
      background-color: #131324;
      .container {
        height: 85vh;
      width: 85vw;
      background-color: #00000076;
      display: grid;
      grid-template-columns: 25% 75%;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        grid - template - columns: 35% 65%;
    }
  }
      `;
export default Chat
import React, { useEffect, useState } from 'react';
import Chat from './Chat';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Chats({ searchText }) {
  const navigate = useNavigate();
  const [cookie] = useCookies(['access_token']);
  const [info, setInfo] = useState([]);
  const [chatdetails, setChatDetails] = useState([]);
  const [filteredChatdetails, setFilteredDetails] = useState([]);
  
  console.log(cookie.refresh_token);

  useEffect(() => {
    if (!cookie.access_token) {
      navigate('/');
    }
  }, [cookie.access_token]);

  useEffect(() => {
    const getData = async () => {
      const id = cookie.access_token;
      try {
        const res = await axios.get('http://127.0.0.1:8000/chat/get_rooms/', {
          headers: {
            Authorization: 'Bearer ' + id,
          },
        });
        const data = res.data;
        setInfo(data);

        // Collect chat details based on room_type
        const newChatDetails = data.map((chat) => {
          if (chat.room_type === 2) {
            return chat.display_name;
          } else {
            return chat.room_members[1];
          }
        });

        setChatDetails(newChatDetails);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  });

  useEffect(() => {
    const filteredDetails = chatdetails.filter((chatdetail) =>
      chatdetail.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredDetails(filteredDetails);
  }, [chatdetails, searchText]);

  const handleClicked = () => {
    alert('clicked');
  }

  return (
    <div
      style={{
        backgroundColor: '#fff',
        padding: '0 5px',
        overflowY: 'scroll',
        height: '100%',
      }}
      className="custom-scrollbar"
    >
      {filteredChatdetails.map((chatDetail, index) => (
        <div key={index} onClick={handleClicked} >
          <div>
            <Chat name={chatDetail}/>
          </div>
        </div>
      ))}
    </div>
  );
}

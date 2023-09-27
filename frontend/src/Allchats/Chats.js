import React, { useEffect, useState } from 'react';
import Chat from './Chat';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Chats({ searchText, setData}) {
  const navigate = useNavigate();
  const [cookie] = useCookies(['access_token']);
  const [info, setInfo] = useState([]);
  const [chatdetails, setChatDetails] = useState([]);
  const [filteredChatdetails, setFilteredDetails] = useState([]);

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
        console.log(data);
        setInfo(data);
        const newChatDetails = data.map((chat) => {
          if (chat.room_type === 2) {
            return {name: chat.display_name, room_No: chat.room_name, room_Type: chat.room_type};
          } else {
            return {name: chat.room_members[1], room_No: chat.room_name, room_Type: chat.room_type}
          }
        });

        setChatDetails(newChatDetails);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const filteredDetails = chatdetails.filter((chatdetail) =>
      chatdetail.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredDetails(filteredDetails);
  }, [chatdetails, searchText]);

  const handleClicked = () => {
    setData(chatdetails);
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
        <div key={index}  >
          <div>
            <button onClick={handleClicked} className='btn-clicked'>
              <Chat name={chatDetail.name} status={chatDetail.room_type}  />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

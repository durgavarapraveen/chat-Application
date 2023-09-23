import React, { useEffect, useState } from 'react'
import Chat from './Chat'

export default function Chats({searchText}) {
  const chatdetails = [
    {
      name: 'Ameesha',
      Status: 'online',
      imagesrc: 'https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png'
    },
    {
      name: 'John',
      Status: 'offline',
      imagesrc: 'https://e7.pngegg.com/pngimages/670/509/png-clipart-avatar-female-girls-avatar-purple-face.png'
    },
    {
      name: 'Sarah',
      Status: 'away',
      imagesrc: 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png'
    },
    {
      name: 'Mike',
      Status: 'online',
      imagesrc: 'https://i.pinimg.com/474x/4b/d5/d7/4bd5d78656591dbe5868562168adaef3.jpg'
    },
    {
      name: 'Emily',
      Status: 'online',
      imagesrc: 'https://i.pinimg.com/736x/a0/a9/9d/a0a99dbb6f2e31ac936330b500cbbcb2.jpg'
    },
    {
      name: 'David',
      Status: 'offline',
      imagesrc: 'https://e7.pngegg.com/pngimages/670/509/png-clipart-avatar-female-girls-avatar-purple-face.png'
    },
    {
      name: 'Alice',
      Status: 'online',
      imagesrc: 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png'
    },
    {
      name: 'Sophia',
      Status: 'away',
      imagesrc: 'https://i.pinimg.com/474x/4b/d5/d7/4bd5d78656591dbe5868562168adaef3.jpg'
    },
    {
      name: 'Robert',
      Status: 'offline',
      imagesrc: 'https://i.pinimg.com/736x/a0/a9/9d/a0a99dbb6f2e31ac936330b500cbbcb2.jpg'
    },
    {
      name: 'Olivia',
      Status: 'online',
      imagesrc: 'https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png'
    },
    {
      name: 'Michael',
      Status: 'online',
      imagesrc: 'https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png'
    },
    {
      name: 'Emma',
      Status: 'away',
      imagesrc: 'https://i.pinimg.com/736x/a0/a9/9d/a0a99dbb6f2e31ac936330b500cbbcb2.jpg'
    },
    {
      name: 'William',
      Status: 'offline',
      imagesrc: 'https://i.pinimg.com/474x/4b/d5/d7/4bd5d78656591dbe5868562168adaef3.jpg'
    },
    {
      name: 'Michael',
      Status: 'online',
      imagesrc: 'https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png'
    },
    {
      name: 'Emma',
      Status: 'away',
      imagesrc: 'https://i.pinimg.com/736x/a0/a9/9d/a0a99dbb6f2e31ac936330b500cbbcb2.jpg'
    },
    {
      name: 'William',
      Status: 'offline',
      imagesrc: 'https://i.pinimg.com/474x/4b/d5/d7/4bd5d78656591dbe5868562168adaef3.jpg'
    },
    {
      name: 'Michael',
      Status: 'online',
      imagesrc: 'https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png'
    },
    {
      name: 'Emma',
      Status: 'away',
      imagesrc: 'https://i.pinimg.com/736x/a0/a9/9d/a0a99dbb6f2e31ac936330b500cbbcb2.jpg'
    },
    {
      name: 'William',
      Status: 'offline',
      imagesrc: 'https://i.pinimg.com/474x/4b/d5/d7/4bd5d78656591dbe5868562168adaef3.jpg'
    },
    {
      name: 'Michael',
      Status: 'online',
      imagesrc: 'https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png'
    },
    {
      name: 'Emma',
      Status: 'away',
      imagesrc: 'https://i.pinimg.com/736x/a0/a9/9d/a0a99dbb6f2e31ac936330b500cbbcb2.jpg'
    },
    {
      name: 'William',
      Status: 'offline',
      imagesrc: 'https://i.pinimg.com/474x/4b/d5/d7/4bd5d78656591dbe5868562168adaef3.jpg'
    },
  ];
  const [filteredChatdetails, setFilteredDetails] = useState([]);
  useEffect(() => {
    const filtereddetails = chatdetails.filter((chatdetail) =>
      chatdetail.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredDetails(filtereddetails);
  }, [searchText]);
  
  return (
    <div style={{ backgroundColor: '#fff', padding: '0 5px', overflowY: 'scroll', height: '100%' }} className="custom-scrollbar">
      {filteredChatdetails.map((chatdetail,index) => (
        <Chat key={index} name={chatdetail.name} status={chatdetail.Status} imagesrc={chatdetail.imagesrc} />
      ))}
    </div>
  )
}

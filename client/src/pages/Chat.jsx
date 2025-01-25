import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Conversations from "../components/Conversations";
import images from "../constants/images";

const Chat = () => {
  // State to track the active conversation
  const [activeConversation, setActiveConversation] = useState(null);

  // Mock conversation data
  const conversations = [
    { id: 1, name: "Conversation 1" },
    { id: 2, name: "Conversation 2" },
    { id: 3, name: "Conversation 3" },
  ];

  const [isActive, setIsActive] = useState(true);
  return (
    <div className="flex gap-1 bg-gray-50">
      <Sidebar />
      <div className="flex gap-1">
        <div className="flex flex-col bg-white p-6 gap-6">
          <h3 className="font-bold text-2xl">Chats</h3>
          <input
            type="text"
            placeholder="Search Messages..."
            className="border rounded px-4 py-2 w-[300px]"
          />
          <div className="flex flex-col gap-1">
            {conversations.map((conversation) => (
              <Conversations
                key={conversation.id}
                isActive={activeConversation === conversation.id}
                onClick={() => setActiveConversation(conversation.id)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 p-5 bg-white w-[67vw] h-[10vh] items-center">
            <img
              src={images.farmerMan}
              className="w-10 h-10 rounded-full"
              alt=""
            />
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold">Arpan Karki</h2>
              {isActive ? (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-300"></div>
                  Online
                </div>
              ) : (
                <div className="w-2 h-2 rounded-full bg-red -300"></div>
              )}
            </div>
          </div>

          <div className="w-full bg-white h-[80vh]"></div>

          <div className="h-[8vh] bg-white items-center flex gap-4">
            <div className="flex gap-6 p-8">
              <div>icons</div>
              <div>icons</div>
              <div>icons</div>
              <div>icons</div>
            </div>

            <input
              type="text"
              placeholder="Type your message here....."
              className=" bg-gray-200 px-4 py-3 w-[850px] rounded-xl"
            />

            <button className="bg-[#2D775C] px-6 py-2.5 rounded-2xl text-white font-bold">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

import React, { useState, useEffect, useRef } from "react";
import AppNavbar from "../../components/AppNavbar";
import { Input, Spinner } from "@nextui-org/react";
import { MdOutlineDelete } from "react-icons/md";

import {
  CAHTS_COLLECTION_ID,
  DATABASE_ID,
  client,
  databases,
} from "../../config/appwriteConfig";
import { AppwriteException, ID, Models } from "appwrite";
import { userStore } from "../../state/userStore";
import { useParams } from "react-router-dom";
import { chatStore } from "../../state/chatsStore";

const ChatSection = () => {
  const { id } = useParams();
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15];
  const user = userStore(
    (state) => state.user
  ) as Models.User<Models.Preferences>;
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const chatState = chatStore();

  const isFetched = useRef(false);

  useEffect(() => {
    if (!isFetched.current) {
      fetchMessages();

      client.subscribe(
        `databases.${DATABASE_ID}.collections.${CAHTS_COLLECTION_ID}.documents`,
        (response) => {
          console.log(response);
          // Showing realtime chats
          const payload = response.payload as Models.Document;

          if (
            response.events.includes(
              "databases.*.collections.*.documents.*.create"
            )
          ) {
            if (user.$id != payload["user_id"]) {
              chatState.addChat(payload);
            }
          }else if(response.events.includes("databases.*.collections.*.documents.*.delete")){
            chatState.deleteChat(payload.$id)
          }
        }
      );

      isFetched.current = true;
    }
  }, []);

  // * To handle submit
  const SendMessage = (event: React.FormEvent) => {
    event.preventDefault();

    databases
      .createDocument(DATABASE_ID, CAHTS_COLLECTION_ID, ID.unique(), {
        message: message,
        user_id: user.$id,
        community_id: id,
        name: user.name,
      })
      .then((res) => {
        chatState.addChat(res);
        setMessage("");
      })
      .catch((err: AppwriteException) => {
        console.log(err.message);
      });
  };
  // * To Fetch Messages
  const fetchMessages = () => {
    setLoading(true);
    databases
      .listDocuments(DATABASE_ID, CAHTS_COLLECTION_ID)
      .then((res) => {
        setLoading(false);
        chatState.addChats(res.documents);
      })
      .catch((res: AppwriteException) => {
        setLoading(false);
        console.error(res.message);
      });
  };
  // Delete Messages
  const deleteMessages = (id: string) => {
    databases
      .deleteDocument(DATABASE_ID, CAHTS_COLLECTION_ID, id)
      .then((res) => {
        chatState.deleteChat(id);
      })
      .catch((res: AppwriteException) => {
        console.error(res.message);
      });
  };

  return (
    <div className="">
      <AppNavbar />
      <div className="text-center">{loading && <Spinner color="danger" />}</div>
      <div className="flex flex-col">
        {/* Show all messages here */}
        <div className="flex-1 p-4 md-20">
          {chatState.chats.length > 0 &&
            chatState.chats.map((item) => {
              return (
                <>
                  <div className="w-[89%] mx-auto mt-6">
                    {item["user_id"] === user.$id ? (
                      <div className="flex justify-end mb-2" key={item.$id}>
                        <div className="bg-red-200 px-6 py-2 max-w-lg rounded-lg">
                          <h1 className="font-bold">{item["name"]}</h1>
                          <h1>{item["message"]}</h1>
                          <div
                            className="flex justify-end cursor-pointer"
                            onClick={() => deleteMessages(item.$id)}
                          >
                            <div className="w-6 h-6 rounded-full flex justify-center items-center  bg-white mt-2">
                              <MdOutlineDelete className=" text-red-400 " />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-start mb-2" key={item.$id}>
                        <div className="bg-red-400 px-6 py-2 max-w-lg rounded-lg">
                          <h1 className="font-bold">{item["name"]}</h1>
                          <h1>{item["message"]}</h1>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              );
            })}
        </div>

        {/* Input Box */}
        <div className="p-4 bottom-0 left-0 right-0 bg-white fixed">
          <form onSubmit={SendMessage}>
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                label="Type message..."
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;

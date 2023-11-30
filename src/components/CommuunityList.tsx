import React, { useEffect, useRef, useState } from "react";
import {
  COMMUNITY_COLLECTION_ID,
  DATABASE_ID,
  databases,
} from "../config/appwriteConfig";
import { AppwriteException, Query } from "appwrite";
import { communityStore } from "../state/communityStore";
import { Button, Card, CardBody, Spinner } from "@nextui-org/react";
import { Link } from "react-router-dom";

const CommuunityList = () => {
  const isDataFetched = useRef(false);
  const [loading, setLoading] = useState(false);
  const communityState = communityStore();

  useEffect(() => {
    if (!isDataFetched.current) {
      setLoading(true);
      databases
        .listDocuments(DATABASE_ID, COMMUNITY_COLLECTION_ID, [
          Query.select(["$id", "name"]),
        ])
        .then((res) => {
          console.log("the data is fetched", res.documents);
          setLoading(false);
          communityState.addCommunities(res.documents);
        })
        .catch((err: AppwriteException) => {
          console.log("Error fetching data", err.message);
          setLoading(false);
        });

      isDataFetched.current = true;
    }
  }, []);
  return (
    <div>
      <div className="text-center">{loading && <Spinner color="danger" />}</div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 px-20 ">
        {communityState.communities.length > 0 &&
          communityState.communities.map((item) => {
            return (
              <Card key={item.$id}>
                <CardBody>
                  <h1 className="text-xl font-bold "> {item["name"]}</h1>
                  <p className="py-3">Found more people in this community</p>
                  <Link to={`/chats/${item.$id}`}>
                    <Button color="danger" className="w-full">
                      Chat
                    </Button>
                  </Link>
                </CardBody>
              </Card>
            );
          })}
      </div>

      {communityState.communities.length < 0 && (
        <div className="text-center">
          <h1 className="text-danger-400 font-bold text-2xl">
            No Community Found
          </h1>
          <p>Be the first one to create unique communtiy</p>
        </div>
      )}
    </div>
  );
};

export default CommuunityList;

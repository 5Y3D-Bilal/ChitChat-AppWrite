import { useEffect, useRef } from "react";
import { account } from "./config/appwriteConfig";
import { userStore } from "./state/userStore";
import { useNavigate } from "react-router-dom";
import AppNavbar from "./components/AppNavbar";
import CreateCommunity from "./components/CreateCommunity";
import CommuunityList from "./components/CommuunityList";

const App = () => {
  const isRendred = useRef<boolean>(false);
  const userState = userStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isRendred.current) {
      account
        .get()
        .then((res) => {
          userState.updateUser(res);
        })
        .catch(() => {
          userState.resetState();
          navigate("/login");
          console.log("the erorr is");
        });
      isRendred.current = true;
    }
  }, []);
  return (
    <>
      <div className="h-[100vh]">
        <AppNavbar />
        <div className="pt-20 pr-20">
          <div className="flex justify-end">
            <CreateCommunity />
          </div>
        </div>
        <CommuunityList />
      </div>
    </>
  );
};

export default App;

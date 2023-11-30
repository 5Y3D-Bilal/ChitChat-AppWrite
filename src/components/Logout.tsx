import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { account } from "../config/appwriteConfig";
import { userStore } from "../state/userStore";
import { AppwriteException, Models } from "appwrite";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@nextui-org/react";

export default function Logout() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const session = userStore((state) => state.userSession) as Models.Session;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    setLoading(true);
    account
      .deleteSession(session.$id)
      .then(() => {
        setLoading(false);
        navigate("/login");
      })
      .catch((err: AppwriteException) => {
        setLoading(false);
        console.log(err.message);
      });
  };

  return (
    <>
      <Button onPress={onOpen} color="danger" variant="flat">
        logout
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1>Logout</h1>
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to logout.</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Close
                </Button>
                <Button color="danger" onPress={logout} disabled={loading}>
                  {loading ? <Spinner size="sm" /> : "Logout"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

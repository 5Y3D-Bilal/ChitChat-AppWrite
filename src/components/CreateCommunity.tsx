import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Spinner,
} from "@nextui-org/react";
import {
  databases,
  DATABASE_ID,
  COMMUNITY_COLLECTION_ID,
} from "../config/appwriteConfig";
import { AppwriteException, ID } from "appwrite";
import { communityStore } from "../state/communityStore";

export default function CreateCommunity() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const communityState = communityStore();

  const handlesumbit = () => {
    setLoading(true);
    databases
      .createDocument(DATABASE_ID, COMMUNITY_COLLECTION_ID, ID.unique(), {
        name: name,
      })
      .then((res) => {
        communityState.addCommunity(res);
        setLoading(false);
        console.log(res);
      })
      .catch((err: AppwriteException) => {
        setLoading(false);
        console.log(err.message);
      });
  };

  return (
    <>
      <Button onPress={onOpen} color="danger">
        Create Community
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Community
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Community Name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="danger"
                  onPress={handlesumbit}
                  disabled={loading}
                  type="submit"
                >
                  {loading ? <Spinner /> : "Create"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

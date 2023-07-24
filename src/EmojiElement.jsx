import {
  Card,
  CardHeader,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useClipboard,
  useDisclosure,
} from "@chakra-ui/react";
// import { useState } from "react";
import { HiOutlineClipboardCopy } from "react-icons/hi";

const EmojiElement = ({ name, htmlCode, unicode, group, category }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onCopy: onHTMLCopy } = useClipboard(htmlCode);
  const { onCopy: onUniCopy } = useClipboard(`Unicode: ${unicode}`);

  return (
    <Card
      onClick={onOpen}
      variant={"elevated"}
      overflowWrap={"break-word"}
      w={{ sm: "100px", lg: "200px" }}
      color="black.400"
      borderRadius="xl"
      overflow="hidden"
      p="4"
      flexWrap={"wrap"}
      m={{ base: "3", lg: "10" }}
      textAlign="center"
      cursor="pointer"
      background={"whiteAlpha.300"}
      _hover={{ bg: "whiteAlpha.400", shadow: "lg" }}
      _active={{ bg: "whiteAlpha.400", shadow: "lg" }}
      // onDoubleClick={onCopy}
    >
      <CardHeader fontSize={"xl"}>
        <span dangerouslySetInnerHTML={{ __html: htmlCode }} />
      </CardHeader>
      <Text fontSize="sm" fontWeight="bold">
        {name.split(/≊|,/)[0].trim()}
      </Text>
      {/* <Text>{category}</Text> */}

      <Modal isOpen={isOpen} onClose={onClose} size={"xs"} isCentered="true">
        <ModalOverlay />
        <ModalContent background={"blue.100"} color={"blackAlpha"}>
          <ModalHeader fontSize="80px" margin={"20px"}>
            <Center>
              {" "}
              <span dangerouslySetInnerHTML={{ __html: htmlCode }} />{" "}
            </Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody padding={"20px"}>
            <Text>
              <strong>Name:</strong> {name}
            </Text>
            <Text>
              <strong>Category:</strong> {category}
            </Text>
            <Text>
              {" "}
              <strong>Group</strong>: {group}
            </Text>
            <Text role="img" cursor={"pointer"} onClick={onHTMLCopy}>
              <strong>HTML Code:</strong>
              <span
                style={{
                  color: "blackAlpha.600",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {htmlCode}
                <HiOutlineClipboardCopy style={{ marginLeft: "5px" }} />
              </span>
            </Text>
            <Text cursor={"pointer"} onClick={onUniCopy}>
              <strong>UNICODE : </strong>
              <span style={{ display: "flex", alignItems: "center" }}>
                {unicode}{" "}
                <HiOutlineClipboardCopy style={{ marginLeft: "5px" }} />
              </span>
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default EmojiElement;

// &#128517;
// Unicode: \uU+1F605
// &#128513;
// Unicode: U+1F601

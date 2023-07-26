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
      w={"250px"}
      color="black.400"
      borderRadius="xl"
      overflow="hidden"
      p="2"
      flexWrap={"wrap"}
      m={{ base: "auto", lg: "6" }}
      textAlign="center"
      cursor="pointer"
      mt={"5"}
      background={"whiteAlpha.300"}
      _hover={{ bg: "whiteAlpha.400", shadow: "lg" }}
      _active={{ bg: "whiteAlpha.400", shadow: "lg" }}
      // onDoubleClick={onCopy}
    >
      <CardHeader fontSize={"lg"}>
        <span
          style={{ fontSize: "60px" }}
          dangerouslySetInnerHTML={{ __html: htmlCode }}
        />
      </CardHeader>
      <Text fontSize="sm" fontWeight="bold">
        {name.split(/≊|,/)[0].trim()}
      </Text>
      {/* <Text>{category}</Text> */}

      <Modal isOpen={isOpen} onClose={onClose} size={"xs"} isCentered="true">
        <ModalOverlay />
        <ModalContent
          py={"4"}
          borderRadius="50px"
          background={"lightblue"}
          // color={"gray"}
        >
          <ModalHeader overflow={"hidden"} fontSize="80px" p={"20px"}>
            <Center>
              <span
                style={{
                  background: "#C2DEDC",
                  borderRadius: "90px",
                  margin: "5px",
                  padding: "12px 15px",
                }}
                dangerouslySetInnerHTML={{ __html: htmlCode }}
              />{" "}
            </Center>
          </ModalHeader>
          <ModalCloseButton m={"3"} />
          <ModalBody textAlign={"center"} paddingLeft={"40px"}>
            <Text>
              <strong>Name:</strong> {name}
            </Text>
            <Text>
              <strong>Category:</strong> {category}
            </Text>
            <Text>
              {" "}
              <strong>Group: </strong> {group}
            </Text>
            <Text role="img" cursor={"pointer"} onClick={onHTMLCopy}>
              <strong>HTML Code: </strong>
              <span
              // style={{
              //   color: "brown",
              //   display: "flex",
              //   alignItems: "center",
              // }}
              >
                {htmlCode}
                <HiOutlineClipboardCopy
                  style={{ display: "inline", marginLeft: "5px" }}
                />
              </span>
            </Text>
            <Text cursor={"pointer"} onClick={onUniCopy}>
              <strong>UNICODE: </strong>
              <span>
                {unicode}{" "}
                <HiOutlineClipboardCopy
                  style={{ display: "inline", marginLeft: "5px" }}
                />
              </span>
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default EmojiElement;

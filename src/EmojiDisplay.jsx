import React, { useEffect, useState } from "react";
import EmojiElement from "./EmojiElement";
import { Button, Flex, Input, Select, Text } from "@chakra-ui/react";

const EmojiDisplay = () => {
  const [emojiData, setEmojiData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  //category handled
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };
  //keyword handled
  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
    setCurrentPage(1);
  };

  //filtering original emojii json based on selected category
  const filteredEmojis =
    selectedCategory === "All"
      ? emojiData
      : emojiData.filter((emoji) => emoji.category === selectedCategory);

  //filtering data further based on the Input
  const searchedEmojis = filteredEmojis.filter(
    (emoji) =>
      emoji.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      emoji.category.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      emoji.group.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  //pagination
  const emojisPerPage = 10;
  const indexOfLastEmoji = currentPage * emojisPerPage;
  const indexOfFirstEmoji = indexOfLastEmoji - emojisPerPage;
  const currentEmojis = searchedEmojis.slice(
    indexOfFirstEmoji,
    indexOfLastEmoji
  );

  const maxPaginationButtons = 5;
  const totalPages = Math.ceil(searchedEmojis.length / emojisPerPage);
  let startPage = Math.max(
    currentPage - Math.floor(maxPaginationButtons / 2),
    1
  );
  let endPage = Math.min(startPage + maxPaginationButtons - 1, totalPages);

  if (endPage - startPage + 1 < maxPaginationButtons) {
    startPage = Math.max(endPage - maxPaginationButtons + 1, 1);
  }

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //fetching data in json and updating the data state
  const fetchEmojiData = () => {
    fetch("https://emojihub.yurace.pro/api/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((jsonData) => {
        setEmojiData(jsonData);
      })
      .catch((error) => {
        console.error("Error:", error);
        setEmojiData([]); // Clear emoji data in case of an error.
      });
  };

  //new unique category array
  const uniqueCategories = [
    ...new Set(emojiData.map((emoji) => emoji.category)),
  ];

  useEffect(() => {
    fetchEmojiData();
  }, []);

  return (
    <Flex
      background={"lightblue"}
      flexDirection={"column"}
      // wrap="wrap"
      // justifyContent={"center"}
      padding={"10px"}
    >
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        // wrap="wrap"
        width={"100%"}
        justifyContent={{base:"space-around", md:"space-between"}}
        // padding={"8px"}
        px={{ base: "10px", md: "20px" }}
        // ml={"20px"}
        // mr={"20px"}
        // m={{base:"20"}}
        // pr={"50px"}
        // background={"red"}
      >
        <Select
          // display={"block"}
          size={{base:"md", md:"lg"}}
          minW={{ base: "200px", md:"300px", lg: "400px" }}
          width={{ base: "400px", md:"300px", lg: "300px" }}
          borderRadius={"40px"}
          value={selectedCategory}
          ml={{base:"2", md:"0"}}
          onChange={handleCategoryChange}
          background={"whiteAlpha.400"}
          mb={{ base: "10px", md: "0" }}
        >
          <option value="All">All Category</option>

          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
        <Input
          ml={{base:"2", md:"0"}}
          background={"whiteAlpha.400"}
          placeholder="Search emojis..."
          value={searchKeyword}
          onChange={handleSearchChange}
          size={{base:"md", md:"lg"}}
          minW={{ base: "200px", md: "300px", lg:"400px", }}
          borderRadius={"40px"}
          w={{ base: "400px", md: "300px", lg:"400px" }}
          mr="5"
          // mb={""}
        />
      </Flex>
      <Flex wrap="wrap">
        {currentEmojis.length === 0 ? (
          <Flex
            height="80vh"
            width={"100%"}
            alignItems="center"
            justifyContent={"center"}
          >
            <Text fontSize="xl">No matching emojis found.</Text>
          </Flex>
        ) : (
          currentEmojis.map((emoji, index) => (
            <EmojiElement
              key={index}
              name={emoji.name}
              category={emoji.category}
              group={emoji.group}
              htmlCode={emoji.htmlCode[0]}
              unicode={emoji.unicode[0]}
            />
          ))
        )}
      </Flex>

      {searchedEmojis.length > emojisPerPage && (
        <Flex
          justifyContent="center"
          // marginY={"20"}
          marginX={"0"}
          p={"5"}
          position="fixed"
          bottom="0"
          left="0"
          background="lightblue"
          right="0"
        >
          <Button
            mx="1"
            size="sm"
            colorScheme="teal"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt; Prev
          </Button>
          {Array.from({ length: endPage - startPage + 1 }).map((_, index) => (
            <Button
              key={startPage + index}
              mx="1"
              size="sm"
              color={"black"}
              colorScheme={
                startPage + index === currentPage ? "teal" : "whiteAlpha"
              }
              onClick={() => handlePageChange(startPage + index)}
            >
              {startPage + index}
            </Button>
          ))}
          <Button
            mx="1"
            size="sm"
            colorScheme="teal"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next &gt;
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default EmojiDisplay;

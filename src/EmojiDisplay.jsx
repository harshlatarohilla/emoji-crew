import React, { useEffect, useState } from "react";
import EmojiElement from "./EmojiElement";
import { Box, Flex, Input, Select, Text } from "@chakra-ui/react";

const EmojiDisplay = () => {
  const [emojiData, setEmojiData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };
  const filteredEmojis =
    selectedCategory === "All"
      ? emojiData
      : emojiData.filter((emoji) => emoji.category === selectedCategory);

  const searchedEmojis = filteredEmojis.filter(
    (emoji) =>
      emoji.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      emoji.category.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      emoji.group.toLowerCase().includes(searchKeyword.toLowerCase())
  );

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
      padding={"20px"}
    >
      <Flex
        flexDirection={"row"}
        wrap="wrap"
        width={"100%"}
        justifyContent={"center"}
        padding={"20px"}
      >
        <Select
          display={"block"}
          size={"md"}
          width={"20%"}
          borderRadius={"40px"}
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="All">All Category</option>
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
        <Input
          placeholder="Search emojis..."
          value={searchKeyword}
          onChange={handleSearchChange}
          size="md"
          borderRadius={"40px"}
          w={"40%"}
          ml="2"
          mb={"8"}
        />
      </Flex>
      <Flex wrap="wrap">
        {searchedEmojis.length === 0 ? (
          <Flex
            height="80vh"
            width={"100%"}
            alignItems="center"
            justifyContent={"center"}
          >
            <Text fontSize="xl">No matching emojis found.</Text>
          </Flex>
        ) : (
          searchedEmojis.map((emoji, index) => (
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
    </Flex>
  );
};

export default EmojiDisplay;

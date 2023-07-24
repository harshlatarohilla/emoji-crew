# Emoji Browser

Emoji Browser is a React web application that allows users to conveniently list and browse emojis. It fetches emoji data from a web API and displays the emojis in a paginated list. Users can filter emojis by category and search for emojis based on keywords. The application uses Chakra UI for designing the emoji cards and provides a copy-to-clipboard functionality for the HTML code of each emoji.

## Features

- Fetches emoji data from a web API and displays emojis in a paginated list.
- Allows users to filter emojis by category using a dropdown select.
- Enables users to search for emojis based on keywords using a search bar.
- Provides emoji cards with information like name, category, and HTML code.
- Allows users to copy the HTML code of each emoji to the clipboard by clicking on it.
- Implements pagination for displaying 10 emojis per page and provides navigation buttons.

## Installation

1. Clone the repository to your local machine:

```
git clone https://github.com/your-username/emoji-browser.git
```

2. Navigate to the project directory:

```
cd emoji-browser
```

3. Install the dependencies using npm or yarn:

```
npm install
```
or
```
yarn install
```

## Usage

1. Run the development server:

```
npm start
```
or
```
yarn start
```

2. The application will be accessible at `http://localhost:3000` in your web browser.

3. Use the search bar to enter keywords and filter emojis based on your search.

4. Use the category dropdown to select specific emoji categories.

5. Click on the HTML code of an emoji card to copy it to the clipboard.

6. Navigate through different pages of emojis using the pagination buttons.

## Technologies Used

- React
- Chakra UI
- Axios (for fetching data from the API)
- React Icons (for displaying icons)

## API Used

- EmojiHub API: `https://emojihub.yurace.pro/api`

## Contributing

Contributions to the Emoji Browser project are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.

## License

The Emoji Browser project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.
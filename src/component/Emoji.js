import React, { useState } from "react";
import Picker from "emoji-picker-react";
// import EmojiPicker from "emoji-picker-react";

export default function Emoji() {
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  return (
    <div>
      {chosenEmoji ? (
        <div>
          Your Ename: {chosenEmoji.name}
          Your Emoji: {chosenEmoji.emoji}
        </div>
      ) : (
        <span>No Emoji</span>
      )}
      <Picker onEmojiClick={onEmojiClick}  />
    </div>
  );
}

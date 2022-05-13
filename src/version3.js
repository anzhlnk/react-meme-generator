import './App.css';
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';

export default function MemeGenerator() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [customerTemplate, setCustomerTemplate] = useState('');

  const [image, setImage] = useState(
    `https://api.memegen.link/images/${customerTemplate}/${topText}/${bottomText}.png`,
  );

  useEffect(() => {
    if (topText && bottomText && customerTemplate) {
      setImage(
        `https://api.memegen.link/images/${customerTemplate}/${topText}/${bottomText}.png`,
      );
    } else if (topText && !bottomText && customerTemplate) {
      setImage(
        `https://api.memegen.link/images/${customerTemplate}/${topText}.png`,
      );
    } else if (!topText && bottomText && customerTemplate) {
      setImage(
        `https://api.memegen.link/images/${customerTemplate}/ /${bottomText}.png`,
      );
    } else if (topText && bottomText && !customerTemplate) {
      setImage(
        `https://api.memegen.link/images/grumpycat/${topText}/${bottomText}.png`,
      );
    } else if (topText && !bottomText && !customerTemplate) {
      setImage(`https://api.memegen.link/images/grumpycat/${topText}/.png`);
    } else if (!topText && bottomText && !customerTemplate) {
      setImage(`https://api.memegen.link/images/grumpycat/ /${bottomText}.png`);
    } else if (!topText && !bottomText && !customerTemplate) {
      setImage(`https://api.memegen.link/images/grumpycat.png`);
    } else {
      setImage(`https://api.memegen.link/images/${customerTemplate}.png`);
    }
  }, [topText, bottomText, customerTemplate]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log('submitted');
      }}
    >
      {/* Customer template */}
      <br />
      {/* Top text */}
      <label>
        Top text{' '}
        <input
          placeholder="Add Top Text"
          value={topText}
          onChange={(event) => {
            setTopText(event.target.value);
          }}
        />
        {/* Top text reset button */}
        <button
          className="button-4"
          onClick={() => {
            setTopText('');
          }}
        >
          Reset
        </button>
      </label>
      <br />
      {/* Bottom text */}
      <label>
        Bottom text
        <input
          placeholder="Add Bottom Text"
          value={bottomText}
          onChange={(event) => {
            setBottomText(event.target.value);
          }}
        />
        {/* Bottom text  reset button */}
        <button
          className="button-4"
          onClick={() => {
            setBottomText('');
          }}
        >
          Reset
        </button>
      </label>
      <label>
        Meme template
        <input
          name="image"
          placeholder="Add template"
          value={customerTemplate}
          onChange={(event) => {
            setCustomerTemplate(event.target.value);
          }}
        />
        {/* Customer Template reset button */}
        <button
          className="button-4"
          onClick={() => {
            setCustomerTemplate('');
          }}
        >
          Reset
        </button>
      </label>

      {/* Download button */}

      <img src={image} alt="meme" data-test-id="meme-image" />
      <button
        className="button-4"
        onClick={() => {
          saveAs(image, 'your meme.jpg');
        }}
      >
        Download
      </button>
      {console.log(image)}
    </form>
  );
}

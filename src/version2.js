/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';

export default function MemeGenerator() {
  const [text, setText] = useState({
    topText: '',
    bottomText: '',
  });
  const [customerTemplate, setCustomerTemplate] = useState('');
  const [image, setImage] = useState(
    'https://api.memegen.link/images/grumpycat.png',
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log('submitted');
      }}
    >
      <label>
        Top text{' '}
        <input
          name="topText"
          placeholder="Add Top Text"
          onChange={(event) => {
            setText({
              ...text,
              [event.target.name]: event.target.value,
            });
          }}
          value={text.topText}
        />
      </label>
      <br />
      <br />
      <label>
        Bottom text
        <input
          name="bottomText"
          placeholder="Add Bottom Text"
          onChange={(event) => {
            setText({
              ...text,
              [event.target.name]: event.target.value,
            });
          }}
          value={text.bottomText}
        />
      </label>
      <br />
      <br />
      <label>
        Meme template
        <input
          name="image"
          placeholder="Add template"
          onChange={(event) => {
            setCustomerTemplate(event.target.value);
          }}
        />
      </label>
      <button>Generate</button>
      <button>Download</button>
      <br />
      <img src={image} alt="meme" />
    </form>
  );
}

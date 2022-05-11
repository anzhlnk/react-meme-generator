/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';

export default function MemeGenerator() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [randomImg, setRandomImg] = useState('');
  const [allData, setAllData] = useState([]);
  const arrayOfLinks = [];

  useEffect(() => {
    fetch('https://api.memegen.link/templates')
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setAllData(response);
      })
      .catch(() => {
        return 'Error';
      });
  }, []);

  for (let i = 0; i < allData.length; i++) {
    arrayOfLinks.push(allData[i].blank);
  }

  const image = arrayOfLinks[Math.floor(Math.random() * arrayOfLinks.length)];

  console.log(image);

  return (
    <>
      <label>
        Top text{' '}
        <input
          type="text"
          name="topText"
          placeholder="Add Top Text"
          onChange={(event) => {
            setTopText(event.currentTarget.value);
          }}
          value={topText}
        />
        {topText}{' '}
      </label>
      <br />
      <br />
      <label>
        Bottom text
        <input
          type="text"
          name="bottomText"
          placeholder="Add Bottom Text"
          onChange={(event) => {
            setBottomText(event.currentTarget.value);
          }}
          value={bottomText}
        />
        {bottomText}
      </label>
      <br />
      <br />
      <label>
        Meme template
        <input
          type="text"
          name="image"
          placeholder="Add template"
          onChange={(event) => {
            setRandomImg(event.currentTarget.value);
          }}
          value={randomImg}
        />
        {randomImg}
      </label>
      <button>Generate</button>
      <img src={image} alt="meme" />
    </>
  );
}

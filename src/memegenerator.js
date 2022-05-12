/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';

export default function MemeGenerator() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [allData, setAllData] = useState([]);
  const arrayOfLinks = [];
  const [customerTemplate, setCustomerTemplate] = useState('');

  //Version1
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

  const [image, setImage] = useState(
    'https://api.memegen.link/images/grumpycat/Hi/there!.png',
  );

  console.log(image);

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
          placeholder="Add Top Text"
          onChange={(event) => {
            setTopText(event.target.value);
          }}
          value={topText}
        />
      </label>
      <br />
      <br />
      <label>
        Bottom text
        <input
          placeholder="Add Bottom Text"
          onChange={(event) => {
            setBottomText(event.target.value);
          }}
          value={bottomText}
        />
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
            setCustomerTemplate(event.target.value);
          }}
        />
      </label>
      <button
        onClick={() => {
          customerTemplate === ''
            ? setImage(
                arrayOfLinks[Math.floor(Math.random() * arrayOfLinks.length)],
              )
            : setImage(
                `https://api.memegen.link/images/${customerTemplate}/ ${topText}/ ${bottomText}.png`,
              );
        }}
      >
        Generate
      </button>
      <button>Download</button>
      <br />
      <img src={image} alt="meme" />
    </form>
  );
}

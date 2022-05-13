import './App.css';
import { saveAs } from 'file-saver';
/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';

export default function MemeGenerator() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [allData, setAllData] = useState([]);
  const arrayOfLinks = [];
  const [customerTemplate, setCustomerTemplate] = useState('');

  // For the random meme generator
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

  const random = arrayOfLinks[Math.floor(Math.random() * arrayOfLinks.length)];

  console.log(image);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log('submitted');
      }}
    >
      {/* Top text */}
      <label>
        Top text{' '}
        <input
          placeholder="Add Top Text"
          onChange={(event) => {
            setTopText(event.target.value);
          }}
          value={topText}
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
      <br />
      {/* Bottom text */}
      <label>
        Bottom text
        <input
          placeholder="Add Bottom Text"
          onChange={(event) => {
            setBottomText(event.target.value);
          }}
          value={bottomText}
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
        {/* Customer template */}
      </label>
      <br />
      <br />
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
      {/* Generate button */}
      <button
        className="button-4"
        onClick={() => {
          customerTemplate === ''
            ? setImage(
                random.slice(0, random.length - 4) +
                  `/ ${topText}/ ${bottomText}.png`,
              )
            : setImage(
                `https://api.memegen.link/images/${customerTemplate}/ ${topText}/ ${bottomText}.png`,
              );
        }}
      >
        Generate
      </button>
      {/* Download button */}
      <button
        className="button-4"
        onClick={() => {
          saveAs(image, 'your meme.jpg');
        }}
      >
        Download
      </button>
      <br />
      <img src={image} alt="meme" />
    </form>
  );
}

import './App.css';
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';

export default function MemeGenerator() {
  const [topText, setTopText] = useState('Hi');
  const [bottomText, setBottomText] = useState('there');
  const [allData, setAllData] = useState([]);
  const arrayOfLinks = [];
  const [customerTemplate, setCustomerTemplate] = useState('grumpycat');

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
    `https://api.memegen.link/images/grumpycat/hi/there.png`,
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
          value={topText}
          onChange={(event) => {
            const newTopText = event.target.value;
            setTopText(newTopText);
            setImage(
              `https://api.memegen.link/images/${customerTemplate}/ ${topText}/ ${bottomText}.png`,
            );
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
      <br />
      {/* Bottom text */}
      <label>
        Bottom text
        <input
          placeholder="Add Bottom Text"
          value={bottomText}
          onChange={(event) => {
            const newBottom = event.target.value;
            setBottomText(newBottom);
            setImage(
              `https://api.memegen.link/images/${customerTemplate}/ ${topText}/ ${bottomText}.png`,
            );
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
            const newTemplate = event.target.value;
            setCustomerTemplate(newTemplate);
            setImage(
              `https://api.memegen.link/images/${customerTemplate}/ ${topText}/ ${bottomText}.png`,
            );
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
          customerTemplate === '' &&
            setImage(
              random.slice(0, random.length - 4) +
                `/ ${topText}/ ${bottomText}.png`,
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
      <img src={image} alt="meme" data-test-id="meme-image" />
    </form>
  );
}

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
  const [allData, setAllData] = useState([]);

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

  useEffect(() => {
    setImage(
      `https://api.memegen.link/images/${
        customerTemplate ? customerTemplate : 'grumpycat'
      }/${topText ? topText : ' '}/${bottomText ? bottomText : ''}.png`,
    );
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
          className="button"
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
          className="button"
          onClick={() => {
            setBottomText('');
          }}
        >
          Reset
        </button>
        <br />
        <br />
      </label>
      <label>
        Meme template
        <input
          list="allmemes"
          name="image"
          placeholder="Add template"
          value={customerTemplate}
          onChange={(event) => {
            setCustomerTemplate(event.target.value);
          }}
        />
        <datalist id="allmemes">
          {allData.map((element) => {
            return <option key={element['id']} value={element['id']} />;
          })}
        </datalist>
        {/* Customer Template reset button */}
        <button
          className="button"
          onClick={() => {
            setCustomerTemplate('');
          }}
        >
          Reset
        </button>
      </label>
      <br />
      <button
        className="button"
        onClick={() => {
          setCustomerTemplate(
            allData[Math.floor(Math.random() * allData.length)]['id'],
          );
        }}
      >
        Random
      </button>

      <img src={image} alt="meme" data-test-id="meme-image" />

      {/* Download button */}
      <button
        className="button"
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

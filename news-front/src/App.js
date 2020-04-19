import React, { useState, useEffect } from 'react';
import axios from 'axios';
function App() {

  const [data, setData] = useState({Items: []});

  useEffect(() => {  
    const fetchPhotos = async() => {
      fetch('https://et63potkt6.execute-api.us-east-1.amazonaws.com/dev/hello')
      .then(function(response) {
        return response.json();
      }).then(function(data) {
        console.log(data); 
        setData(data);
      });
    }
    fetchPhotos();
  }, []);

  return (
    <div className="articles">
    {data.Items.map(newsItem => {
      return newsItem.item.data !== undefined ? 
      <article key={newsItem.guid}>
        <a href={newsItem.item.data.link}><h1>{newsItem.item.data.title}</h1></a>
        <p>{newsItem.item.data.contentSnippet}</p>
        <div className="date">{newsItem.item.data.pubDate}</div>

        {newsItem.item.data.enclosure !== undefined && (
          <img className="enclosure" src={newsItem.item.data.enclosure.url}></img>
        )}
      </article>
      : 
      <div>empty</div>
    })}
      
      
    </div>
  );
}
export default App;
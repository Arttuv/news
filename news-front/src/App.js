import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './components/layout'
import BorderedTitle from './components/bordered-title'

/* For a given date, get the ISO week number
 *
 * Based on information at:
 *
 *    http://www.merlyn.demon.co.uk/weekcalc.htm#WNR
 *
 * Algorithm is to find nearest thursday, it's year
 * is the year of the week number. Then get weeks
 * between that date and the first day of that year.
 *
 * Note that dates in one year can be weeks of previous
 * or next year, overlap is up to 3 days.
 *
 * e.g. 2014/12/29 is Monday in week  1 of 2015
 *      2012/1/1   is Sunday in week 52 of 2011
 */
function getWeekNumber(d) {
  // Copy date so don't modify original
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
  // Get first day of year
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  // Calculate full weeks to nearest Thursday
  var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
  // Return array of year and week number
  return [d.getUTCFullYear(), weekNo];
}

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
    <div>
      <Layout>
      <BorderedTitle title= { "Viikko " + getWeekNumber(new Date())[1]}/>
      <div className="articles">
      {data.Items.map(newsItem => {
        return newsItem.item.data !== undefined ? 

        <article key={newsItem.guid}>
                    {newsItem.item.data.enclosure !== undefined && (
            <img className="enclosure" src={newsItem.item.data.enclosure.url}></img>
          )}
          <div className="source">Yle</div>
          <a href={newsItem.item.data.link}><h1>{newsItem.item.data.title}</h1></a>
          <p>{newsItem.item.data.contentSnippet}</p>
        </article>
        : 
        <div>empty</div>
        
      })}
      </div>
      </Layout>
    </div>
  );
}
export default App;




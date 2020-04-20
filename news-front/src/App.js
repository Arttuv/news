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

function getTopCategories(data) {

  let categories = new Map();

  data.Items.forEach( item => {


    /** 
     * Looks like the first category is the "real one". 
    */
    var category = item.item.data.categories[0];
    if (categories.get(category) === undefined) {
      categories.set(category, 1);
      console.log("Setting  " + category + " to 1");
    } else {
      categories.set(category, categories.get(category) + 1);
      console.log("Setting  " + category + " to " + categories.get(category));
    }

    /*item.item.data.categories.forEach(category => {
      if (categories.get(category) === undefined) {
        categories.set(category, 1);
        console.log("Setting  " + category + " to 1");
      } else {
        categories.set(category, categories.get(category) + 1);
        console.log("Setting  " + category + " to " + categories.get(category));
      }
    })*/

  });


  categories.forEach( (key, value, map) => {
    console.log(key + " " + value);
  });

  let categoryTags = Array.from(categories.keys());
  console.log("First hit: " + categoryTags[0]);

  let sortedCategoryTags = categoryTags.sort(( a, b) => {
    console.log("Sorting " + a + " to " + b + " " + categories.get(a) + " " + categories.get(b));
    return categories.get(b) - categories.get(a);
  });

  console.log("Top hit: " + sortedCategoryTags[0] + " " + categories.get(sortedCategoryTags[0]));

  return {"categories": categories, "sortedTags": sortedCategoryTags}
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

  const sortCategories = getTopCategories(data);

  return (
    <div>
      <Layout>
      <BorderedTitle title= { "Viikko " + getWeekNumber(new Date())[1]}/>
      <div className="weekSummary">
        
      {sortCategories.sortedTags.map(category => {

        return (
            <div><a href={"#" + category}>{category} {sortCategories.categories.get(category)}</a></div>
        )
        })}


      </div>

      <div className="articlesByCategories">
    
        {sortCategories.sortedTags.map(category => {

          return (
          <div className="categoryNews">
            <div className="categoryHeading">
              <a name={category}><h1 className="categoryHeadingTitle">{category}</h1></a>
              <div />
            </div>
            <div className="categoryNewsArticles"> 
              {data.Items.map(newsItem => {
                return ( (newsItem.item.data !== undefined) && (newsItem.item.data.weekNumber[1] === getWeekNumber(new Date())[1]) && (newsItem.item.data.categories[0] === category)) ? 
                <article key={newsItem.guid}>
                  <div className="articleInfo">
                    <div className="source">Yle</div>
                  </div>
                  <a href={newsItem.item.data.link}><h1>{newsItem.item.data.title}</h1></a>
                  <p className="articleSummary">{newsItem.item.data.contentSnippet}</p>
                  {newsItem.item.data.enclosure !== undefined && (
                    <div className="articleCoverContainer">
                      <img className="articleCover" src={newsItem.item.data.enclosure.url}></img>
                    </div>
                  )}
                </article>
                : 
                null
                
              })}
            </div>
            </div>
          )
        })}

      </div>
      </Layout>
    </div>
  );
}
export default App;




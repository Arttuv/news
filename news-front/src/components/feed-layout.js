/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import BorderedTitle from './bordered-title'

import Header from "./header"
import "./layout.css"

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
  
  function getTopCategories(data, feedName, weekNumber) {
  
    let categories = new Map();
  
    data.Items.forEach( item => {
        console.log(item);

        if (item.item.data.feedName.localeCompare(feedName) === 0 && 
           item.item.data.weekNumber[1] === weekNumber[1]) {
            /** 
             * Looks like the first category is the "real one". 
             */
            item.item.data.categories.forEach(category => {
                if (categories.get(category) === undefined) {
                    categories.set(category, 1);
                } else {
                    categories.set(category, categories.get(category) + 1);
                }    
            })
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
      return categories.get(b) - categories.get(a);
    });
  
    console.log("Top hit: " + sortedCategoryTags[0] + " " + categories.get(sortedCategoryTags[0]));
  
    return {"categories": categories, "sortedTags": sortedCategoryTags}
  }

const FeedLayout = ({ data, feedName }) => {
  
    const sortCategories = getTopCategories(data, feedName, getWeekNumber(new Date()));
    const usedArticles = [];

    const colors = new Map();
  
    var counter = 0;
    sortCategories.sortedTags.slice(4).forEach( category => {
      colors.set(category, "#355C7D");
    })
  
    colors.set(sortCategories.sortedTags[0], "#F8B195");
    colors.set(sortCategories.sortedTags[1], "#F67280");
    colors.set(sortCategories.sortedTags[2], "#C06C84");
    colors.set(sortCategories.sortedTags[3], "#6C5B7B");
    colors.set(sortCategories.sortedTags[4], "#355C7D");
  
    const categoryTags = new Map();
    sortCategories.sortedTags.forEach( (item, index) => {
      categoryTags.set(item, "category-" + index);
    })
  
    // style = {{backgroundColor: colors.get(category)}
  
    return (
      <div>
        <BorderedTitle title= { "Viikko " + getWeekNumber(new Date())[1] + " " + feedName}/>
        <div className="weekSummary">
          
        {sortCategories.sortedTags.map(category => {
  
          return (
              <div key={feedName + "category#" + category}><a href={"#" + feedName + category}>{category}</a></div>
          )
          })}
  
        </div>
  
        <div className="articlesByCategories">
      
          {sortCategories.sortedTags.map(category => {
  
            return (
            <div key={"categorynews#" + category} className={"categoryNews " + categoryTags.get(category)}>
              <div className={"categoryHeading " + categoryTags.get(category)} >
                <a id={feedName + category} className=" categoryTag"><h1 className="categoryHeadingTitle">{category}</h1></a>
                <div />
              </div>
              <div className="categoryNewsArticles"> 
                {data.Items.map(newsItem => {
                    return ( (newsItem.item.data !== undefined) && 
                        (newsItem.item.data.weekNumber[1] === getWeekNumber(new Date())[1]) && 
                        (newsItem.item.data.categories.includes(category)) &&
                        (newsItem.item.data.feedName.localeCompare(feedName) === 0) &&
                        (!usedArticles.includes(newsItem.guid))
                        ) ? 
                        
                    <article key={newsItem.guid}>
                        {usedArticles.push(newsItem.guid)}
                        {console.log("Adding + " + newsItem.item.data.categories[0])}
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
      </div>
    );
}

export default FeedLayout;

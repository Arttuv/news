import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './components/layout'
import BorderedTitle from './components/bordered-title'
import FeedLayout from './components/feed-layout'
import CategorizedLayout from './components/categorized-layout';

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
  let categoryAssignments = new Map();

  data.Items.forEach( item => {
    item.item.data.assigned = false;
    /** 
     * Looks like the first category is the "real one". 
     */
    item.item.data.categories.slice(0, 2).forEach( category => {
      if (categories.get(category) === undefined) {
        categories.set(category, 1);
        console.log("Setting  " + category + " to 1");
      } else {
        categories.set(category, categories.get(category) + 1);
        console.log("Setting  " + category + " to " + categories.get(category));
      }
    });
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


  data.Items.forEach( item => {
    item.categoryWeight = 0;

    item.item.data.categories.forEach( category => {
      item.categoryWeight += categories.get(category);
    })

  });

  let itemsSortedByWeight = Array.from(data.Items).sort( (a,b) => {
    return a.categoryWeight - b.categoryWeight;
  });

  console.log("Category weights: ");
  itemsSortedByWeight.forEach(item => {
    console.log(item.item.data.title + " " + item.categoryWeight);
  })

  sortedCategoryTags.forEach( category => {
    let categoryAssignment = {};
    categoryAssignment.assignedNews = [];
    categoryAssignment.weight = categories.get(category);
    categoryAssignment.demand = 4;
    categoryAssignment.category = category;
    categoryAssignments.set(category, categoryAssignment);
  });

  console.log("Assignments")

  itemsSortedByWeight.forEach( item => {

    sortedCategoryTags.forEach( category => {

      if (categories.get(category) > Math.min(data.Items.length / 10, 1)) {
        if ((item.item.data.categories.includes(category)) && (item.item.data.assigned !==true)) {
          
          var categoryAssignment = categoryAssignments.get(category);
          
          if (categoryAssignment.assignedNews.length < categoryAssignment.demand) {

            item.item.data.assigned = true;
            categoryAssignment.assignedNews.push(item);
  
          }
          
        }
    }

    });

  });

  
  itemsSortedByWeight.forEach( item => {

    sortedCategoryTags.forEach( category => {
      if (categories.get(category) > Math.max(data.Items.length / 25, 2)) {

        if ((item.item.data.categories.includes(category)) && (item.item.data.assigned !==true)) {
          
          var categoryAssignment = categoryAssignments.get(category);
          
          if (categoryAssignment.assignedNews.length < categoryAssignment.demand) {

            item.item.data.assigned = true;
            categoryAssignment.assignedNews.push(item);
  
          }
        }
      }

    });

  });

  categoryAssignments.forEach( (value, key, map) => {
    console.log(key + ": ");
    value.assignedNews.forEach( item => {
      item.item.sizeCategory = "size-" + value.assignedNews.length;
      console.log(item.item.data.title);
    });
  });

  return {"categories": categories, "sortedTags": sortedCategoryTags, "categoryAssignments": categoryAssignments}
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
      <Layout>
        {sortCategories.categoryAssignments !== undefined &&
          <CategorizedLayout data={sortCategories} feedName="Kaikki"/>
        }
        
      </Layout>
    </div>
  );
}
export default App;



/*
<FeedLayout data={data} feedName="Yle Pääuutiset" />
        <FeedLayout data={data} feedName="Yle Tiede" />
        <FeedLayout data={data} feedName="Yle Luonto" />
*/
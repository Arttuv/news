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
    item.item.data.categories.forEach( category => {
      if (categories.get(category) === undefined) {
        categories.set(category, 1);
        //console.log("Setting  " + category + " to 1");
      } else {
        categories.set(category, categories.get(category) + 1);
        //console.log("Setting  " + category + " to " + categories.get(category));
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
    //console.log(key + " " + value);
  });

  let categoryTags = Array.from(categories.keys());
  //console.log("First hit: " + categoryTags[0]);

  let sortedCategoryTags = categoryTags.sort(( a, b) => {
    return categories.get(b) - categories.get(a);
  });

  //console.log("Top hit: " + sortedCategoryTags[0] + " " + categories.get(sortedCategoryTags[0]));

  data.Items.forEach( item => {
    item.item.categoryWeight = 0;

    item.item.data.categories.forEach( category => {
      item.item.categoryWeight += categories.get(category);
    })

  });

  let itemsSortedByWeight = Array.from(data.Items).sort( (a,b) => {
    return a.item.categoryWeight - b.item.categoryWeight;
  });

  

  let tenPercent = (data.Items.length * 0.1);
  let twentyPercent = (data.Items.length * 0.2);
  let thirtyPercent = (data.Items.length * 0.3);

  //console.log("Category weights: ");

  itemsSortedByWeight.forEach( (item, index ) => {

    let perc = (index / data.Items.length) * 100;
    item.item.weightCategory = "weightCategoryPercentage-" + String(perc).charAt(0);
    console.log(item.item.data.title + " " + item.item.categoryWeight);
  })

  sortedCategoryTags.forEach( category => {
    let categoryAssignment = {};
    categoryAssignment.assignedNews = [];
    categoryAssignment.weight = categories.get(category);
    categoryAssignment.demand = 4;
    categoryAssignment.category = category;
    categoryAssignments.set(category, categoryAssignment);
  });

  //console.log("Assignments")

  itemsSortedByWeight.forEach( item => {

    sortedCategoryTags.forEach( category => {

      if (categories.get(category) > Math.min(data.Items.length / 15, 1)) {
        if ((item.item.data.categories.includes(category)) && (item.item.data.assigned !==true)) {
          
          var categoryAssignment = categoryAssignments.get(category);
          
          if (categoryAssignment.assignedNews.length < categoryAssignment.demand) {

            item.item.data.assigned = true;
            if( item.item.data.categories[0].localeCompare(category) !== 0 ) {
              item.item.displayCategory = item.item.data.categories[0];
            } else {
              item.item.displayCategory = item.item.data.categories[1];
            }
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

  /*itemsSortedByWeight.slice().reverse().forEach( item => {

    sortedCategoryTags.slice().forEach( category => {

        if ((item.item.data.categories.includes(category)) && (item.item.data.assigned !==true)) {
          
          var categoryAssignment = categoryAssignments.get(category);
          
          if (categoryAssignment.assignedNews.length < categoryAssignment.demand) {

            item.item.data.assigned = true;
            categoryAssignment.assignedNews.push(item);
  
          }
        }

    });

  });*/

  console.log("Items not assigned:");
  itemsSortedByWeight.forEach( item => {

    if( item.item.data.assigned !== true ) {
      console.log(item.item.data.title);
      console.log(item.item.data.categories);
    }

  });

  categoryAssignments.forEach( (value, key, map) => {
    //console.log(key + ": ");
    let totalCategoryWeight = 0;
    value.assignedNews.forEach( item => {
      item.item.sizeCategory = "size-" + value.assignedNews.length;
      totalCategoryWeight += item.item.categoryWeight;
      //console.log(item.item.data.title);
    });
    value.totalCategoryWeight = totalCategoryWeight;
    value.assignedNews.forEach( item => {
      if (value.minWeight === undefined || item.item.categoryWeight < value.minWeight) {
        value.minWeight = item.item.categoryWeight;
      }
    });
  });

  let categoryValuesSorted = Array.from(categoryAssignments.values());
  categoryValuesSorted = categoryValuesSorted.filter( a => a.assignedNews.length > 0);
  categoryValuesSorted = categoryValuesSorted.sort( (a, b) => {
    return a.minWeight - b.minWeight;
  });
  
  categoryValuesSorted.forEach( (value, index) => {
    let pers = (index / categoryValuesSorted.length) * 100;
    value.minWeightPercentage = "minWeightCategoryPercentage-" + String(pers).charAt(0);
  });

  return {"categories": categories, "sortedTags": sortedCategoryTags, "categoryAssignments": categoryAssignments}
}

function App() {

  const [data, setData] = useState({Items: []});
  
  useEffect(() => {  
    const fetchNews = async() => {
      fetch('https://xglupt6p4k.execute-api.us-east-1.amazonaws.com/dev/getNews')
      .then(function(response) {
        return response.json();
      }).then(function(data) {
        //console.log(data); 
        setData(data);
      });
    }
    fetchNews();
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

  let onlyCategoryAssignments = [...sortCategories.categoryAssignments.values()];

  onlyCategoryAssignments = onlyCategoryAssignments.filter( cat => {
      return cat.assignedNews.length > 0
    });
  onlyCategoryAssignments = onlyCategoryAssignments.sort( (a, b) => {

    return a.minWeightPercentage - b.minWeightPercentage;

  });

  let blockCount = onlyCategoryAssignments.length / 6;
  let limitsList = [];
  for( var i = 0; i < blockCount; i ++ ) {
    let limits = [];
    limits[0] = i * 6;
    limits[1] = limits[0] + 6;
    limitsList.push(limits);
  }


  return (
    <div>

      <Layout>
        
      {limitsList.map(limits => {
        return onlyCategoryAssignments !== undefined ?
          <CategorizedLayout data={onlyCategoryAssignments.slice(limits[0], limits[1])} feedName="Kaikki" limits={limits}/>
          : <div style={{textAlign: 'center'}}><h1>Noudetaan uutisia...</h1></div>
      })}
        
        
      </Layout>
      
    </div>
  );
}
export default App;

/*
{data.Items.length !== 0 ?
          <CategorizedLayout data={sortCategories} feedName="Kaikki" limits={[data.Items.length / 5, (data.Items.length / 5) * 2]}/>
          : <div style={{textAlign: 'center'}}><h1>Noudetaan uutisia...</h1></div>
        }
*/
'use strict';

let Parser = require('rss-parser');
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
let parser = new Parser();

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

module.exports.hello = async event => {
  console.log("test");

  const newsItems = await dynamo.scan({TableName: "news"}).promise();

  if (newsItems.Items.length < 0) {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(newsItems)
    }
  }
  /*dynamo.scan({TableName: "news"}, function(err, data) {
    if (err) {
      console.log("Error: " , err);
    } else {
      console.log("Scan success")
      data.Items.forEach(function(newsItem) {
        //console.log(newsItem);
      })

      if (data.Items.length > 0) {
        return {
          statusCode: 200,
          body: data
        };
      }
    }

  })*/

  let feed = await parser.parseURL('https://feeds.yle.fi/uutiset/v1/majorHeadlines/YLE_UUTISET.rss');
  let requestItems = []

  feed.items.forEach(item => {
    console.log(item.title + ':' + item.link + " " + getWeekNumber(new Date(item.isoDate)));

    item["weekNumber"] = getWeekNumber(new Date(item.isoDate));

    var PutRequest = {
      PutRequest: {
      Item: {
        guid: item.guid,
        item: {data: item}
      }}
    }
    requestItems.push(PutRequest)
  });

  if (requestItems.length > 25) {
    requestItems = requestItems.slice(0, 24);
  }

  var params = {
    RequestItems: {
      "news": requestItems
    }
  }
  
  dynamo.batchWrite(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });

  /*dynamo.put( {
    TableName: 'news', 
    Item: {
      guid: "testi",
      item: {data: "dataaaa"}
    }
  }).promise();*/

    
  return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: "Works?"
    };
  

  

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

'use strict';

let Parser = require('rss-parser');
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
let parser = new Parser();

module.exports.hello = async event => {
  console.log("test");

  const newsItems = await dynamo.scan({TableName: "news"}).promise();

  if (newsItems.Items.length > 0) {
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
     console.log(item.title + ':' + item.link)

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

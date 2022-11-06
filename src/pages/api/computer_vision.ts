export default function main(){
    'use strict';

    const async = require('async');
    const fs = require('fs');
    const https = require('https');
    const path = require("path");
    const createReadStream = require('fs').createReadStream
    const sleep = require('util').promisify(setTimeout);
    const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
    const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;
    
    /**
     * AUTHENTICATE
     * This single client is used for all examples.
     */
    const key = process.env.COMPUTER_VISION_SUBSCRIPTION_KEY;
    const endpoint = process.env.COMPUTER_VISION_ENDPOINT;
    
    const computerVisionClient = new ComputerVisionClient(
      new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }), endpoint);
    /**
     * END - Authenticate
     */
    
    
    function computerVision() {
      async.series([
        async function () {
    
          /**
           * DETECT TAGS  
           * Detects tags for an image, which returns:
           *     all objects in image and confidence score.
           */
          console.log('-------------------------------------------------');
          console.log('DETECT TAGS');
          console.log();
    
          // Image of different kind of dog.
          const tagsURL = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png';
        // const describeURL = 'https://raw.githubusercontent.com/Azure-Samples/cognitive-services-sample-data-files/master/ComputerVision/Images/celebrities.jpg';
        // const describeImagePath = __dirname + '\\celebrities.jpg';
        // try {
        //   await downloadFilesToLocal(describeURL, describeImagePath);
        // } catch {
        //   console.log('>>> Download sample file failed. Sample cannot continue');
        //   process.exit(1);
        // }
          // Analyze URL image
          console.log('Analyzing tags in image...', tagsURL.split('/').pop());
          const tags = (await computerVisionClient.analyzeImage(tagsURL, { visualFeatures: ['Tags','Categories','Brands'],language:"ja" })).tags;
    // const result = (await computerVisionClient.analyzeImage(imageURL,{visualFeatures: 何を持ってくるか, language: 'en'}));

          console.log(`Tags: ${formatTags(tags)}`);
    
          // Format tags for display
          function formatTags(tags:any) {
            return tags.map((tag:any) => (`${tag.name} (${tag.confidence.toFixed(2)})`)).join(', ');
          }
          /**
           * END - Detect Tags
           */
          console.log();
          console.log('-------------------------------------------------');
          console.log('End of quickstart.');
    
        },
        function () {
          return new Promise<void>((resolve) => {
            resolve();
          })
        }
      ], (err:any) => {
        throw (err);
      });
    }
    
    computerVision();
}


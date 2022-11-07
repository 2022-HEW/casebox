export default function main(){
    'use strict';

    const async = require('async');
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
    
        //   const facesImageURL = 'https://raw.githubusercontent.com/Azure-Samples/cognitive-services-sample-data-files/master/ComputerVision/Images/celebrities.jpg';
          const facesImageURL = 'https://www.linemo.jp/guide/article021/img/img_02.png';
     // Detect Objects
     const features = ['Categories','Brands','Adult','Color','Description','Faces','ImageType','Objects','Tags']
     const domainDetails = ['Celebrities','Landmarks'];
     const result = (await computerVisionClient.analyzeImage(facesImageURL,{visualFeatures: features,language:"ja"},{details: domainDetails,language:"ja"}));

     // Detect Objects
     const objects = result.objects;
     console.log();
     // Print objects bounding box and confidence
     if (objects.length) {
       console.log(`${objects.length} object${objects.length == 1 ? '' : 's'} found:`);
       for (const obj of objects) { console.log(`    ${obj.object} (${obj.confidence.toFixed(2)}) at ${formatRectObjects(obj.rectangle)}`); }
     } else { console.log('No objects found.'); }

     // Formats the bounding box
     function formatRectObjects(rect: { y: any; x: any; h: any; w: any; }) {
       return `top=${rect.y}`.padEnd(10) + `left=${rect.x}`.padEnd(10) + `bottom=${rect.y + rect.h}`.padEnd(12)
         + `right=${rect.x + rect.w}`.padEnd(10) + `(${rect.w}x${rect.h})`;
     }
     console.log();

     // Detect tags
     const tags = result.tags;
     console.log(`Tags: ${formatTags(tags)}`);

     // Format tags for display
     function formatTags(tags: any[]) {
       return tags.map((tag: { name: any; confidence: number; }) => (`${tag.name} (${tag.confidence.toFixed(2)})`)).join(', ');
     }
     console.log();

     // Detect image type
     const types = result.imageType;
     console.log(`Image appears to be ${describeType(types)}`);

     function describeType(imageType: { clipArtType: number; lineDrawingType: number; }) {
       if (imageType.clipArtType && imageType.clipArtType > imageType.lineDrawingType) return 'clip art';
       if (imageType.lineDrawingType && imageType.clipArtType < imageType.lineDrawingType) return 'a line drawing';
       return 'a photograph';
     }
     console.log();

     // Detect Category
     const categories = result.categories;
     console.log(`Categories: ${formatCategories(categories)}`);

     // Formats the image categories
     function formatCategories(categories: any[]) {
       categories.sort((a: { score: number; }, b: { score: number; }) => b.score - a.score);
       return categories.map((cat: { name: any; score: number; }) => `${cat.name} (${cat.score.toFixed(2)})`).join(', ');
     }
     console.log();

     console.log();

     // Detect landmarks
     console.log();

     // Detect Adult content
     // Function to confirm racy or not
     const isIt = (flag: any) => flag ? 'is' : "isn't";

     const adult = result.adult;
     console.log(`This probably ${isIt(adult.isAdultContent)} adult content (${adult.adultScore.toFixed(4)} score)`);
     console.log(`This probably ${isIt(adult.isRacyContent)} racy content (${adult.racyScore.toFixed(4)} score)`);
     console.log();
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

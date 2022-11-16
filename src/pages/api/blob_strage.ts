import { NextApiRequest, NextApiResponse } from "next";
import { BlobServiceClient, ContainerClient} from '@azure/storage-blob';
const formidable = require("formidable");

export const config = {
  api: {
    bodyParser: false,
  },
};


const containerName = `tutorial-container`;
const sasToken = process.env.REACT_APP_STORAGESASTOKEN;
const storageAccountName = process.env.REACT_APP_STORAGERESOURCENAME;

export default async (req: NextApiRequest, res:NextApiResponse) => {
  if (req.method !== "POST") return;

  const form = new formidable.IncomingForm();

  form.parse(req, async function (err:Error|null, fields:any, files:any) {
    if (err) {
      res.statusCode = 500;
      res.json({
        method: req.method,
        error: err
      });
      res.end();
      return;
    }
    const file = files.file;
    // ファイルをなんやかんやする
    // return res.status(200).json(file)

const { DefaultAzureCredential } = require('@azure/identity');
// const { BlobServiceClient } = require("@azure/storage-blob");
// const {uploadFileToBlob} = require("@azure/storage-blob")

async function main() {
  try {
    console.log("Azure Blob storage v12 - JavaScript quickstart sample");

    // アカウントにつなげる
    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    if (!accountName) throw Error('Azure Storage accountName not found');

    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net`,
      // ローカルのワークステーション上でコードを実行する場合、
      // DefaultAzureCredential はログインしている優先順位の高いツールの開発者資格情報を使用して、
      // Azure に対して認証が行われます
      new DefaultAzureCredential()
    );



      // // Create a unique name for the container
      const containerName = 'product';

      // console.log('\nCreating container...');
      // console.log('\t', containerName);

      // //ContainerClient クラスを使用して、Azure Storage コンテナーとその BLOB を操作できます。
      const containerClient = blobServiceClient.getContainerClient(containerName);
      // // Create the container
      // const createContainerResponse = await containerClient.create();
      // console.log(
      //   `Container was created successfully.\n\trequestId:${createContainerResponse.requestId}\n\tURL: ${containerClient.url}`
      // );


      // // 中身を作る
      // const blobName = 'quickstart' + uuidv1() + '.txt';
      const blobName = 'Galaxy_S22.svg';

      // // Get a block blob client
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      // Display blob name and url
      console.log(
        `\nUploading to Azure storage as blob\n\tname: ${blobName}:\n\tURL: ${blockBlobClient.url}`
      );
      // Upload data to the blob
      const data = file;
      const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
      console.log(
        `Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`
      );


      // console.log('\nListing blobs...');

            // return list of blobs in container to display
const getBlobsInContainer = async (containerClient: any) => {
  const returnedBlobUrls: string[] = [];

  // get list of blobs in container
  // eslint-disable-next-line
  for await (const blob of containerClient.listBlobsFlat()) {
    // if image is public, just construct URL
    returnedBlobUrls.push(
      `https://${accountName}.blob.core.windows.net/${containerName}/${blob.name}`
    );
  }

  return returnedBlobUrls;
}

      // List the blob(s) in the container.
      for await (const blob of containerClient.listBlobsFlat()) {
        // Get Blob Client from name, to get the URL
        const tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name);
        const a = getBlobsInContainer(containerClient);
        a.then((response)=>{console.log(response)})
        
        // Display blob name and URL
        console.log(
          `\n\tname: ${blob.name}\n\tURL: ${tempBlockBlobClient.url}\n`
        );
      }




      // Get blob content from position 0 to the end
      // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
      // In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody
      const downloadBlockBlobResponse = await blockBlobClient.download(0);
      console.log('\nDownloaded blob content...');
      console.log(
        '\t',
        // await streamToText(downloadBlockBlobResponse.readableStreamBody)
      );


      // Delete container
      // console.log('\nDeleting container...');

      // const deleteContainerResponse = await containerClient.delete();
      // console.log(
      //   'Container was deleted successfully. requestId: ',
      //   deleteContainerResponse.requestId
      // );

  } catch (err:any) {
    console.log(`Error: ${err.message}`);
  }
}


// Convert stream to text
async function streamToText(readable:any) {
  readable.setEncoding('utf8');
  let data = '';
  for await (const chunk of readable) {
    data += chunk;
  }
  return data;
}



main()
.then(() => console.log("Done"))
.catch((ex) => console.log(ex.message));

    return res.status(200).json(file)
})}

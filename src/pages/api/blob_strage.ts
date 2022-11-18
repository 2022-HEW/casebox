import { NextApiRequest, NextApiResponse } from "next";
import { BlobServiceClient, ContainerClient} from '@azure/storage-blob';
import { Blob } from 'buffer';

const containerName = `tutorial-container`;

export default async (req: NextApiRequest, res:NextApiResponse,) => {

    // const a = new Blob(file);
    // console.log(req.body);

    // const reader = new window.FileReader()
    // reader.readAsDataURL(file);    
    // reader.onload = () => {
    //   console.log(reader.result);
      
    // }
    

    // return res.status(200).json(file)
    
    
    
    // ファイルをなんやかんやする
    // return res.status(200).json(file)

// const { BlobServiceClient } = require("@azure/storage-blob");
// const {uploadFileToBlob} = require("@azure/storage-blob")

async function main() {
  try {

    const sasToken = process.env.REACT_APP_STORAGESASTOKEN;
    const storageAccountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;


    const blobService = new BlobServiceClient(
      `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    );
  
    // get Container - full public read access
    const containerClient: ContainerClient = blobService.getContainerClient(containerName);
    await containerClient.createIfNotExists({
        access: 'container',
    });


    const createBlobInContainer = async (containerClient: ContainerClient, base64:string) => {
  
      // create blobClient for container
      const blobClient = containerClient.getBlockBlobClient("a");
    
      // set mimetype as determined from browser with file upload control
    
      // upload file
      
      await blobClient.upload(base64,base64.length);
    }

  const getBlobsInContainer = async (containerClient: ContainerClient) => {
  const returnedBlobUrls: string[] = [];

  // get list of blobs in container
  // eslint-disable-next-line
  for await (const blob of containerClient.listBlobsFlat()) {
    // if image is public, just construct URL
    returnedBlobUrls.push(
      `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`
    );
  }

  return returnedBlobUrls;
}
  
    // upload file
    await createBlobInContainer(containerClient,req.body);
  
    // get list of blobs in container
    return getBlobsInContainer(containerClient);
  } catch (err:any) {
    console.log(`Error: ${err.message}`);
  }}
  main().then(() => console.log("Done"))
.catch((ex) => console.log(ex.message));
  return res.status(200).json(req.body)
}


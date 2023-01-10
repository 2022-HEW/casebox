import { NextApiRequest, NextApiResponse } from "next";
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { Blob } from "buffer";
import { time } from "console";
import { useState } from "react";

const imgContainerName = `product`;
const placeContainerName = `place`;
const thumbnailContainerName = "thumbnail";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { user_id, situ, place, image, name, thumbnail } = req.body;
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

  try {
    const sasToken = process.env.REACT_APP_STORAGESASTOKEN;
    const storageAccountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;

    const blobService = new BlobServiceClient(
      `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    );

    // get Container - full public read access
    const imgContainerClient: ContainerClient =
      blobService.getContainerClient(imgContainerName);
    await imgContainerClient.createIfNotExists({
      access: "container",
    });

    const placeContainerClient: ContainerClient =
      blobService.getContainerClient(placeContainerName);
    await placeContainerClient.createIfNotExists({
      access: "container",
    });

    const thumbnailContainerClient: ContainerClient =
      blobService.getContainerClient(thumbnailContainerName);
    await thumbnailContainerClient.createIfNotExists({
      access: "container",
    });

    const createBlobInContainer = async (
      containerClient: ContainerClient,
      base64: string,
      filename: string
    ) => {
      // create blobClient for container
      const blobClient = containerClient.getBlockBlobClient(filename);

      // set mimetype as determined from browser with file upload control

      // upload file

      await blobClient.upload(base64, base64.length);
    };

    const getBlobsInContainer = async (
      imgContainerClient: ContainerClient,
      placeContainerClient: ContainerClient
    ) => {
      // const returnedBlobUrls: string[] = [];

      // get list of blobs in container
      // eslint-disable-next-line
      // for await (const blob of containerClient.listBlobsFlat()) {
      //   // if image is public, just construct URL
      //   returnedBlobUrls.push(
      //     `https://${storageAccountName}.blob.core.windows.net/${imgContainerName}/${blob.name}`
      //   );
      // }
      // console.log(returnedBlobUrls);

      const imgDownloadBlockBlobResponse = await imgContainerClient
        .getBlockBlobClient(place + ".txt")
        .download(0);

      const placeDownloadBlockBlobResponse = await placeContainerClient
        .getBlockBlobClient(place + ".json")
        .download(0);

      const DownloadBlockBlobResponses = [
        await streamToText(imgDownloadBlockBlobResponse.readableStreamBody),
        await streamToText(placeDownloadBlockBlobResponse.readableStreamBody),
      ];
      console.log("\nDownloaded blob content...");
      console.log(
        "\t"
        // console.log(downloadBlockBlobResponse),

        // await  streamToText(downloadBlockBlobResponse.readableStreamBody)
      );

      return DownloadBlockBlobResponses;
    };

    const getThumbnailsInContainer = async (
      thumbnailContainerClient: ContainerClient
    ) => {
      const thumbnailDownloadBlockBlobResponse = await thumbnailContainerClient
        .getBlockBlobClient(place + ".txt")
        .download(0);

      const DownloadBlockBlobResponses = [
        await streamToText(
          thumbnailDownloadBlockBlobResponse.readableStreamBody
        ),
      ];
      return DownloadBlockBlobResponses;
    };

    // upload file
    if (situ === "add") {
      // console.log(situ);
      await createBlobInContainer(imgContainerClient, image, `${name}.txt`);
      await createBlobInContainer(placeContainerClient, place, `${name}.json`);
      await createBlobInContainer(
        thumbnailContainerClient,
        thumbnail,
        `${name}.txt`
      );

      // return res.json("success");
    }

    // get list of blobs in container
    if (situ === "create") {
      getBlobsInContainer(imgContainerClient, placeContainerClient)
        .then((res) => {
          return res;
        })
        .then((data) => {
          // console.log(data);
          return res.json(data);
        });
    }
    if (situ === "thumbnail") {
      getThumbnailsInContainer(thumbnailContainerClient)
        .then((res) => {
          return res;
        })
        .then((data) => {
          // console.log(data);
          return res.json(data);
        });
    }

    // return JSON.stringify(result)
  } catch (err: any) {
    console.log(`Error: ${err.message}`);
    return err.message;
  }
};

// .catch((ex) => console.log(ex.message));

async function streamToText(readable: any) {
  readable.setEncoding("utf8");
  let data = "";
  for await (const chunk of readable) {
    data += chunk;
  }
  return data;
}

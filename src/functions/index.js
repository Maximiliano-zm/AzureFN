const { app } = require('@azure/functions');
const mergeImages = require("merge-images");
const { Canvas, Image } = require("canvas");
// import {app} from '@azure/functions'
// import mergeImages from "merge-images";
// import { Canvas, Image } from "canvas";

app.http('index', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        
        const json = request.query.get('json') || (await request.json());
        const respuesta = await mergeImg(json);
        return { body: respuesta };
    }
});

const mergeImg = async (request) => {
    const imagenes = request;
    try{
      const content1 = imagenes.img1["$content"];
      const content2 = imagenes.img2["$content"];
        // console.log(content1)
      const mergeImgsB64 = await mergeImgs(content1,content2);
      return mergeImgsB64;
    }catch(error){
      console.error(error);
    }
  };


const mergeImgs = async (content1,content2) => {
  try{
  
    const b64 = await mergeImages([content1, content2], {
      Canvas: Canvas,
      Image: Image,
      width: 500,
      height: 500,
    });

    return b64;
  }catch(error){
    console.log(error);
    throw new Error("Error al fusionar imagenes");
  } 
  
}



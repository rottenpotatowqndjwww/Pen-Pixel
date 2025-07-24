//* we are using the imagekit to store the image which will then return the image url and that url is to be send in the mongodb

//! this will verify ypu indentity and your db in the image kit
import ImageKit from "imagekit";

var imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
}); 

export default imagekit
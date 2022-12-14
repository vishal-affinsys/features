import RNFetchBlob from 'rn-fetch-blob';
export const Base64Converter = async uri => {
  const fs = RNFetchBlob.fs;
  let imagePath = null;
  let data = null;
  await RNFetchBlob.config({fileCache: true})
    .fetch('GET', uri)
    // the image is now dowloaded to device's storage
    .then(resp => {
      // the image path you can use it directly with Image component
      imagePath = resp.path();
      return resp.readFile('base64');
    })
    .then(base64Data => {
      data = base64Data;
      // remove the file from storage
      //   return fs.unlink(imagePath);
    });
  return 'data:image/png;base64,' + data;
};

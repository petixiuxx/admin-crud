export const converter = (path) => {
   return  Buffer.from(path).toString('base64');
}
export const converter = (path) => {
   return  Buffer.from(path).toString('base64');
}

export const checkJson = (str) => {
   try {
      JSON.parse(str);
   } catch (e) {
      return false;
   }
   return true;
}
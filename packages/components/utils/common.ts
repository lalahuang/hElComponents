/*
 * @Author: hzm
 * @Date: 2022-10-13 09:55:59
 * @Description: 

*/
import { Comment, Text,Fragment } from "vue";

 export function getFirstImage(str: string, delimiter = ",") {
   if (str) {
     return str.split(delimiter)?.[0] ?? "";
   }
   return "";
}
 


export const stripEmpty = (arr:any[]) => {
  return arr.filter(
    (o) => o.type !== Comment && (o.type !== Text || o.children.trim() !== "")
  );
};


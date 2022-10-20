/*
 * @Author: hzm
 * @Date: 2022-10-13 09:55:59
 * @Description: 

*/

 export function getFirstImage(str: string, delimiter = ",") {
   if (str) {
     return str.split(delimiter)?.[0] ?? "";
   }
   return "";
 }

/*
 * @Author: hzm
 * @Date: 2022-11-02 08:46:26
 * @Description: 
 */
import { ref } from 'vue';

export default function useLineSpaceChange(lineSpaceProp:string) {
    const spaceClassList: {
        [key:string]:string
    } = {
        default: "", 
        middle:"h-table--middle",
        big:"h-table--big"
    }
    const spaceClass = ref(spaceClassList[lineSpaceProp]||"");
    
    
    function lineSpaceChange(space:string) {
        spaceClass.value = spaceClassList[space];
        console.log("spaceClass.value: ", spaceClass.value);
    }

    return {
      spaceClass,
      lineSpaceChange,
    };
};

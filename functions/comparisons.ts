export function compareObjects(obj1: any, obj2: any): boolean {


    const areArraysEqual = (arr1: any[], arr2: any[]): boolean => {
      if (arr1.length !== arr2.length) return false;
      for (let i = 0; i < arr1.length; i++) {
        if (!compareObjects(arr1[i], arr2[i])) return false;
      }
      return true;
    };
  
    const areValuesEqual = (val1: any, val2: any): boolean => {
      if (Array.isArray(val1) && Array.isArray(val2)) {
        return areArraysEqual(val1, val2);
      } else if (typeof val1 === 'object' && typeof val2 === 'object') {
        return compareObjects(val1, val2);
      }
      return val1 === val2;
    };
  
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
      return obj1 === obj2;
    }
  
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
  
    if (keys1.length !== keys2.length) return false;
  
    for (const key of keys1) {
      if (!keys2.includes(key)) return false;
      if (!areValuesEqual(obj1[key], obj2[key])) return false;
    }
  
    return true;
  }
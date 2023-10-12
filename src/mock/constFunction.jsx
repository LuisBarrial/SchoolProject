export function isDark(value){
    if(value) return ' text-light bg-dark'
    else return ' text-dark bg-light' 
}

export const funcNormalize = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  };


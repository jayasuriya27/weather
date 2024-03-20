export function convertmilliseconds(value){
    const milliseconds = value * 1000;
    const time =new Date(milliseconds).toLocaleTimeString();
    return time;
    
}


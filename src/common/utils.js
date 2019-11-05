export function makeId(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 export function removeItemFromIndex(arr,index){
    return [...arr.slice(0,index),...arr.slice(index+1)];
 }

 export function checkInDuration(time,selectedTime,checkInDuration){
    if(selectedTime==='') return false;
    let [hr,min] = selectedTime.split(':').map(x=>parseInt(x));
    let selectedTimeInMinutes = hr*60+min;
    let duration = time-selectedTimeInMinutes;
    return duration>=0 && duration<=checkInDuration;
}
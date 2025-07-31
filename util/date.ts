export function getFormattedDate(date:Date)
{
    return date.toISOString().slice(0,10)
}

export function getDateMinusDays(date:Date,days:number){
    return new Date(date.getFullYear(),date.getMonth(),date.getDate()-days)
}

export function getFormattedTime(time:string){

const date = new Date(time);
const hours = date.getHours();
const minutes = date.getMinutes().toString().padStart(2, '0');
const ampm = hours >= 12 ? 'pm' : 'am';
const hour12 = hours % 12 || 12;
const formattedTime = `${hour12}:${minutes} ${ampm}`;

return formattedTime

}
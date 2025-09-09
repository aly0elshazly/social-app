export const generateotp = ():string=>{
    return Math.floor(Math.random()*99999+10000) as unknown as string
}
export const generateExpireyAt = (time:number)=>{
    return Date.now() + time;
}
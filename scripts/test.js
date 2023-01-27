const str = "C:/Users/SanDaKu/selfie-ygn/images/993.jpg";

const reg = new RegExp(/(\d+\.\w{3})$/);
const match = str.match(reg)[1];

console.log(match);

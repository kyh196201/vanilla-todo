// Ref: https://noritersand.github.io/javascript/javascript-uuid-%EC%83%9D%EC%84%B1-%ED%95%A8%EC%88%98/
export default function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

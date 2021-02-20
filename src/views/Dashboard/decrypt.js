export default (s) => {
    const key = 1
    let c = 0;
    let result = ''
    s=s+"";
    while (c < s.length) {
        const code = s.charCodeAt(c) >> key
        const charS = String.fromCharCode(code);
        result += charS;
        c++;
    }
    //console.log(`Dec: ${result}`)
    return result;
}
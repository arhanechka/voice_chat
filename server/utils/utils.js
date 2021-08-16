 const getRandomAvatarName = ()=>{
    let number = Math.floor(Math.random() * (10 - 1) + 1);
    return number
}

module.exports = {getRandomAvatarName}
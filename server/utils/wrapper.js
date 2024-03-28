const wrapper= async function(func){
    return Promise.resolve(func()).catch((err)=>{console.log(`Error: ${err}`)});
}

module.exports= wrapper;
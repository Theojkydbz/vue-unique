



const store = {
    state : {
        
    },
    actions: {
        
    }
}


store.genere = function () {

    var pattern = 'https://raw.githubusercontent.com/Theojkydbz/Pattern_gen/master/example/Mycanvasmobile1.png'
    var words = pattern.split('mobile');
    words[1] = words[1].replace(/[0-9]/g, '')
    var url = [words[0],'mobile', Math.floor(Math.random()*230).toString(), words[1]]
    return(url.join(''));

}

store.saver = function (Url) {
    window.location.href = Url;
}




export default store
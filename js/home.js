var api = require('marvel-api');

var marvel = api.createClient({

  publicKey: 'e0c049e996366ea0bc70bd833e03d31f',
  privateKey: 'c27d45753f1d2a071cea0a7e40a23bd3fad7e16e'

});

function searchButton(){
     var name = document.getElementById("searchText").value;
     sessionStorage.setItem('myKeyName',name.toString());
     window.open('./infoSearch.html',"_self");
};

function buttonClick(objButton){
  var txt = objButton.value;
    marvel.characters.findByName(txt,function(err, results) {
        if (err) {
          $("#noInternet").empty();
          $("#noInternet").append("Could not connect to Marvel :(. Please make sure than internet is on");
        }
         $("#noInternet").empty();
        var str = results.data[0].id.toString();
        sessionStorage.setItem('myKeyId',str);
        window.open('./infoPage.html',"_self");
    });  
}
$(document).ready(function(){
	var txt = sessionStorage.getItem('myKeyName');
	var api = require('marvel-api');

    var marvel = api.createClient({

        publicKey: 'e0c049e996366ea0bc70bd833e03d31f',
        privateKey: 'c27d45753f1d2a071cea0a7e40a23bd3fad7e16e'

    });	      

    // marvel.characters.findByName(txt,function(err, results) {
 	marvel.characters.findNameStartsWith(txt,20,0,function(err, results) {
        if (err) {
          return console.error(err);
        }
        if(results.data.length === 0){
        	document.getElementsByTagName("body")[0].style.overflow = "auto";;
    		document.getElementById("windows8").innerHTML = "";
        	$("#DynamicContent").append("Couldnt find any superheroes...");
        	return;
        }
        var len = 0;
        var data = results.data;

        function createCallback(str){
          return function(){
            sessionStorage.setItem('myKeyId',str);
            window.open('./infoPage.html',"_self");
          }
        }
        document.getElementsByTagName("body")[0].style.overflow = "auto";;
    	document.getElementById("windows8").innerHTML = "";
        
      	for(var i=0;i<data.length;i++){ 
	        var $div = $("<div>",{ class: "hero-container"});
	        $div.click(createCallback(data[i].id.toString()));

	        var $p = $("<p>").append(data[i].name.toString());
	        var str1 = data[i].thumbnail.path.toString();
	        var str2 = "/portrait_uncanny.jpg";
	        var imgPath = str1.concat(str2);
	        var $img = $("<img>",{ src: imgPath.toString() });
	        var $div2 = $("<div>",{ class: "hero_title-container"});

	        $div.append($img);
	        $div2.append($p);
	        $div.append($div2);

	        $("#DynamicContent").append($div);
	                   
	        len++;
      	}

      	

    });
    
});	
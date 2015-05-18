
var txt;

function myFunction(){

	txt = sessionStorage.getItem('myComicId');

	var api = require('marvel-api');
	var request = require('request');
	var cheerio = require('cheerio');

  	var marvel = api.createClient({

    	publicKey: 'e0c049e996366ea0bc70bd833e03d31f',
    	privateKey: 'c27d45753f1d2a071cea0a7e40a23bd3fad7e16e'

  	});
  	
  	marvel.comics.find(txt,function(err, results) {
    	if (err) {
    		$("#description").append("Couldnt find description..");
      		return console.error("Find error");
    	}
    	function browserLink(link){
          return function(){
            var gui = require('nw.gui');
			gui.Shell.openExternal(link);
          }
        }
    	
    	var fullDate = results.data[0].dates[0].date.toString();
    	function splitPublishedDate(){
		    var ret; 
		    ret = fullDate.replace(/[0-9]T/, function(v) { 
            	var va = v.split("");
            	va = va.join(" ");
            	return va;
            });
		    while(ret === undefined){}
		    ret = ret.split(" ");	
		    document.getElementById("publishedDate").innerHTML = ret[0];
		}
		splitPublishedDate();

		var fullDate = results.data[0].dates[2].date.toString();
    	function splitDigitalDate(){
		    var ret; 
		    ret = fullDate.replace(/[0-9]T/, function(v) { 
            	var va = v.split("");
            	va = va.join(" ");
            	return va;
            });
		    while(ret === undefined){}
		    ret = ret.split(" ");		
		    document.getElementById("unlimitedDate").innerHTML = ret[0];
		}
		splitDigitalDate();

        

    	document.getElementById("comicTitle").innerHTML = results.data[0].title.toString();

    	if(typeof results.data[0].prices[0] !== "undefined"){
    		document.getElementById("printPrice").innerHTML = "$" + results.data[0].prices[0].price.toString();
    	}else{
    		document.getElementById("printPrice").innerHTML = " NA";
    	}

    	if(typeof results.data[0].prices[1] !== "undefined"){
    		document.getElementById("digitalPrice").innerHTML = "$" + results.data[0].prices[1].price.toString(); 
    	}else{
    		document.getElementById("digitalPrice").innerHTML = " NA";
    	}
    	
    	if(typeof results.data[0].urls[3] !== "undefined"){
    		document.getElementById("purchase").onclick = browserLink(results.data[0].urls[3].url.toString());
    	}else{
    		document.getElementById("purchase").onclick = browserLink(results.data[0].urls[0].url.toString());
    	}	

    	if(typeof results.data[0].urls[2] !== "undefined"){
    		document.getElementById("reader").onclick = browserLink(results.data[0].urls[2].url.toString());
    	}else{
    		$("#reader").css("display", "none");
    	}

    	var x = document.getElementsByClassName("left_container");
		x[0].style.overflow = "auto";
    	document.getElementById("windows8").innerHTML = "";


    	var str1 = results.data[0].thumbnail.path.toString();
        var str2 = ".jpg";
        var imgPath = str1.concat(str2);
    	document.getElementById("thumbnail").setAttribute("src", imgPath.toString());
    	document.getElementById("summary").innerHTML = results.data[0].description.toString();

    	var x = document.getElementsByClassName("rem_info");
		x[0].style.overflow = "auto";
    	document.getElementById("windows8_2").innerHTML = "";

    	var $div = $("<div>",{ class: "image_container2"});

    	if(results.data[0].images.length == 0){
    		$div.append("Sorry couldnt find any images..");
    		
    	}else{
    		for(var i=2;i < results.data[0].images.length;i++){
		        var str1 = results.data[0].images[i].path.toString();
		        var str2 = ".jpg";
		        var imgPath = str1.concat(str2);
		        var $img = $("<img>",{ id:"thumbImages" , src: imgPath.toString() });

		        $div.append($img);
	    	}
    	}
    	$("#comicTitles").append($div);
    	document.getElementById("windows8_comics").innerHTML = "";

    	//creators
    	for(var i=0;i < results.data[0].creators.items.length;i++){
		    var name = results.data[0].creators.items[i].name.toString();
		    var role = results.data[0].creators.items[i].role.toString();

		    var $h4 = $("<h4>");
	        $h4.append(name);
	        var $p = $("<p>",{ style : "text-transform : capitalize"});
	        $p.append(role);
	        var $li = $("<li>",{ class : "li_block" });
	        $li.append($h4);
	        $li.append($p);

	        $("#creators").append($li);
	    }

	    for(var i=0;i < results.data[0].characters.items.length;i++){
		    var name = results.data[0].characters.items[i].name.toString();

		    var $h4 = $("<h4>");
	        $h4.append(name);
	       
	        var $li = $("<li>",{ class : "li_block" });
	        $li.append($h4);

	        $("#characters").append($li);
	    }
	    document.getElementsByClassName("bio_info")[0].style.overflow = "auto";
	    document.getElementById("windows8_3").innerHTML = "";
  	});	  	
}


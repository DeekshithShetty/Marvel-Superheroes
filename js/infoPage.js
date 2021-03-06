
var txt;
function myFunction(){
	
	txt = sessionStorage.getItem('myKeyId');

	var api = require('marvel-api');
	var request = require('request');
	var cheerio = require('cheerio');

  	var marvel = api.createClient({

    	publicKey: 'e0c049e996366ea0bc70bd833e03d31f',
    	privateKey: 'c27d45753f1d2a071cea0a7e40a23bd3fad7e16e'

  	});

  	marvel.characters.find(txt,function(err, results) {
    	if (err) {
    		$("#description").append("No Data Available");
      		return console.error("Find error");
    	}

    	document.getElementById("heroName").innerHTML = results.data[0].name.toString();
    	var str1 = results.data[0].thumbnail.path.toString();
        var str2 = ".jpg";
        var imgPath = str1.concat(str2);
    	document.getElementById("thumbnail").setAttribute("src", imgPath.toString());
    	document.getElementById("description").innerHTML = results.data[0].description.toString();

    	url = results.data[0].urls[1].url.toString();

	    request(url, function(error, response, html){

	        if(!error){
	            var $ = cheerio.load(html);
	            var universe, real_name, aliases,identity,citizenship;
	           var json = { universe : "", real_name : "", aliases : "", identity :"", citizenship : ""};

	            // We'll use the unique header class as a starting point.

	            $('#powerbox').filter(function(){
	                var data = $(this);
	                var arr;

	                universe = data.children('p').eq(0).first().text();

					function splitUniverse(){
					    var ret;
					    universe = universe.split(' ');
					    universe.unshift("<span class=grey>");
					    universe = universe.join(' ');
					    ret = universe.replace(/([a-z][A-Z])/, function(v) { 
		                	var va = v.split("");
		                	v = va.join(" :</span> ");
		                	return v; 
		                });
					    while(ret === undefined){} //wait for the result until it's available, cause the blocking
					    document.getElementById("universe").innerHTML = ret;
					    json.universe = universe;
					}
					splitUniverse();

					real_name = data.children('p').eq(1).first().text();
					function splitRealName(){
					    var ret;
					    real_name = real_name.split(' ');
					    real_name.unshift("<span class=grey>");
					    real_name = real_name.join(' '); 
					    ret = real_name.replace(/([a-z][A-Z])/, function(v) { 
		                	var va = v.split("");
		                	v = va.join(" :</span> ");
		                	return v; 
		                });
					    while(ret === undefined){}	
					    document.getElementById("real_name").innerHTML = ret;
					    json.real_name = real_name;
					}
					splitRealName();

					aliases = data.children('p').eq(2).first().text();
					function splitAliases(){
					    var ret;
					    aliases = aliases.split(' ');
					    aliases.unshift("<span class=grey>");
					    aliases = aliases.join(' ');  
					    ret = aliases.replace(/([a-z][A-Z])/, function(v) { 
		                	var va = v.split("");
		                	v = va.join(" :</span> ");
		                	return v; 
		                });
					    while(ret === undefined){}	
					    document.getElementById("aliases").innerHTML = ret;
					    json.aliases = aliases;
					}
					splitAliases();

					identity = data.children('p').eq(3).first().text();
					function splitIdentity(){
					    var ret;
					    identity = identity.split(' ');
					    identity.unshift("<span class=grey>");
					    identity = identity.join(' '); 
					    ret = identity.replace(/([a-z][A-Z])/, function(v) { 
		                	var va = v.split("");
		                	v = va.join(" :</span> ");
		                	return v; 
		                });
					    while(ret === undefined){}	
					    document.getElementById("identity").innerHTML = ret;
					    json.identity = identity;
					}
					splitIdentity();

					citizenship = data.children('p').eq(4).first().text();
					function splitCitizenship(){
					    var ret;
					    citizenship = citizenship.split(' ');
					    citizenship.unshift("<span class=grey>");
					    citizenship = citizenship.join(' ');  
					    ret = citizenship.replace(/([a-z][A-Z])/, function(v) { 
		                	var va = v.split("");
		                	v = va.join(" :</span> ");
		                	return v; 
		                });
					    while(ret === undefined){}	
					    document.getElementById("citizenship").innerHTML = ret;
					    json.citizenship = citizenship;
					}
					splitCitizenship();
				});
				
			
				$('#char-occupation-content').filter(function(){
	                var data = $(this);
	               	document.getElementById("occupation").innerHTML = data.text();
				});

				$('#char-powers-content').filter(function(){
	                var data = $(this);
	               	document.getElementById("power").innerHTML = data.text();
				});

				$('#char-abilities-content').filter(function(){
	                var data = $(this);
	               	document.getElementById("abilities").innerHTML = data.text();
				});

				$('#char-weapons-content').filter(function(){
	                var data = $(this);
	               	document.getElementById("weapons").innerHTML = data.text();
				});

				$('#char-physicals-content').filter(function(){
	                var data = $(this);

	                var height = data.children('p').eq(0).text();
					function splitHeight(){
					    var ret;
					    height = height.split(' ');
					    height.unshift("<span class=grey>");
					    height = height.join(' ');  
					    ret = height.replace(/([a-z][0-9])/, function(v) { 
		                	var va = v.split("");
		                	v = va.join(" :</span> ");
		                	return v; 
		                });
					    while(ret === undefined){}	
					    document.getElementById("height").innerHTML = ret;
					}
					splitHeight();

					var weight = data.children('p').eq(1).text();
					function splitWeight(){
					    var ret;
					    weight = weight.split(' ');
					    weight.unshift("<span class=grey>");
					    weight = weight.join(' ');  
					    ret = weight.replace(/([a-z][0-9])/, function(v) { 
		                	var va = v.split("");
		                	v = va.join(" :</span> ");
		                	return v; 
		                });
					    while(ret === undefined){}	
					    document.getElementById("weight").innerHTML = ret;
					}
					splitWeight();

					var eyes = data.children('p').eq(2).text();
					function splitEyes(){
					    var ret;
					    eyes = eyes.split(' ');
					    eyes.unshift("<span class=grey>");
					    eyes = eyes.join(' '); 
					    ret = eyes.replace(/([a-z][A-Z])/, function(v) { 
		                	var va = v.split("");
		                	v = va.join(" :</span> ");
		                	return v; 
		                });
					    while(ret === undefined){}	
					    document.getElementById("eyes").innerHTML = ret;
					}
					splitEyes();

					var hair = data.children('p').eq(3).text();
					function splitHair(){
					    var ret;
					    hair = hair.split(' ');
					    hair.unshift("<span class=grey>");
					    hair = hair.join(' ');  
					    ret = hair.replace(/([a-z][A-Z])/, function(v) { 
		                	var va = v.split("");
		                	v = va.join(" :</span> ");
		                	return v; 
		                });
					    while(ret === undefined){}	
					    document.getElementById("hair").innerHTML = ret;
					}
					splitHair();
				});

				$('#biobody').filter(function(){
	                var data = $(this);
	                document.getElementById("bio_body").innerHTML = data.text();
	                //document.getElementById("bio_body").innerHTML = data.children('p').first().text();
				});
			}

			document.getElementsByClassName("left_container")[0].style.overflow = "auto";
			document.getElementById("windows8").innerHTML = "";

			document.getElementsByClassName("rem_info")[0].style.overflow = "auto";
			document.getElementById("windows8_2").innerHTML = "";

			document.getElementsByClassName("bio_info")[0].style.overflow = "auto";
			document.getElementById("windows8_3").innerHTML = "";

	    });
  	});

  	marvel.characters.comics(txt,20,0,function(err, results) {
  		if (err) {
  			$("#comicTitles").append("Couldnt find any comic books..");
      		return console.error("Comic book error");
    	}

    	function createCallback(str){
          return function(){
            sessionStorage.setItem('myComicId',str);
            window.open('./comicPage.html',"_self");
          }
        }

    	var len = 0;
    	for(var i=0;i < results.data.length;i++){
    		var $div = $("<div>",{ class: "comic-container"});
    		$div.click(createCallback(results.data[i].id.toString()));

	        var $p = $("<p>").append(results.data[i].title.toString());
	        var str1 = results.data[i].thumbnail.path.toString();
	        var str2 = "/portrait_xlarge.jpg";
	        var imgPath = str1.concat(str2);
	        var $img = $("<img>",{ src: imgPath.toString() });
	        var $div2 = $("<div>",{ class: "comic_title-container"});

	        $div.append($img);
	        $div2.append($p);
	        $div.append($div2);
    		$("#comicTitles").append($div);
    		len++;
    	}
    	document.getElementById("windows8_comics").innerHTML = "";	
  	});
  	
}
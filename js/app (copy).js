var api = require('marvel-api');

      var marvel = api.createClient({

        publicKey: 'e0c049e996366ea0bc70bd833e03d31f',
        privateKey: 'c27d45753f1d2a071cea0a7e40a23bd3fad7e16e'

      });

      marvel.characters.findByName('spider-man',function(err, results) {
        if (err) {
            return console.error(err);
        }
        //console.log(results.data[0].description);
        document.getElementById("spiderman").innerHTML = results.data[0].description.toString();
        //document.write(results.data[0]);
      });
      /*

      */


      marvel.characters.findAll(function(err, results) {
        if (err) {
          return console.error(err);
        }
        var len = 0;
        var data = results.data;
      //for (var o in data) {
      for(var i=0;i<data.length;i++){ 
        var divv = document.createElement("DIV");
        var p = document.createElement("P"); 
        var imageTag = document.createElement("IMG");
        var link = document.createElement("A"); 

        var t = document.createTextNode(data[i].name.toString());
        var str1 = data[i].thumbnail.path.toString();
        var str2 = "/portrait_fantastic.jpg";
        var imgPath = str1.concat(str2);

        imageTag.setAttribute("src",imgPath.toString());

        p.appendChild(t);
        divv.appendChild(imageTag);
        divv.appendChild(p);
        link.appendChild(divv);
        link.setAttribute("class","hero-container");
        link.setAttribute("href","./infoPage.html");
        var mainDiv = document.getElementById("DynamicContent");                                
        mainDiv.appendChild(link);
                   
          len++;
          //if(len == 5)break;
      }
      //document.getElementById("length").innerHTML = len.toString();
        console.log("Length : ",len);
        //document.getElementById("info").innerHTML = JSON.stringify(results.data);
    });
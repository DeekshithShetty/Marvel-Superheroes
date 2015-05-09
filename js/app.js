      
      var api = require('marvel-api');

      var marvel = api.createClient({

        publicKey: 'e0c049e996366ea0bc70bd833e03d31f',
        privateKey: 'c27d45753f1d2a071cea0a7e40a23bd3fad7e16e'

      });

      function searchButton(){
           var name = document.getElementById("searchText").value;
           console.log("Name : " + name.toString())
           sessionStorage.setItem('myKeyName',name.toString());
           window.open('./infoSearch.html',"_self");
      };
/*
      var $div = $("<div>", {id: "foo", class: "a"});
      $div.click(function(){ });
      $("#box").append($div);
*/
     
      marvel.characters.findAll(10,100,function(err, results) {
        if (err) {
          return console.error(err);
        }
        var len = 0;
        var data = results.data;
      //for (var o in data) {

        function createCallback(str){
          return function(){
            sessionStorage.setItem('myKeyId',str);
            window.open('./infoPage.html',"_self");
          }
        }

      for(var i=0;i<data.length;i++){ 
        var $div = $("<div>",{ class: "hero-container"});
        $div.click(createCallback(data[i].id.toString()));

        var $p = $("<p>").append(data[i].name.toString());
        var str1 = data[i].thumbnail.path.toString();
        var str2 = "/portrait_fantastic.jpg";
        var imgPath = str1.concat(str2);
        var $img = $("<img>",{ src: imgPath.toString() });

        $div.append($img);
        $div.append($p);

        $("#DynamicContent").append($div);
                   
          len++;
        updateProgress();   
          //if(len == 5)break;
      }
      function updateProgress(){
          document.getElementById("progress").setAttribute("value",len*10);
      }
      //document.getElementById("length").innerHTML = len.toString();
        console.log("Length : ",len);
        //document.getElementById("info").innerHTML = JSON.stringify(results.data);
    });
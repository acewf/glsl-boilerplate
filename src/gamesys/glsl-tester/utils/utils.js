module.exports = {
    setSize:function(item,obj) {
      item.height = obj.height;
      item.width = obj.width;
    },
    createElement:function(context,parent,tag){
      var elem = context.document.createElement(tag);
      parent.appendChild(elem);
      return elem;
    },
    random:function random(max,min){
      var value = Math.random()*(max-min);
      var final = min+value;
      return final;
    },
    loadImg:function(url,callback){
      var img = new Image(); // width, height values are optional params
      img.src = url;
      img.onload = function (){
        callback(img);
      }
    },
    loadVideo:function(url,callback){
      var video = document.createElement('video'); // width, height values are optional params
      video.autoplay = true;
      video.src = url;
      video.onloadeddata = function (e){
        callback(video);
      }
    }
}

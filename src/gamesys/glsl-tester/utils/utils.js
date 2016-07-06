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
    }
}

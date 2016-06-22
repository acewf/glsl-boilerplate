module.exports = {
    setSize:function(item,obj) {
      item.height = obj.height;
      item.width = obj.width;
    },
    createElement:function(context,parent,tag){
      var elem = context.document.createElement(tag);
      parent.appendChild(elem);
      return elem;
    }
}

module.exports = function(xRand,yRand,z,angle,circlePoints,index){
  var zHigh = 0;
  var white = {r:1.0,g:1.0,b:1.0};
  var colorArr = [{r:1.0,g:0.0,b:0.0}];
  colorArr.push({r:0.0,g:1.0,b:0.0});
  colorArr.push({r:0.0,g:0.0,b:1.0});
  var _color = colorArr[index-1];
  var bcolor = false;
  var color = white;
  var position = {x:0.0,y:0.0,z:z+0.0,angle:0.0};
  var points = {
    vertices:[],
    color:[],
    center:{}
  };
  points.center.x =  xRand+position.x;
  points.center.y = yRand+position.y;
  points.center.z = z+zHigh+1;
  points.vertices.push(xRand+position.x,yRand+position.y,z+zHigh);
  points.color.push(color.r, color.g, color.b);
  for(var i=0;i<circlePoints;i++){
    position.x = xRand+Math.cos(position.angle);
    position.y = yRand+Math.sin(position.angle);

    points.vertices.push(position.x,position.y,position.z);
    if(bcolor){
      color = white;
      bcolor = false;
      position.z = z+zHigh;
    } else {
      position.z = z+0.0;
      color = _color;
      bcolor = true;
    }
    points.color.push(color.r, color.g, color.b);
    position.angle += angle;
  }
  position.x = xRand+Math.cos(0.0);
  position.y = Math.sin(0.0);
  /// CLOSE FIGURE
  points.center.x =  position.x;
  points.center.y = position.y;
  points.center.z = position.y;
  points.vertices.push(position.x,yRand+position.y,z+0.0);
  points.color.push(_color.r, _color.g, _color.b);

  return points;
}

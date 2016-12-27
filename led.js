var width = 13;
var height = 13;

var pixelCount = width * height * 3; 

var rgb = new Uint8ClampedArray(pixelCount);
//var g = Object.create(g.__proto__.constructor["prototype"]);
var g = Graphics.createArrayBuffer(13, 13, 24, {zigzag:true, color_order: 'brg'});
g.buffer = new ArrayBuffer(pixelCount);
g.flip = function () {SPI2.send4bit(g.buffer, 0b0001, 0b0011);};
var pos = 50;
var logo = 1;
var arr = [  ];
function fillRand(c) {
  for (var i = 0; i < c*3; i++) {
  var l = E.hwRand().toString();
  var n = parseInt(l[2]+l[3]+l[4]);
  if (n <= 255) arr.push(n);
  if (n > 255) {
    c = c -1;
  }
}
function getRainbowPattern(n) {
  if (n < 85) {
    return [n * 3, 255 - n * 3, 0];
  } else if (n < 170) {
    n -= 85;
    return [255 - n * 3, 0, n * 3];
  } else {
    n -= 170;
    return [0, n * 3, 255 - n * 3];
  }
}
SPI2.send4bit(arr, 0b0001, 0b0011);
}
function lightsOff() {
  pos++;
  for (var i=0;i<rgb.length;i+=3) {
    rgb[i  ] = 0;
    rgb[i+1] = 0;
    rgb[i+2] = 0;
  }
  SPI2.send4bit(rgb, 0b0001, 0b0011);
}
var patterns = [
  function () {
  "compile";
  pos++;
  for (var i=0;i<rgb.length;i+=3) {
     //rgb[i  ] = (1 + Math.sin((i+pos)*0.1324)) * 127;
    rgb[i  ] = (1 + Math.sin((i+pos)*0.124)) * 127;
     rgb[i+1] = (1 + Math.sin((i+pos)*0.1654)) * 127;
     rgb[i+2] = (1 + Math.sin((i+pos)*0.1)) * 127;
  }
},
  function () {
  "compile";
  pos++;
  for (var i=0;i<rgb.length;i+=3) {
     var col = (Math.sin(i+pos*0.2)+1) * 127;
     rgb[i  ] = col;
     rgb[i+1] = col;
     rgb[i+2] = col;
  }
},
  function () {
  "compile";
  for (var i=0;i<rgb.length;i+=3) {
     rgb[i  ] = Math.random()*255;
     rgb[i+1] = 0;
     rgb[i+2] = 0;
  }
},
  function () {
  "compile";
  for (var i=0;i<rgb.length;i+=3) {
     rgb[i  ] = 0;
     rgb[i+1] = Math.random()*255;
     rgb[i+2] = 0;
  }
},
  function () {
  "compile";
  for (var i=0;i<rgb.length;i+=3) {
     rgb[i  ] = 0;
     rgb[i+1] = 0;
     rgb[i+2] = Math.random()*255;
  }
},
  function () {
  pos++;
  for (var i=0;i<rgb.length;i+=3) {
    rgb[i  ] = 0;
    rgb[i+1] = 0;
    rgb[i+2] = 0;
  },
  function () {
  pos++;
  for (var i=0;i<rgb.length;i+=3) {
  	t = getRainbowPattern(i/3);
    rgb[i  ] = t[0];
    rgb[i+1] = t[1];
    rgb[i+2] = t[2];
  }
  SPI2.send4bit(rgb, 0b0001, 0b0011);
}
 ];
function getRandom() {
  var r = getTime() * 10000;
  r -= parseInt(r);
  r = Math.round(r *100) / 100;
  return r;
}
function alpaca() {
  "compile";
  g.clear();
  g.setRotation(0, true); // reflect horizontally, display is wired up right to left
  //set color (=blue) for rectangles
  g.setColor(0.106,0.875,0.655);
  //draw rectangles
  g.drawRect(2,1,3,1);
  g.drawRect(9,1,10,1);
  g.drawRect(1,2,4,2);
  g.drawRect(8,2,11,2);
  g.drawRect(1,3,11,3);
  g.drawRect(1,4,11,4);
  g.drawRect(1,5,11,5);
  g.drawRect(1,5,10,5);
 // g.drawRect(10,5,11,5);
  //set individual pixels
  g.setPixel(1,6);
  g.setPixel(11,6);
  g.setPixel(1,7);
  g.setPixel(11,7);
  g.setPixel(1,8);
  g.setPixel(11,8);
  // even more rectangles (#todo: use .fillRect instead)
  g.drawRect(1,9,2,9);
  g.drawRect(10,9,11,9);
  g.drawRect(2,10,3,10);
  g.drawRect(9,10,10,10);
  g.drawRect(3,11,9,11);
  //g.drawRect(3,11,8,11);
  // set color white
  g.setColor(255,255,255);
  // rectangles!
  g.drawRect(3,5,9,5);
  g.drawRect(2,6,9,6);
  g.fillRect(2,7,10,8);
  g.fillRect(3,9,9,9);
  g.drawRect(4,10,8,10);
  g.setPixel(10,6);
  // set color black, set pixels
  g.setColor(0,0,0);
  g.setPixel(3,7);
  g.setPixel(9,7);
  g.setPixel(5,8);
  g.setPixel(7,8);
  g.setPixel(5,9);
  g.setPixel(6,9);
  g.setPixel(7,9);
  g.flip();
}
var getPattern = function() {
  "compile";
  pos++;
  for (var i=0;i<rgb.length;i+=3) {
    //rgb[i  ] = (1 + Math.sin((i+pos)*0.1324)) * 127;
    rgb[i  ] = (1 + Math.sin((i+pos)*0.124)) * 127;
    rgb[i+1] = (1 + Math.sin((i+pos)*0.1654)) * 127;
    rgb[i+2] = (1 + Math.sin((i+pos)*0.1)) * 127;
  }
};
function doLights() {
    
  if (logo % patterns.length === 0) {
    alpaca();
  } else {
    getPattern();
    SPI2.send4bit(rgb, 0b0001, 0b0011);
  }
}
var patternNumber = 0;
function changePattern() {
  patternNumber = (patternNumber+1) % patterns.length;
  getPattern = patterns[patternNumber];
}
var cycle = 1;
//setInterval(doLights, 200);

setInterval(function(e){
    doLights();
},200);

/*setInterval(function(e){
    alpaca();
    g.setColor(255, 255, 255);
    g.setPixel(9,7);
    g.flip();
    
    setTimeout(alpaca, 800);
}, 4000);*/

setTimeout(function (e) {
    logo++;
    changePattern();
}, 200);
//Executed when button pressed
setWatch(function (e) {
    logo++;
    changePattern();
}, "A5", { repeat:true, edge:'falling', debounce : 49.99923706054 });
SPI2.setup({"baud":3200000,"mosi":B15});
pinMode(B15, "af_output", true);
save();

const canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = 1400;
var y = 100;
var width = 300;
var height = 200;
var textx = 100;
var texty = 100;
var textWidth = 150;
var slantx = 350;
var slanty = 200;

function addNode(xCordinate, yCordinate, nodeDirection) {
    x = xCordinate;
    y = yCordinate;
    if (nodeDirection === "right") {
        slanntx = slantx * -1;
    }
    ctx.lineWidth = "6";
    ctx.strokeStyle = "black";
    ctx.rect(x, y, width, height);
    ctx.stroke();

    ctx.font = "30px Arial";
    ctx.fillText("20|a|50", x + textx, y + texty, textWidth);

    ctx.moveTo(x + width / 2, y + height);
    ctx.lineTo(x + width / 2 + slantx, y + height + slanty);
    ctx.stroke();

    x = x + slantx;
    y = y + height + slanty;
}

//Huffman Encoding
let n = 6;
let charArray = ['a', 'b', 'c', 'd', 'e', 'f'];
let charFrequency = [45, 13, 12, 16, 9, 5];




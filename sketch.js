//Global variables
var canvasSize = 1000;
let root;
let n;
let r;
let angle;
let step;
//
function setup() {
  //
  createCanvas(canvasSize, canvasSize);
  angleMode(RADIANS);
  //Create a root node at the center of the canvas
  var rootX = width / 2;
  var rootY = width / 2;
  root = new Node(rootX, rootY);
  /**
   * Setup vars for generating graph
   */
  var nodes = [];
  n = random(1, 6);
  r = n * 20;
  angle = 0;
  step = TWO_PI / n;
  maxDepth = 3;
  currentDepth = 0;
  //
  //
  var nodes = [];
  /** Recursively generate a graph, displaying it's nodes in a circular fashion */
  for (let index = 0; index < n; index++) {
    //
    //
    let rx = r * sin(angle);
    let ry = r * cos(angle);
    angle += step;
    //
    let node = new Node(rx + rootX, ry + rootY);
    //
    node.parent = root;
    //
    // Recurse
    addlayer(node, n, r, 0, step, rootX + rx, rootY + ry);
    //
    nodes.push(node);
  }
  root.children = nodes;
  print(nodes);
}

function addlayer(root, n, r, angle, step, rootX, rootY) {
  let nodes = [];
  for (let index = 0; index < n; index++) {
    //
    //
    let rx = r * sin(angle);
    let ry = r * cos(angle);
    angle += step;
    //
    let node = new Node(rx + rootX, ry + rootY);
    //
    node.parent = root;
    //
    nodes.push(node);
  }
  root.children = nodes;
}

function draw() {
  background(20);
  //
  root.display();
}
//

var i = 0;

class Node {
  constructor(posX, posY, children) {
    this.x = posX;
    this.y = posY;
    this.parent = null;
    this.children = children;
  }

  display() {
    stroke(255);
    strokeWeight(4);
    ellipse(this.x, this.y, 20, 20);
    //
    if (this.parent != null) {
      line(this.x, this.y, this.parent.x, this.parent.y);
    }
    //
    //draw children if they exist
    if (this.children != null && this.children.length != 0)
      this.children.forEach((element) => {
        element.display();
      });
  }
}

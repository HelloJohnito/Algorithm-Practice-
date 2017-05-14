//chapter4

//set ups
//
// class Link {
//   constructor(value){
//     this.value = value;
//     this.next = null;
//   }
// }
//
// class Tree {
//   constructor(value){
//     this.value = value;
//     this.left = null;
//     this.right = null;
//   }
// }
//
//
// a = new Tree("a")
// b = new Tree("b")
// c = new Tree("c")
// d = new Tree("d")
// e = new Tree("e")
// f = new Tree("f")
// g = new Tree("g")
// h = new Tree("h")
//
// a.left = b
// a.right = c
// b.left = d
// b.right = e
// c.left = f
// c.right = g
// d.left = h

//implement BFS and DFS for a graph

class Node {
  constructor(value){
    this.value = value;
    this.edges = [];
  }
}

let a = new Node("a");
let b = new Node("b");
let c = new Node("c");
let d = new Node("d");
let e = new Node("e");

a.edges.push(b);
b.edges.push(c);
c.edges.push(d);
d.edges.push(e);
d.edges.push(b);
e.edges.push(a);

function bfs(node, target){
  let visited = new Set();
  let queue = [];
  queue.push(node);

  while(queue.length !== 0){
    // console.log(queue)
    let currentNode = queue.shift();
    if(!visited.has(currentNode)){ // Not visited
      visited.add(currentNode);
      if(currentNode.value === target) return currentNode;
      for(let i = 0; i < currentNode.edges.length; i++){
        queue.push(currentNode.edges[i]);
      }
    }
  }
  return false;
}

// dfs recursive

function dfs(node, target){
  let visited = new Set();

  function dfsRecursive(node, visited, target){
    if(node.value === target) return node;

    visited.add(node);
    for(let i = 0; i < node.edges.length; i++){
      if(!visited.has(node.edges[i])){
        return dfsRecursive(node.edges[i], visited, target);
      } else {
        return false;
      }
    }
  }
  return dfsRecursive(node, visited, target);
}

///////////////////////////////////////////////////////////
//create a Binary tree with ana array.

function createBinarySearchTree(array){

  if(array.length === 0){
    return null;
  }

  let mid = Math.floor(array.length / 2);
  let node = new Node(array[mid]);

  node.left = createBinarySearchTree(array.slice(0, mid));
  node.right = createBinarySearchTree(array.slice(mid + 1, array.length));
  return node;
}

// createBinarySearchTree([1,2,3,4,5,6,7,8]);

///////////////////////////////////////////////////////////////////
//List of depths
//Solution options:
//1) Use 2 queues to keep track of each level
//2) Begine by placing a root and a null then place a null inside after each level
//3) Use a level counter that keeps track of the elements in the level and a current counter which keeps track of how many nodes there are for the next round.

function levelDepths(head){
  let currrentCount = 1;//keeps track of the currrentCount
  let nextCount = 0; //counts up for the nextCount.
  let queue = [head];
  let current;
  let previousLink = null;
  let currentLink;
  let arrayOfHead =[];

  while(queue.length !== 0){
    currrentCount -= 1;
    current = queue.shift();
    currentLink = new Link(current.value); //Creates new Linked List Node.

    //check if the linked node is a head node.
    if(previousLink === null){
      arrayOfHead.push(currentLink.value);
    }

    //push child nodes into queue. Increment the next value
    if(current.left !== null){
      queue.push(current.left);
      nextCount += 1;
    }
    if(current.right !== null){
      queue.push(current.right);
      nextCount += 1;
    }

    //attach the linked lists
    if(previousLink !== null){
      previousLink.next = currentLink;
    }

    previousLink = currentLink;

    //reset if you are at the last node.
    if(currrentCount <= 0){
      currrentCount = nextCount;
      nextCount = 0;
      previousLink = null;
    }
  }

  return arrayOfHead;
}

///////////////////////////////////////////////////////////////
//Check if the tree is a balanced Tree. depth of two nodes has to be 1 or less.


function balancedTree(head){
  let stack = [{node: head, depth: 0}];
  let maxDepth = -Infinity;
  let minDepth = Infinity;

  while(stack.length){
    let current = stack.pop();

    //if current is a leaf
    if(current.node.left === null && current.node.right === null){
      maxDepth = Math.max(maxDepth, current.depth);
      minDepth = Math.min(minDepth, current.depth);

      //depth is greater than 1 short circuit
      if(Math.abs(maxDepth - minDepth) > 1){
        return false;
      }
    }

    //push the child into stack
    if(current.node.left) stack.push({node: current.node.left, depth: current.depth + 1 });
    if(current.node.right) stack.push({node: current.node.right, depth: current.depth + 1});
  }
  return true;
}

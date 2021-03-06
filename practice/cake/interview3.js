//reverse a Listed Link

function reverseLinkList(head){
  if(!head || !head.next){
    return "ListLink size too small";
  }
  let previous = null;
  let next = null;
  let current = head;

  while(current){
    next = current.next;
    current.next = previous;
    previous = current;
    current = next;
  }

  return previous;
}

////////////////////////////////////////////////////////////
//Find the kth to the end of a LinkedListNode

function kthToLastNode(k, node){

  let answer = node;
  let current = node;

  for(let i = 0; i < k; i++){
    current = current.next;
  }

  while(current){
    current = current.next;
    answer = answer.next;
  }
  return answer;
}

///////////////////////////////////////////////////////////////
//reverse a string inplace

function reverseString(string){
  let reverse = string.split("");
  let i = 0;
  let j = string.length - 1;
  let temp;

  while(i < j){
    temp = reverse[i];
    reverse[i] = reverse[j];
    reverse[j] = temp;
    i ++;
    j --;
  }
  return reverse.join("");
}

//////////////////////////////////////////////////////////////////////////////////
//reverseWords in a sentence.

function reverseWords(message) {

  var messageArray = message.split('');

  // first we reverse all the characters in the entire messageArray
  reverseCharacters(messageArray, 0, messageArray.length - 1);
  // this gives us the right word order
  // but with each word backwards

  // now we'll make the words forward again
  // by reversing each word's characters

  // we hold the index of the *start* of the current word
  // as we look for the *end* of the current word
  var currentWordStartIndex = 0;
  for (var i = 0; i <= messageArray.length; i++) {

      // found the end of the current word!
      if (i === messageArray.length || messageArray[i] === ' ') {

          // if we haven't exhausted the string our
          // next word's start is one character ahead
          reverseCharacters(messageArray, currentWordStartIndex, i - 1);
          currentWordStartIndex = i + 1;
      }
  }

  return messageArray.join('');
}

function reverseCharacters(messageArray, startIndex, endIndex) {

  // walk towards the middle, from both sides
  while (startIndex < endIndex) {

      // swap the front char and back char
      var temp = messageArray[startIndex];
      messageArray[startIndex] = messageArray[endIndex];
      messageArray[endIndex] = temp;
      startIndex++;
      endIndex--;
  }
}

//////////////////////////////////////////////////////////////////////
//parenthesis problem

function getClosingParen(sentence, openingParenIndex) {
  var openNestedParens = 0;

  for (var position = openingParenIndex + 1; position < sentence.length; position++) {
      var char = sentence[position];

      if (char === '(') {
          openNestedParens += 1;
      } else if (char === ')') {
          if (openNestedParens === 0) {
              return position;
          } else {
              openNestedParens -= 1;
          }
      }
  }

  throw new Error('No closing parenthesis :(');
}

////////////////////////////////////////////////////////////////
//stack parenthesis

function parenthesisParser(parenthesis){
  var stack = [];
  var open = [ '[' , '(' , '{' ];
  var close = [ ']' , ')' , '}' ];
  var pairs = {
    '[': ']',
    '(' : ')',
    '{' : '}'
  };

  for(let i = 0; i < parenthesis.length; i ++){
    let par = parenthesis[i];

    if(open.includes(par)){
      stack.push(par);
    } else if(close.includes(par)){
      if(!stack.length){
        return false;
      }else{
        let lastChar = stack.pop();

        if(pairs[lastChar] !== par){
          return false;
        }
      }
    }
  }
  return true;
}


////////////////////////////////////////////////////////////
// Permutation Palindrome

function hasPalindromePermutation(theString) {

  var unpairedCharacters = new Set();

  for (var i = 0; i < theString.length; i++) {
      var char = theString[i];

      if (unpairedCharacters.has(char)) {
          unpairedCharacters.delete(char);
      } else {
          unpairedCharacters.add(char);
      }
  }

  return unpairedCharacters.size <= 1;
}

////////////////////////////////////////////////////////////////
//permutation

function permutation(string){

  if(string.length <= 1){
    return [string];
  }

  var withoutLast = string.slice(0,-1);
  var lastChar = string[string.length -1];

  var permutationsWithoutLast = permutation(withoutLast);

  let allPermutations = [];

  for(let i = 0; i < permutationsWithoutLast.length; i++){
    let singlePermutation = permutationsWithoutLast[i];
    for(let position = 0; position <= singlePermutation.length; position++){
      let perm = singlePermutation.slice(0,position) + lastChar + singlePermutation.slice(position);
      allPermutations.push(perm);
    }
  }
  return allPermutations;
}

////////////////////////////////////////////////////////////////////////////////////////////////////// HighScore sorting

function unsorted(scores, highScore){

  let allPossibleScore = [];
  for(let i = 0; i <= highScore; i++){
    allPossibleScore.push(0);
  }

  for(let j = 0; j < scores.length; j++){
    let score = scores[j];
    allPossibleScore[score] ++;
  }

  let answer = [];
  for(let k = 0; k < highScore; k++){
    if(allPossibleScore[k] > 0){
      for(let m = 0; m < allPossibleScore[k]; m++)
        answer.push(k);
    }
  }
  return answer;
}

//////////////////////////////////////////////////
//Shuffle in place

//not in place

function getRandom(floor, ceiling) {
  return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
}

function notInPlaceShuffle(inputArray){
  let copy = inputArray;
  let answer = [];

  while(copy.length){
    let rand = getRandom(0,copy.length -1);
    let num = copy[rand];
    answer.push(num);
    copy.splice(rand,1);
  }
  return answer;
}


function inPlaceShuffle(inputArray){

  for(let index = 0; index < inputArray.length; index ++){
    let randomIndex = getRandom(index, inputArray.length -1);

    if(index !== randomIndex){
      let temp = inputArray[index];
      inputArray[index] = inputArray[randomIndex];
      inputArray[randomIndex] = temp;
    }
  }

  return inputArray;
}

//////////////////////////////////////////////////////////
// Riffle Shuffle

function isRiffleRecursive(cards, half1, half2, cardsIndex, index1, index2){

  cardsIndex = cardsIndex || 0;
  index1 = index1 || 0;
  index2 = index2 || 0;

  if(cardsIndex === cards.length) return true;

  if(half1.length !== index1 && half1[index1] === cards[cardsIndex]){
   index1 ++;
  }
  else if (half2.length !== index2 && half2[index2] === cards[cardsIndex]){
    index2 ++;
  } else {
    return false;
  }

  cardsIndex ++;
  return isRiffleRecursive(cards, half1, half2, cardsIndex, index1, index2);
}


function isRiffleIterative(cards, half1, half2){
  let index1 = 0;
  let index2 = 0;

  for(let cardIndex = 0; cardIndex < cards.length; cardIndex ++){
    if(index1 < half1.length && half1[index1] === cards[cardIndex]){
      index1 ++;
    }
    else if(index2 < half2.length && half2[index2] === cards[cardIndex]){
      index2 ++;
    }
    else{
      return false;
    }
  }

  return true;
}

////////////////////////////////////////////////////////////////////////////////////

//(1..n) range
//n + 1 length

//example [2,1,2,3,4] : range is 1 - 4 and length is 5. Find 2

//o(nlogn) solution

function findDuplicate(theArray){
  let floor = 1;
  let ceiling = theArray.length - 1;

  while (floor < ceiling){
    let midPoint = Math.floor((ceiling + floor) / 2);
    let lowerFloor = floor;
    let lowerCeiling = midPoint;
    let higherFloor = midPoint + 1;
    let higherCeiling = ceiling;

    let lengthOfLowerRange = lowerCeiling - lowerFloor + 1;
    let lowerBoundCount = 0;
    let element;

    for(let arrayIndex = 0; arrayIndex < theArray.length; arrayIndex ++){
      element = theArray[arrayIndex];

      if(element <= lowerCeiling && element >= lowerFloor) {
        lowerBoundCount += 1;
      }
    }


    if(lowerBoundCount > lengthOfLowerRange){
      //in the lower bound
      floor = lowerFloor;
      ceiling = lowerCeiling;
    } else {
      //in the upper bound
      floor = higherFloor;
      ceiling = higherCeiling;
    }
  }
  return floor;
}

//o(1) solution
function findDup(theArray){
  //first go to the end
  //find the length of the cycle
  //then stick with the length of the cycle to find the entry point of the cycle.
  //return the position of the cycle


  //since we are traversing through an array like a linked list, we start from the end.
  let headIndex = theArray.length;
  let tailIndex = headIndex;
  let arrayLength = theArray.length;

  //Go to the end of the list
  for(let i = 0; i <= arrayLength; i++){
    tailIndex  = theArray[tailIndex - 1];
  }

  //find the length of the cycle
  let cycleCount = 1;
  let currentIndex = theArray[tailIndex - 1];
  while(tailIndex !== currentIndex){
    cycleCount += 1;
    currentIndex = theArray[currentIndex - 1];
  }

  //stick
  tailIndex = headIndex;
  for(let i = 0; i < cycleCount; i ++){
    headIndex = theArray[headIndex - 1];
  }

  //find the first node in the cycle. this will be the value with multiple pointers
  //pointed to it. AKA Duplicated number
  while(tailIndex !== headIndex){
    headIndex = theArray[headIndex - 1];
    tailIndex = theArray[tailIndex - 1];
  }

  return tailIndex;
}

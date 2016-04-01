var utils = require('./../methods/utils.js');
var Checker = require('./../module/spellChecker.js');

function changeVowelAddLetters(word){
    // TODO Need to define global scope for VOWEL
    // TODO Re-factor
    word = word.toLowerCase();
    var VOWELS_LOWER = 'aeiou';
    var countVowels = 0, index;
    var len = word.length - 1;
    var newVowel, count = 0, i, randomCount, newWord = [], array = [];

    for(i = 0; i < len; i++){
        if(VOWELS_LOWER.indexOf(word[i])){
            count++;
        }
    }
    randomCount = utils.randomNum(1, count);

    // if word[i] is vowel change it to a different vowel
    for(i = 0; i <= len; i++){
        if(randomCount > 0 && VOWELS_LOWER.indexOf(word[i]) >= 0){
            newVowel = utils.getVowel(word[i]);
            newWord.push( newVowel );
            randomCount--;
        }else{
            newWord.push(word[i]);
        }
    }
    // Number of letters we need to do change [Max = len / 2]
    count = utils.randomNum(1, Math.floor(len / 2));

    // add random number of letters for a given letter a random position
    while(count > 0){
        randomCount = utils.randomNum(0, len);
        if(array.indexOf(randomCount) === -1){
            array.push(randomCount);
            count--;
        }
    }

    // to get highest index first in pop
    array.sort();

    // add letters to indexes in array
    while(array.length){
        randomCount = utils.randomNum(1, 3);
        index = array.pop();
        newWord = utils.addLetterAtIndex(newWord, newWord[index], index, randomCount);
    }

    // console.log(array);
    return newWord.join('');
}

module.exports = changeVowelAddLetters;

// console.log(changeVowelAddLetters('sleep'))

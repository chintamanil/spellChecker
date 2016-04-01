module.exports = (function() {

    /**
     * Function takes a vowel 'aeiou'. It returns an array of vowels excluding the current vowel
     *
     * @param  {[string]} letter    [vowel]
     * @param  {[string]} caseCheck [true= lower case]
     *
     * @return {[array]}           [array of vowels excluding input vowel]
     */
    function getVowels(letter, caseCheck) {
        var VOWELS_LOWER = ['a', 'e', 'i', 'o', 'u'];
        var VOWELS_UPPER = ['A', 'E', 'I', 'O', 'U'];
        var index = caseCheck ? VOWELS_UPPER.indexOf(letter) : VOWELS_LOWER.indexOf(letter);

        // check if index = '-1' means letter is not a vowel. In that case return false
        if (caseCheck) {
            return VOWELS_UPPER.slice(0, index).concat( VOWELS_UPPER.slice(index + 1) );
        }
        return VOWELS_LOWER.slice(0, index).concat( VOWELS_LOWER.slice(index + 1) );
    }

    function toLowerCase(word) {
        return word.toLowerCase();
    }

    /**
     * for a given word it changes at the given index it replaces the letter with input vowel.
     *
     * @param  {[string]} word  input word
     * @param  {string} vowel vowel to replace at index
     * @param  {number} index index at which vowel needs to be replaced
     *
     * @return {[type]}       [modified word]
     */
    function changeVowel(word, vowel, index) {
        return word.slice(0, index).concat( vowel ).concat( word.slice(index + 1) );
    }

    /**
     * Function takes an input string and trie data structure.
     * It checks each letter in the string. If it a vowel it changes it to other vowel and tries to find
     * match in trieInstance
     *
     * @param  {[string]} strIn        [Input String to Check]
     * @param  {[Trie]} trieInstance [Instance of Trie Data Structure]
     *
     * @return {[string]}              [returns found string after vowel change OR returns false if not found]
     */
    function vowelChange(strIn, trieInstance) {
        var vowels = 'aeiou';
        var res = false;

        function permute(prefix, str) {
            var n = str.length;
            var i, temp, word, testWord, j, letter, tempWord;

            for (i = 0; i < n; i++) {
                if (vowels.indexOf(str[i]) >= 0) {
                    temp = getVowels(str[i]);
                    for (j = 0; j < temp.length; j++) {
                        letter = temp[j];
                        word = changeVowel(str.slice(i), letter, 0);
                        testWord = prefix.concat( str.slice(0, i) ).concat( word );
                        tempWord = testWord.join('');
                        if (trieInstance.find(tempWord) && !res) {
                            res = tempWord;
                            return res;
                        }
                        if (!res) {
                            permute( prefix.concat( str.slice(0, i) ).concat( word[0] ), word.slice(1));
                        }
                    }
                }
            }
            return res;
        }
        return permute([], strIn.split(''));
    }

    /**
     * Function iterates over a string to see if any letter is in a consecutive order.
     * If so it returns count & start end Index of that letter
     *
     * @param  {[string]} str [input string]
     *
     * @return {[object]}     [if consecutive  returns ]
     */
    function findCount(str){
        // TODO  can this be REFACTORED?
        var len = str.length - 1, count = 0;
        var i = 0, j = 1, cur =  str[0], prev = '';

        while(prev !== cur && i <= len ){
            prev = cur;
            i++;
            cur = str[i];
        }
        prev = i - 1;
        while(str[i] === cur && i <= len){
            i++;
        }
        count = i - prev;
        if(i === len - 1 && count <= 1){
            return false;
        }
        return {
            count: count,
            prevIndex: prev,
            nextIndex: i
        };
    }

    /**
     * If a string has constitutive letters it keeps reducing the count of that letter by 1 and adds to array.
     * It dose this in s recursive manner so strings like 'ttoo' are  treaded as shown in @example
     *
     * @param  {[string]} str [input string]
     *
     * @return {[array]}     [resulting array]
     *
     * @example  {'tttoo'}   ['ttoo', 'too', 'tto', 'to']
     */
    function repeatValues(str){
        var result = [];
        function permuteValues(base, stringIn){
            var part1, part2, part3, temp, obj;
            var j = 1;
            var len = stringIn.length;

            obj = findCount(stringIn);
            while(obj && j < obj.count){
                part1 = stringIn.slice(0, obj.prevIndex);
                part2 = stringIn.slice(obj.prevIndex, obj.nextIndex - j);
                part3 = stringIn.slice(obj.nextIndex, len);
                temp = base.concat( part1 ).concat( part2 ).concat( part3 );
                result.push(temp.join(''));
                if(part3.length){
                    permuteValues(base.concat( part1 ).concat( part2 ), part3);
                }
                j++;
            }
            return result;
        }
        return permuteValues([], str.split(''));
    }

    function randomNum(min, max){
        return Math.round(Math.random() * (max - min) + min);
    }

    function getVowel(letter){
        var vowels = getVowels(letter, false);
        var random = randomNum(0, vowels.length - 1);

        return vowels[random];
    }

    function addLetterAtIndex(word, letter, index, numberOftimes) {
        var i = 1;
        var newLetter = [letter];
        while(i < numberOftimes){
            newLetter.push( letter);
            numberOftimes--;
        }
        return word.slice(0, index).concat( newLetter).concat( word.slice(index));
    }

    return {
        addLetterAtIndex: addLetterAtIndex,
        randomNum: randomNum,
        toLowerCase: toLowerCase,
        changeVowel: changeVowel,
        vowelChange: vowelChange,
        repeatValues: repeatValues,
        getVowels: getVowels,
        findCount: findCount,
        getVowel: getVowel
    };

})();

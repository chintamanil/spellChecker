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
        var VOWELS_LOWER = 'aeiou';
        var VOWELS_UPPER = 'AEIOU';
        var index = caseCheck ? VOWELS_UPPER.indexOf(letter) : VOWELS_LOWER.indexOf(letter);

        // check if index = '-1' means letter is not a vowel. In that case return false
        if (caseCheck) {
            return VOWELS_UPPER.substr(0, index) + VOWELS_UPPER.substr(index + 1).split('');
        }
        return (VOWELS_LOWER.substr(0, index) + VOWELS_LOWER.substr(index + 1)).split('');
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
        return word.substr(0, index) + vowel + word.substr(index + 1);
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
            var i, temp, word, testWord, j, letter;

            for (i = 0; i < n; i++) {
                if (vowels.indexOf(str[i]) >= 0) {
                    temp = getVowels(str[i]);
                    for (j = 0; j < temp.length; j++) {
                        letter = temp[j];
                        word = changeVowel(str.substring(i), letter, 0);
                        testWord = prefix + str.substring(0, i) + word;
                        if (trieInstance.find(testWord) && !res) {
                            res = testWord;
                            return res;
                        }
                        if (!res) {
                            permute(prefix + str.substring(0, i) + word[0], word.substring(1));
                        }
                    }
                }
            }
            return res;
        }
        return permute('', strIn);
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
        var len = str.length, count = 0;
        var i = 0, j = 1, cur =  str[0], prev = '';
        while(prev !== cur && i < len - 1 ){
            prev = cur;
            i++;
            cur = str[i];
        }
        prev = i - 1;
        while(str[i] === cur && i < len - 1){
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

            if(stringIn.length <= 1){
                return false;
            }
            obj = findCount(stringIn);
            while(obj && j < obj.count){
                part1 = stringIn.substring(0, obj.prevIndex);
                part2 = stringIn.substring(obj.prevIndex, obj.nextIndex - j);
                part3 = stringIn.substring(obj.nextIndex, len);
                temp = base + part1 + part2 + part3;
                result.push(temp);
                permuteValues(base + part1 + part2, part3);
                j++;
            }
            return result;
        }
        return permuteValues('', str);
    }

    return {
        getVowels: getVowels,
        toLowerCase: toLowerCase,
        changeVowel: changeVowel,
        vowelChange: vowelChange,
        repeatValues: repeatValues,
        findCount: findCount
    };

})();
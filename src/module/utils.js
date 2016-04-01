module.exports = (function() {

    function getVowels(letter, caseCheck) {
        var VOWELS_LOWER = 'aeiou';
        var VOWELS_UPPER = 'AEIOU';
        var index = caseCheck ? VOWELS_UPPER.indexOf(letter) : VOWELS_LOWER.indexOf(letter);

        if (caseCheck) {
            return VOWELS_UPPER.substr(0, index) + VOWELS_UPPER.substr(index + 1).split('');
        }
        return (VOWELS_LOWER.substr(0, index) + VOWELS_LOWER.substr(index + 1)).split('');
    }

    function toLowerCase(word) {
        return word.toLowerCase();
    }

    function changeVowel(word, vowel, index) {
        return word.substr(0, index) + vowel + word.substr(index + 1);
    }

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

    function findCount(str){
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

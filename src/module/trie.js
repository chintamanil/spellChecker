
(function() {

    /**
     * Trie Data structure is used  'here' to maintain a dictionary(actual one)
     * It stores string value as as a trie data structure.
     * this.trie = dictionary
     * this.misspelledCache = cache that stores errorSpeelings & its correct values
     */
    function Trie() {
        this.trie = {};
        this.misspelledCache = {};
    }

    /**
     * add series of string to dictionary
     *
     * @param {[string]} str [e.g 'word1 word2 word3']
     */
    Trie.prototype.addSeries = function(str) {
        // TODO check type of str add try catch
        var i;
        var words = str.split(' ');
        for (i = 0; i < words.length; i++) {
            this._add(words[i], this.trie);
        }
        return this;
    };

    /**
     * add a word
     *
     * @param {[string]} word
     */
    Trie.prototype.add = function(word) {
        // TODO check word type
        return this._add(word, this.trie, true);
    };

    /**
     * find word
     *
     * @param  {[string]} word [word to find in dictionary]
     *
     * @return {[string]}      [found word]
     */
    Trie.prototype.find = function(word) {
        // TODO check if word is a string
        return this._find(word, this.trie, false);
    };

    /**
     * Finds if  a word which is not found in dictionary is saved in cache
     *
     * @param  {[string]} errorWord [description]
     *
     * @return {[string]}           [description]
     */
    Trie.prototype.findSpellErrorInCache = function(errorWord){
        // TODO check if errorWord is  a string
        return this._find(errorWord, this.misspelledCache, true);
    };

    /**
     * If a word is not found in dictionary and is found to be a spelling mistake
     * then its added to cache
     *
     * @param {[string]} errorWord   [word which was misspent]
     * @param {[string]} correctWord [correct word]
     */
    Trie.prototype.addSpellErrorInCache = function(errorWord, correctWord){
        // TODO check type
        return this._add(errorWord, this.misspelledCache, {$: correctWord});
    };

    /**
     * returns the map of entire 'dictionary'
     *
     * @return {[trie Hash map]} [description]
     */
    Trie.prototype.toObject = function() {
        return this.trie;
    };

    /**
     * returns the map of Cache of misspell words
     *
     * @return {[trie hash map]} [description]
     */
    Trie.prototype.toObjectCache = function() {
        return this.misspelledCache;
    };

    Trie.prototype.build = function(readFile){
        return this._build(readFile);
    };

    Trie.prototype._add = function(word, cur, mispelled) {
        mispelled = mispelled || true;
        var j, letter, pos;
        var letters = word.split('');

        // check if word is already in dictionary before addition
        for (j = 0; j < letters.length; j++) {
            letter = letters[j];
            pos = cur[letter];
            if (!pos) {
                cur = cur[letter] = j === letters.length - 1 ? mispelled : {};
            } else if (pos === true) {
                cur = cur[letter] = { $: mispelled };
            } else {
                cur = cur[letter];
            }
        }
    };

    Trie.prototype._find = function(word, trie, isErrorWord) {
        var first = word[0];

        // isErrorWord is checking if we are looking for a word that was misspent
        function _errorCheck(cur, position){
            return isErrorWord ? cur : position;
        }

        if (word.length === 1) {
            if (typeof trie[first] === 'object' && trie[first].$){
                return _errorCheck(trie[first], trie[first].$);
            }else if (trie[first] === true){
                return _errorCheck( trie[first], trie[first].$);
            }
            return false;
        }
        if (trie[first]){
            return this._find(word.slice(1), trie[first]);
        }
        return false;
    };

    Trie.prototype._build = function(file){
        var words = file.replace(/\n/g, '').split(' ');
        var i, word, l, cur;

        for (i = 0, l = words.length; i < l; i++) {
            word = words[i];
            cur = this.trie;
            this._add(word, cur);
        }
    };

    module.exports = Trie;

})();

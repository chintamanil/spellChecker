
(function() {

function Trie() {
    this.trie = {};
    this.misspelledCache = {};
}

Trie.prototype.addSeries = function(str) {
    var i;
    var words = str.split(' ');
    for (i = 0; i < words.length; i++) {
        this._add(words[i], this.trie);
    }
    return this;
};

Trie.prototype.add = function(word) {
    return this._add(word, this.trie, true);
};

Trie.prototype.find = function(word) {
    return this._find(word, this.trie, false);
};

Trie.prototype.findSpellErrorInCache = function(errorWord){
    return this._find(errorWord, this.misspelledCache, true);
};

Trie.prototype.addSpellErrorInCache = function(errorWord, correctWord){
    return this._add(errorWord, this.misspelledCache, {$: correctWord});
};

Trie.prototype.toObject = function() {
    return this.trie;
};

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

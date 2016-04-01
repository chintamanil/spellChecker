var Trie = require('./trie.js');
var Validate = require('./validate.js');

var file = require('fs').readFileSync('./../dict/string2.txt', 'utf8');

var Checker = (function() {
    var _dictonaries, _private;
    var _options = {
        lowerCase: true,
        vowel: true,
        multiple: true
    };
    _dictonaries = {};
    _dictonaries.en = new Trie();
    _private = {
        find: function(word, dictType ) {
            dictType = dictType || 'en';
            if(_options.lowerCase){
                if(_dictonaries[dictType].find(word.toLowerCase())){
                    return word;
                }
            } // add else loop
            return Validate.checkSpelling(_options, _dictonaries[dictType], word);
        },

        build: function(dictFile, dictType){
            dictType = dictType || 'en';
            _dictonaries[dictType].build(dictFile);
        },
        add: function(word, dictType){
            dictType = dictType || 'en';
            _dictonaries[dictType].add(word);
        },
        setOptions: function( args ) {
            var each;
            // check args type == obj
            for (each in args){
                if(_options.hasOwnProperty(each) && typeof (args.each) === 'boolean'){
                    _options.each = args.each;
                }
            }
        },

        getOptions: function(){
            return _options;
        }
    };

    return {
        build: _private.build,
        setOptions: _private.setOptions,
        getOptions: _private.getOptions,
        find: _private.find,
        add: _private.add,
        facade: function( args ) {
            _private.setOptions(args);
            _private.getOptions();
            if ( args.run ) {
                _private.run();
            }
        }
    };
})();
Checker.add('conspiracy');
Checker.build(file);
console.log(
    // Checker.find('sleeeep'),
    // Checker.find('weke'),
    Checker.find('sheeple')
    )


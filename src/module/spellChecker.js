(function() {

    var Trie = require('./trie.js');
    var Validate = require('./../methods/validate.js');

    // TODO use try catch here
    var file = require('fs').readFileSync('./../dict/string2.txt', 'utf8');

    /**
     * Function profides a Facde to the Validatie method for spell checking.
     *  First it checks it input string is in dictionary if not then it asks the Validate method to check
     *  if it can do spelling correction
     *
     * @return {[type]}        [description]
     */
    var Checker = (function() {
        var _dictonaries, _private;
        var _options = {
            lowerCase: true,
            vowel: true,
            multiple: true
        };
        _dictonaries = {};

        // by defaul its creating a dictionary for 'en' based on input file.
        _dictonaries.en = new Trie();

        // private methods
        _private = {
            find: function(word, dictType ) {
                dictType = dictType || 'en';
                if(_options.lowerCase){
                    if(_dictonaries[dictType].find(word.toLowerCase())){
                        return word;
                    }
                } // add else loop TODO ?

                // Runs through the Spell Checker
                return Validate.checkSpelling(_options, _dictonaries[dictType], word);
            },

            build: function(dictFile, dictType){
                dictType = dictType || 'en';
                // check if dictionary was already built. If so return that one. or add to that TODO
                _dictonaries[dictType].build(dictFile);
            },

            add: function(word, dictType){
                // TODO chechk typeof word and dictType
                dictType = dictType || 'en';
                _dictonaries[dictType].add(word);
            },

            setOptions: function( args ) {
                // TODO write test for this
                var each;
                // check args type == obj TODO
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
            setOptions: _private.setOptions,
            getOptions: _private.getOptions,
            build: _private.build,
            find: _private.find,
            add: _private.add
        };

    })();

    // Every file was tested with unit tests inside that file as below
    // Checker.add('conspiracy');
    // Checker.build(file);
    // console.log(
    //     Checker.find('sleeeep'),
    //     Checker.find('weke'),
    //     Checker.find('sheeple')
    //     )

})();

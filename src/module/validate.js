var utils = require('./utils.js');

    /**
     * [module runs through the methods that  changes the word based on vowels
     *  or based on consecutive letter [e.g 'ttttt']. Generates variations of those and
     *  tries to to see if its in the dictionary
     *
     * @param  {[type]} args         [object to check for case, vowel & multiple]
     * @param  {[type]} trieInstance [instance of Trie data structure]
     * @param  {[type]} word         [word to operate on]
     *
     * @return {[string]}              [if correct word is found returns it OR returns 'NO CORRECTION']
     */
module.exports = (function() {

    var _private = {
        // For Validation when vowel is changed
        vowelValidate: function(args, trieInstance, word ){
            var check;
            if(args.vowel){
                check = utils.vowelChange(word, trieInstance);
                if(check){
                    // if it found the correct spelling it is add to the Error Cache in Dictionary
                    trieInstance.addSpellErrorInCache(word, check);
                    return check;
                }
            }
            return false;
        },

        // For validating when we change string with consecutive letter e.g ttt > tt > t
        validateMutiple: function(args, trieInstance, word ){
            var check, i;
            var listOfChecks = false;

            if(args.multiple){
                listOfChecks = utils.repeatValues(word);
                for (i = listOfChecks.length - 1; i >= 0; i--) {
                    check =  trieInstance.find( listOfChecks[i] );
                    if(check){
                        // if it found the correct spelling it is add to the Error Cache in Dictionary
                        trieInstance.addSpellErrorInCache(listOfChecks[i], check);
                        return{
                            result: listOfChecks[i]
                        };
                    }
                }
            }
            return listOfChecks;
        },

        // Main function that runs through all cases for args object
        validate: function(args, trieInstance, word ) {
            var check, i, listOfChecks;
            if(args.lowerCase){
                word = utils.toLowerCase(word);
            }
            check = trieInstance.findSpellErrorInCache(word);
            if(check){
                return check;
            }
            check = _private.vowelValidate(args, trieInstance, word );
            if(check){
                return check;
            }
            check = _private.validateMutiple(args, trieInstance, word );
            if(check.hasOwnProperty('result')){
                return check.result;
            }

            listOfChecks = check;
            if(args.multiple && args.vowel){
                for (i = listOfChecks.length - 1; i >= 0; i--) {
                    check = _private.vowelValidate(args, trieInstance, listOfChecks[i] );
                    if(check){
                        // if it found the correct spelling it is add to the Error Cache in Dictionary
                        trieInstance.addSpellErrorInCache(word, check);
                        return check;
                    }
                }
            }
            return 'NO CORRECTION';
        }
    };

    return {
        checkSpelling: _private.validate,
        vowelValidate: _private.vowelValidate,
        validateMutiple: _private.validateMutiple
    };

})();

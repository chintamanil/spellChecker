# Word Correction 

A program in JavaScript that reads a large list of English words (e.g. from /usr/share/dict/words on a unix system) into memory, and then reads words from stdin, and prints either the best spelling correction, or "NO CORRECTION" if no suitable correction can be found.

The program prints "> " as a prompt before reading each word, and loops until killed.

# Installation
```
>npm install
```

# Run Test
```
>npm test
```

# Run for prompt 
```
> npm start
```


##For example:
    $node ./spellcorrecter.js
    > sheeeeep
    sheep
    > CUNsperrICY
    conspiracy
    > sheeple
    NO CORRECTION

The class of spelling mistakes to be corrected is as follows:

1. Case (upper/lower) errors `inSIDE -> inside`
2. Repeated letters `jjoobbb -> job`
3. Incorrect vowels `weke -> wake`
4. Any combination of the above types of errors `CUNsperrICY -> conspiracy`


Solution is faster than O(n) per word checked, where n is the length of the dictionary.
If there are many possible corrections of an input word, program can choose one in any way, 

## Incorrect Word Generator

A second program that generates words with spelling mistakes of the above form, starting with correctly spelled English words. Piped its output into the first program and verify that there are no occurrences of "NO CORRECTION" in the output.

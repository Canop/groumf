Groumf
======

Groumf lets you search and replace on strings or dom elements, in a browser or in node.

Groumf can be used when you have a big thesaurus (no problem with 100 000 expressions) and you want to fast search and replace those expressions in any text. Groumf doesn't need the expressions to be tokens or of any specific form.


## Usages :

* `replace(string)` : replace all occurences of the expressions by the corresponding value
* `replace(string, callback)` : replace all occurences of the expressions by what the callback returns (it receives the string and the corresponding value)
* `replace(string, string, string)` : equivalent to string.replace(string, string)
* `replace(string, regex, string)` : equivalent to string.replace(regex, string)
* `replace(string, regex, cb)` : equivalent to string.replace(regex, cb)

When the first argument isn't a string but an element, the replacement is applied (same arguments) on all text nodes descendant of that element. If the callback returns HTML, that HTML is inserted as HTML.


### Replacing expressions based on a thesaurus with a callback, in HTML elements

In this exemple, we want to replace words with links in html messages.
	
	// Initialization of the replacer
	var replacer = new Groumf();
	replacer.skipTags('a'); // don't replace inside <a> elements
	replacer.add("Some Name", 123456);
	...
	replacer.add("Pretty Name!", 654321);

	// replacements of an html message
	replacer.replace(domElement, function(name, id){
		return '<a href="http://test.com/users/'+id+'">'+name+'</a>'
	});

### Replacing strings with other strings, in strings

	var replacer = new Groumf();
	replacer.add("π/2", "1.57");   // will only replace π/2, not 3π/2 or π/20
	replacer.add("2π/3", "2.094");
	replacer.add("2π/33", "0.19"); // has priority over 2π/3
	replacer.add("3π/7", "1.346");
	var outputString = replacer.replace(inputString);
	
### Reversing the words in all text nodes of a page

	(new Groumf).replace(document.body, /\w+/g, function(s){
		return s.split('').reverse().join('')
	});

## Limitations :

1. Groumf doesn't currently support expressions of less than 3 characters.

## Tests :

There's a test suite for core Groumf functions. To execute it, install buster globally then run

    buster-test

## Licence :

MIT

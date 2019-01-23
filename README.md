Groumf
======

[![Chat on Miaou](https://miaou.dystroy.org/static/shields/room-en.svg?v=1)](https://miaou.dystroy.org/8?Javascript)

Groumf lets you search and replace on strings or dom elements, in a browser or in node.

You can use one or both of the two complementary features :

1. Search and replace on the text nodes of a DOM tree (with the capability to insert HTML nodes)
2. Thesaurus (and optionnally callback) based search and replace

When using a thesaurus, you can make it big (no problem with 100 000 expressions) and you can make them any form (at least 3 chars) : no problem with multi-words expressions or expressions containing special characters. Groumpf is cautious enough not to replace "super car" in "super cargo" and will choose the longest expression when more than one apply.

When working on a DOM tree, you may choose the safety of having the replacement inserted as text (thus preventing injections) or the power of HTML insertion (convenient when you want to replace names with links to profiles, for example). You can also use Groumpf on a DOM tree without thesaurus but with a regular expression and a callback.


## Usage

Those functions are called on an instance of Groumf, optionnaly parameterized.

### replaceInString

* `groumpf.replaceInString(string)` : replace all occurences of the thesaurus expressions by their corresponding values
* `groumpf.replaceInString(string, callback)` : replace all occurences of the expressions by what the callback returns (it receives the string and the corresponding value)

### replaceTextWithTextInHTML

* `groumpf.replaceTextWithTextInHTML(element)` : replace all occurences of the expressions by the corresponding values in all text nodes descendant of the element
* `groumpf.replaceTextWithTextInHTML(element, callback)` : replace all occurences of the expressions by what the callback returns in all text nodes descendant of the element
* `groumpf.replaceTextWithTextInHTML(element, regex, callback)` : similar to someString.replace(regex, callback) but applied to all text nodes descendant of the element

### replaceTextWithHTMLInHTML

* `groumpf.replaceTextWithHTMLInHTML(element)` : replace all occurences of the expressions by the corresponding values in all text nodes descendant of the element, but the value is inserted as HTML
* `groumpf.replaceTextWithHTMLInHTML(element, callback)` : replace all occurences of the expressions by what the callback returns in all text nodes descendant of the element, but the return of the callback is inserted as HTML
* `groumpf.replaceTextWithHTMLInHTML(element, regex, callback)` : similar to someString.replace(regex, callback) but applied to all text nodes descendant of the element, but the return of the callback is inserted as HTML

## Examples

### Replacing expressions based on a thesaurus with a callback, in HTML elements

In this exemple, we want to replace words with links in html messages.

	// Initialization of the replacer
	var replacer = new Groumf();
	replacer.skipTags('a'); // don't replace inside <a> elements
	replacer.add("Some Name", 1);
	...
	replacer.add("Pretty Name!", 54321);

	// replacements of an html message
	replacer.replaceTextWithHTMLInHTML(domElement, function(name, id){
		return '<a href="http://test.com/users/'+id+'">'+name+'</a>'
	});

### Replacing strings with other strings, in strings

	var replacer = new Groumf();
	replacer.add("π/2", "1.57");   // will only replace π/2, not 3π/2 or π/20
	replacer.add("2π/3", "2.094");
	replacer.add("2π/33", "0.19"); // has priority over 2π/3
	replacer.add("3π/7", "1.346");
	var outputString = replacer.replaceInString(inputString);

### Italizing big numbers

	Groumf.replaceTextWithHTMLInHTML(document.body, /\b\d{5,}\b/g, function(s){
		return '<i>'+s+'</i>'
	});

`Groumf.replaceXXX` is a shortcut to `(new Groumf).replaceXXX`.

### Reversing the words in all text nodes of a page

	Groumf.replaceTextWithTextInHTML(document.body, /\w+/g, function(s){
		return s.split('').reverse().join('')
	});

This operation never creates any node, it just changes the text of the existing one.

## Tests :

There's a test suite for Groumf functions on strings. To execute it, install buster globally then run

    buster-test

## Licence :

MIT

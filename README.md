# qoo
tiny jquery-like library with basic functions and chaining

Minimal standalone JS library for DOM manipulation

qoo.js is around 300 lines of code (1.5 Kb compressed) JavaScript library for basic DOM manipulation.
It has jQuery like syntax and supports chaining.

Syntax demos:

```

q(".my-class[data-attr='123']")
    .css("background-color:yellow;")
    .html("Hello World!");

q("#elem").on("myEvent", function(){
  q("#someDiv").css("color:#fff;");
});

q('#elem').trigger('myEvent', {eventId: 123});

q.extend(true, options, {a: 1, b: {c: 2}}, {b: {d: 3}}); 

```

It works in IE11 and later.

`q.typeOf()` uses `Object.prototype.toString` to detect type of expression 

```javascript
q.typeOf(1); // Number
q.typeOf(''); // String
q.typeOf(true); // Boolean
q.typeOf([]); // Array
q.typeOf({}); // Object
q.typeOf(function(){}); // Function
q.typeOf(document.querySelector('div')); // HTMLDivElement
q.typeOf(document.querySelectorAll('div')); // NodeList
q.typeOf(null); // Null
q.typeOf(); // Undefined
```

### Methods:

n  
first  
last  
each  
css  
attr  
removeAttr  
on  
trigger  
addClass  
toggleClass  
removeClass  
html  
text  
insertBefore  
insertAfter  
insertFirst  
insertLast  
empty  
parent  
siblings  
children  
find  
closest  
remove  
is  
offset  
data  


### Utils

isMobile  
extend  
throttle  
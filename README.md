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

### Methods:

n  
first  
last  
each  
css  
cssdom  
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
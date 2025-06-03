---
title: Genesis
description: |
  welcome to hnblog
  spam spam spam spam spam spam spam spam spam
  spam spam spam spam spam spam spam spam spam
  spam spam spam spam spam spam spam spam spam
  spam spam spam spam spam spam spam spam spam
  spam spam spam spam spam spam spam spam spam
  spam spam spam spam spam spam spam spam spam
  spam spam spam spam spam spam spam spam spam
  spam spam spam spam spam spam spam spam spam
  spam spam spam spam spam spam spam spam spam
  spam spam spam spam spam spam spam spam spam
  spam spam spam spam spam spam spam spam spam
  spam spam spam spam spam spam spam spam spam
date: 17 May 2025 21:00:00 GMT+0900
authors:
  - megumin
  - cynthia
  - arilien
  - amia
  - arhsm
  - bignutty
  - dolfies
  - dydestroyer
  - dziurwa
  - haruka
  - marsh
  - puhbu
  - vocane
  - 11pixels
  - eva
  - jay
  - not-the-neller-man
---

## Headings

- # H1 Heading
- ## H2 Heading
- ### H3 Heading
- #### H4 Heading
- ##### H5 Heading
- ###### H6 Heading

## Emphasis

- **Bold text**
- _Italic text_
- **_Bold and italic text_**
- ~~Strikethrough text~~

## Custom Formatting Syntax

- Subscripts: H~2~O `H~2~O`
- Superscripts: O(n^2^) `O(n^2^)`
- Mark: ==marked== `==mark==`
- Abbreviations: HTML (defined in footnotes: `*[HTML]: Hyper Text Markup Language`)

## Lists

### Unordered Lists

- Item 1
- Item 2
  + Subitem 1
  + Subitem 2
- Item 3

### Ordered Lists

1. First item
2. Second item
  1. Subitem 1
  2. Subitem 2
3. Third item

## Task Lists

- [ ] Unchecked task
- [x] Checked task
- [ ] Another unchecked task

## Links

- [Inline link](https://www.example.com/)
- [Link with title](https://www.example.com/ "Example")
- https://www.example.com (Autolink)

## Images

- Remote Image  
  ![Alt text](https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png "Google Logo")
- Local Image  
  ![Alt text](/static/av/arhsm.256.png)

## Code

### Inline Code

Here is some inline `py print("Hello, world!")` code and this is
`not highlighted` but this is `JavaScript console.log("hii!!")`

### Code Blocks

```py
# hii

def greet(name):
    print(f"Hello, {name}!", 123)

greet("World")
```

This codeblock is expandable to save on space.

```js
function sayHello(name) {
    console.log("Hello, " + name + "!");
}

sayHello("World");

function foo(name) {
    console.log("Hello, " + name + "!");
}

foo("bar");

null
```

```rs
// this is a comment

use std::mem::transmute;

const STR: &str = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

fn main() {
    let mut i: usize = 0;

    i += 1;

    _ = unsafe {
        mem::transmute::<usize, isize>(i)
    };
}
```

```
No language specified
This is a plain code block.
```

## Horizontal Rule

---

## Blockquotes

> This is a blockquote.
> It can span multiple lines.
> > And even be nested.

## Tables

| Header 1 | Header 2 | Header 3 | Header 3 | Header 3 | Header 3 | Header 3 | Header 3 | Header 3 | Header 3 | Header 3 | Header 3 | Header 3 | Header 3 | Header 3 |
| -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| Cell 1   | Cell 2   | Cell 3   | Cell 3   | Cell 3   | Cell 3   | Cell 3   | Cell 3   | Cell 3   | Cell 3   | Cell 3   | Cell 3   | Cell 3   | Cell 3   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   | Cell 6   | Cell 6   | Cell 6   | Cell 6   | Cell 6   | Cell 6   | Cell 6   | Cell 6   | Cell 6   | Cell 6   | Cell 6   | Cell 6   |

## HTML

<p>This is some HTML text.</p>
<marquee>Test</marquee>
<br>
<hr>

## Line Breaks

This is a line.<br>
This is another line.

This is a line.\
This is another line.

This is a line.  
This is another line.

## Escaping

\* \* \* \* \*

## Special Characters

` ~ ! @ # $ % ^ & * ( ) - _ = + [ ] { } | ; : ' " , . / < > ?

## Emojis

😀 😁 😂 😃 😄 😅 😆 😇 😉 😊

## Footnotes

This is some text[^1l] with a footnote.[^1]

Link References.[^1l]

This refers to number two.[^2]

---

*[HTML]: Hyper Text Markup Language

[^1l]:[This is a Link Reference](https://google.com)


[^1]:## Hello World

    Paragraph two of the definition.

    > A blockquote with
    > multiple lines.

    ```js
    console.log("hello world");
    console.log("hello world");
    console.log("hello world");
    console.log("hello world");
    console.log("hello world");
    console.log("hello world");
    console.log("hello world");
    console.log("hello world");
    console.log("hello world");
    console.log("hello world");
    console.log("hello world");
    console.log("hello world");
    console.log("hello world");
    console.log("hello world");
    console.log("hello world");
    console.log("hello world");
    console.log("hello world");
    console.log("hello world");
    console.log("hello world");
    console.log("hello world");
    console.log("hello world");
    console.log("hello world");
    console.log("hello world");
    console.log("hello world");
    console.log("hello world");
    console.log("hello world");
    console.log("hello world");
    console.log("hello world");
    console.log("hello world");
    ```

    | Header 1 | Header 2 |
    | -------- | -------- |
    | Cell 1   | Cell 2   |

    A `final` paragraph before list.[^2]

    - Item 1
    - Item 2
      - Subitem 1
      - Subitem 2

[^2]: This is Footnote 2. Footnote 2 Depends on technology,[^1l] as well as advanced technology.[^2l]


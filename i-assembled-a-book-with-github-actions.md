# I assmebled a book with GitHub actions

I recently found this project and wanted to share it.

Back in the days when I was writing a book about affiliate marketing called "Next level Taschengeld" ("Taschengeld" -> "Pocket money") which explains to you how my friend and I created affiliate sites that genereted some revenue.

Although I am not behind the topic any more, the book creation was a great workflow for two devs that collaborated via git.

## Building locally pdf and epub
Building the book locally requires a few programs:
- pdflatex (pdfengine to convert pandoc formats to pdf)
- pandoc (converts input formats like markdown to other formats)
- GNU Make

```Makefile
all: all-before dist/book.epub dist/book.pdf

all-before:
	mkdir -p dist

dist/book.epub: $(wildcard chapters/*) $(wildcard resources/**/*) Makefile
	pandoc --toc --toc-depth=2 -f markdown --css resources/styling.css -o dist/book.epub chapters/* \
	       --epub-cover-image=./resources/cover.jpg
	

dist/book.pdf: $(wildcard chapters/*) $(wildcard resources/**/*) Makefile
	pandoc --toc --toc-depth=2 -f markdown \
	       --css resources/styling.css \
	       -o dist/book.pdf chapters/* \
	       -V papersize=A5 \
	       -V documentclass=book \
	       -V mainfont="Proxima Nova" \
	       -V geometry:margin=0.95in \
	       --pdf-engine pdflatex \
	       --epub-cover-image=./resources/cover.jpg \
	       --highlight-style=monochrome

clean:
	rm -r dist
```

## GitHub action
The GitHub action is much simpler. It just runs make and looks like this

```yml
name: 'Compile'

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    container:
      image: pandoc/latex:2.9.2
      volumes:
        - ./:/data
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Install Make
        run: apk add --no-cache make
      - name: Run Make
        run: make all
      - name: Upload dist
        uses: actions/upload-artifact@v3
        with:
          name: book-dist
          path: dist/
```

It uses the pandoc/latex container which is perfectly fine and comes with everything except make.

I install make on that container and then I run make.

The generated artifacts are then published to the GitHub repository.

## Template repository
You can check out following repository, that reproduced it with public content.

https://github.com/RoyalZSoftware/the-history-of-sever-side-javascript-book/tree/pandoc-template

If you ever need to assemble something
# I assmebled a book with GitHub actions
In the year 2020 I released a book, written with a friend, called "Next level Taschengeld".
We were both tech nerds back then and decided to write the book completely in markdown with the assistance of git.

I recently found this project again and wanted to share some lessons about it.

## About the book
The word Taschengeld stands for pocket money in German. It is about building sustainable affiliate marketing websites within a niche, where not a lot of competitors exist.

Although I am not behind the topic any more today, it taught me a lot about writing structured and expressing my thoughts as simple as possible.

## Creating a pdf and epub
We wanted to bundle all the markdown files, located in the `src` directory of the repository, into a single `pdf` and `epub`.

For this I opted for the following tool stack:
- pandoc (converts input formats like markdown to other formats)
- pdflatex (pdfengine to convert pandoc formats to pdf)
- GNU Make (to fixate the pandoc commands for everybdoy)

### The final makefile

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

### Bundling this into a GitHub action
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

It uses the `pandoc/latex` container, which ships with everything I need besides make.

To solve the puzzle, I just needed to install make on that container and fire!

With the action `actions/upload-artifact` the pipeline uploads the generated artifacts to the internal store, where they can be downloaded.

## Template repository
Are you planning to step into my footsteps? You can find the repository here and reuse the code.

https://github.com/RoyalZSoftware/the-history-of-sever-side-javascript-book/tree/pandoc-template

## Conclusion
The book didn't sell. But it was a great project for learning how to write more structured and to learn about pandocs incredible superpowers.

Did you like the post?
Share your thoughts in the comments and consider subscribing to the newsletter.
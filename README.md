A personal blog about mathematics. 

# Contributions are Always Welcome 

The only thing I ask is that contributions be strictly related to what's in this
repository's tex files. Everything else in this repo is essentially just 
plumbing to display mathematical content and I'd prefer that contributers only 
be worried about correcting/expanding the mathematical content. 

After editing the tex documents, be sure to run whatever latex compilation 
process you use on the corresponding `main.tex` file. If any auxiliary files 
that aren't required for the compilation pop up that aren't the pdf, please add 
them to the `.gitignore` file. Also be sure to run 
`node scripts/latex_to_html.js <path to post directory>` from the root of the 
repository to generate the corresponding html for the website.

## A Coding Standard

Where possible, keep your code's column width constrained to 80 characters or 
below.

Try not to linebreak math delimiters like \\(\\) unless you absolutely must in 
order to keep the code width below 80 characters.

# Installation Requirements for Contributing

Please install:

1. LatexML that can be found at https://math.nist.gov/~BMiller/LaTeXML/
3. pdflatex
2. Node JS 

# Testing Locally 

1. Clone the repository and run `pnpm install`
2. Run `pnpm local`

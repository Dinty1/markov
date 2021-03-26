# Markov

## Prerequisites
Please make sure that you have [Node.JS](https://nodejs.org/en/) and [Git](https://git-scm.com/downloads) installed.

## Cloning 
Navigate to the folder where you want to store the repository, open the command prompt and run `git clone https://github.com/Dinty1/markov`

## Running
Navigate into the `src` directory and run the following commands (in order):
1. `node`
2. `.load index.js`

## Adding new text
Open `data/load.txt` in notepad (or any other text editor) and add whatever you want to be analysed
Run the following commands (after having run the previous two):
1. `loadText()`
2. `analyse()`

## Generating
Run `generate(number)` to generate text

## Other stuff
If you want to clear all text, navigate to `data/loaded.json` and replace the contents with `[]`.
You can open the command prompt from Windows Explorer by navigating to the address bar at the top, typing `cmd` and pressing enter.

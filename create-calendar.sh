#!/bin/bash
SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
echo $SCRIPT_DIR
for i in {1..24}
  do 
    cd $SCRIPT_DIR/src
    folder="day${i}"
    mkdir $folder
    cd $folder
    touch "input.test.txt"
    touch "input.txt"
    touch "index.js"
done

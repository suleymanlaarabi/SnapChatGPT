#!/bin/bash
rollup -c

fichier_js="./dist/bundle.js"
name_temp=$(jq -r ".snapModule.name" "./package.json")
name=$(echo "$name_temp" | tr '[:upper:]' '[:lower:]')
displayName=$(jq -r ".snapModule.displayName" "./package.json")
description=$(jq -r ".snapModule.description" "./package.json")
version=$(jq -r ".snapModule.version" "./package.json")
author=$(jq -r ".snapModule.author" "./package.json")


headers="// ==SE_module==
// name: $name
// displayName: $displayName
// description: $description
// version: $version
// author: $author
// ==/SE_module==

var networking = require(\"networking\");
var messaging = require(\"messaging\");
var config = require(\"config\");
var im = require(\"interface-manager\");
var ipc = require(\"ipc\");
var javaInterfaces = require(\"java-interfaces\");
var hooker = require(\"hooker\");
var events = require(\"events\");

"

if [ ! -e "$fichier_js" ]; then
  echo "Le fichier '$fichier_js' n'existe pas."
  exit 1
fi

tempfile=$(mktemp)
echo "$headers" > "$tempfile"
cat "$fichier_js" >> "$tempfile"
mv "$tempfile" "$fichier_js"

adb push ./dist/bundle.js /sdcard/snapModule/$name-$version.js
cp ./dist/bundle.js ./$name-$version.js
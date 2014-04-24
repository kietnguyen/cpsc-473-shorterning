#!/bin/sh

# Run this as ./post.sh 'your_url_here'

curl -v -X POST -H 'Content-Type: application/json' \
     -d "{\"long_url\": \"$1\"}" \
     http://localhost:3000/shorten
echo


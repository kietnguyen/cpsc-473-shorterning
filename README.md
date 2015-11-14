# Shortening

* CPSC 473 - Web Programming and Data Management
* Spring 2014
* Implement a simple version of URL shortening. It allows to submit a long URL to be shortened as either `application/x-www-form-urlencoded` or `application/json` data by doing a HTTP POST to `/shorten`, and returns `application/json` data.

---

## Demo

[View live demo](https://cpsc-473-shortening.herokuapp.com)

## Setup

```
# install node modules
npm install

# initalize `counters` collection
mongo < misc/counters.js

# start app
npm start
```

## Test

```
# (simple) in bash shell
bash misc/post.sh "https://google.com"
```

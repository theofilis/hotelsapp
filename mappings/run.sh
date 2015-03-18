#!/bin/bash

cat hotels.json | curl -XPUT 'http://localhost:9200/hotels/' -d @-
cat sights.json | curl -XPUT 'http://localhost:9200/sights/' -d @-

cat camping.json | curl -XPUT 'http://localhost:9200/hotels/_mapping/camping' -d @-
cat lodgings.json | curl -XPUT 'http://localhost:9200/hotels/_mapping/lodgings' -d @-
cat no-lodgings.json | curl -XPUT 'http://localhost:9200/hotels/_mapping/nolodgings' -d @- 
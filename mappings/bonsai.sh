cat hotels.json | curl -XPUT 'https://8c7bnf9igs:s47tpa0yk6@hackathon-7266598270.eu-west-1.bonsai.io/hotels/' -d @-
cat sights.json | curl -XPUT 'https://8c7bnf9igs:s47tpa0yk6@hackathon-7266598270.eu-west-1.bonsai.io/sights/' -d @-

cat camping.json | curl -XPUT 'https://8c7bnf9igs:s47tpa0yk6@hackathon-7266598270.eu-west-1.bonsai.io/hotels/_mapping/camping' -d @-
cat lodgings.json | curl -XPUT 'https://8c7bnf9igs:s47tpa0yk6@hackathon-7266598270.eu-west-1.bonsai.io/hotels/_mapping/lodgings' -d @-
cat no-lodgings.json | curl -XPUT 'https://8c7bnf9igs:s47tpa0yk6@hackathon-7266598270.eu-west-1.bonsai.io/hotels/_mapping/nolodgings' -d @-

cat archaeological.json | curl -XPUT 'https://8c7bnf9igs:s47tpa0yk6@hackathon-7266598270.eu-west-1.bonsai.io/hotels/_mapping/archaeological' -d @-
cat monuments.json | curl -XPUT 'https://8c7bnf9igs:s47tpa0yk6@hackathon-7266598270.eu-west-1.bonsai.io/hotels/_mapping/monuments' -d @-
cat museums.json | curl -XPUT 'https://8c7bnf9igs:s47tpa0yk6@hackathon-7266598270.eu-west-1.bonsai.io/hotels/_mapping/museums' -d @-

#!/usr/bin/env python

import json
import codecs
from pprint import pprint

import os
import sys
import argparse
import logging

logger = logging.getLogger(__name__)

def main(arguments):
    logging.basicConfig(level=logging.DEBUG)

    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)

    parser.add_argument('file', help="Schema File")

    args = parser.parse_args(arguments)

    with codecs.open(args.file, 'r', encoding='utf-8') as in_file:
		data = json.load(in_file)

		mappings = dict()
		mappings['properties'] = dict()
		for item in data:
			mappings['properties'][data[item]] = {
				"type": "string"
			}

		print json.dumps(mappings)

if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
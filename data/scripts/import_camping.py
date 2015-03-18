#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import unicodecsv as csv
import sys
import argparse
import logging
from dateutil.parser import parse

from elasticsearch import Elasticsearch

es = Elasticsearch()

logger = logging.getLogger(__name__)

schema = {
    u"ΤΙΤΛΟΣ": "title",
    u"ΕΠΙΧΕΙΡΗΜΑΤΙΑΣ": "businessman",
    u"ΔΙΕΥΘΥΝΣΗ": "address",
    u"ΤΚ": "postal_code",
    u"ΠΕΡΙΦΕΡΕΙΑ": "region",
    u"ΠΕΡΙΦΕΡΕΙΑΚΗ_ΕΝΟΤΗΤΑ": "region_region",
    u"ΚΩΔΙΚΟΣ ΔΗΜΟΥ": "municipality_code",
    u"ΔΗΜΟΣ": "municipality",
    u"ΤΗΛΕΦΩΝΟ": "phone",
    u"EMAIL": "email",
    u"ΤΑΞΗ": "class",
    u"ΗΜ.ΕΚΔΟΣΗΣ ΑΔΕΙΑΣ": "issue_authorization_date",
    u"ΕΤΟΣ_ΠΡΩΤΗΣ_ΛΕΙΤΟΥΡΓΙΑΣ": "open_year",
    u"ΕΓΚΕΚΡΙΜΕΝΟΣ ΑΡΙΘΜΟΣ ΘΕΣΕΩΝ": "authorized_number_places",
    u"ΕΓΚΕΚΡΙΜΕΝΟΣ ΑΡΙΘΜΟΣ ΚΑΤΑΛΛΥΜΑΤΩΝ": "authorized_number_lodgings",
    u"ΕΓΚΕΚΡΙΜΕΝΟΣ ΑΡΙΘΜΟΣ ΑΤΟΜΩΝ": "authorized_number_people"
}

dtype = "camping"

def main(arguments):
    logging.basicConfig(level=logging.DEBUG)

    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)

    parser.add_argument('file', help="Schema File")

    args = parser.parse_args(arguments)

    with open(args.file, 'rb') as in_file:
    	datareader = csv.reader(in_file, delimiter=',', encoding='utf-8')
    	title = []

    	for idx, row in enumerate(datareader):
    		if idx == 0:
    			for item in row:
    				title.append(schema.get(item, ''))
    		else:
    			document = dict()
    			for idy, item in enumerate(row):
    				if title[idy] != "":
	    				document[title[idy]] = item
	    			else:
	    				document_id = dtype +  "_" + item

		    	if document["open_year"] != "":
		    		document["open_year"] = parse(document["open_year"]).strftime("%Y-%m-%d")
		    	else:
		    		document["open_year"] = None

		    	if document["issue_authorization_date"] != "":
		    		document["issue_authorization_date"] = parse(document["issue_authorization_date"]).strftime("%Y-%m-%d")
		    	else:
		    		document["issue_authorization_date"] = None

	    		es.index(index="hotels", doc_type=dtype, id=document_id, body=document)
    		
if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
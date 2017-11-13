import csv
import json

booklist = []

with open('books.csv', 'rb') as csvfile:
  bookreader = csv.DictReader(csvfile)
  for book in bookreader:
    booklist.append(book)

with open('books.js', 'w') as outfile:
  outfile.write("var BOOKS = %s%s" % (json.dumps(booklist), ';'))

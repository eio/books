import csv

fieldnames = []
authors = []

with open('books.csv', 'r') as csvfile:
	reader = csv.DictReader(csvfile)
	fieldnames = reader.fieldnames
	i = 0
	for book in reader:
		author = book['Author']
		create_new = True
		for a in authors:
			if a['author'] == author:
				create_new = False
				# append to array of books
				# by this author
				a['books'].append(book)
				break
			else:
				create_new = True
		if create_new:
			# create new array with 1 book
			authors.append({
				'author': author,
				'books': [book],
				'order': i
			})
		i += 1

with open('reordered-books.csv', 'w') as outfile:
	writer = csv.DictWriter(outfile, fieldnames=fieldnames)
	writer.writeheader()
	alpha_authors = sorted(authors)
	for author in alpha_authors:
		# write rows in new order
		for book in reversed(author['books']):
			writer.writerow(book)

import csv

in_fnam = 'books.csv'
out_fnam = 'trimbooks.csv'

input = open(in_fnam, 'rb')
output = open(out_fnam, 'wb')
writer = csv.writer(output)
for row in csv.reader(input):
    if any(row):
        writer.writerow(row)
input.close()
output.close()

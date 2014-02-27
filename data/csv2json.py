import csv
import json
import sys

print sys.argv

infilename = sys.argv[1]
outfilename = sys.argv[2]

f = open( infilename, 'r' )
#header = f.readline()
#print header

reader = csv.DictReader( f )

# for row in reader:
#     print row


#print reader

#out = json.dumps( [ row for row in reader ] )
#print out

outf = open(outfilename, 'w')
outf.write("{\n")
outf.write("'success': true,\n")
outf.write("'results': [\n")

nlines = 0
for row in reader:
    nlines = nlines +1
    print row
    outf.write(json.dumps(row) + ',\n')

outf.write("],\n")
outf.write("'total': " + str(nlines) + '\n')
outf.write("}")




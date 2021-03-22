import csv
import json
from pathlib import Path
import re
import sys

if __name__ == "__main__":
    file = sys.argv[1]

    out = re.sub('csv$', 'js', file)
    outfile = Path(__file__).absolute()\
        .parent.parent.joinpath('src', 'data', out)
    with open(file) as csvfile, open(outfile, 'w') as jsfile:
        item_container = []
        reader = csv.DictReader(csvfile)
        item_container = [i for i in reader]
        jsfile.write('export const DATA = ')
        json.dump(item_container, jsfile)

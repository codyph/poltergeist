import json

with open('C:\\Users\\Justin\\Documents\\NASA Space Apps\\poltergeist\\public\\exoplanets.json', 'r') as f:
    data = json.load(f)

addedNames = []
filteredData = []

for i, d in enumerate(data):
    pl_name = d["pl_name"]

    if pl_name not in addedNames:
        filteredData.append(d)
        addedNames.append(pl_name)

print(len(data))

print(len(list(set(addedNames))))

print(len(filteredData))

with open('C:\\Users\\Justin\\Documents\\NASA Space Apps\\poltergeist\\public\\exoplanets_filtered.json', 'w', encoding='utf-8') as f:
    json.dump(filteredData, f, ensure_ascii=False, indent=4)
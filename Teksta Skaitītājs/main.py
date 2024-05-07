import requests as rq

rezulats = rq.get('http://universities.hipolabs.com/search?country=Latvia')
for viens in rezulats.json():
    print(viens["name"])
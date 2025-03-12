import requests, math, json, time

res = requests.post('https://graphql.epicgames.com/graphql', json={"query":"query catalogQuery($locale: String, $count: Int, $start: Int, $country: String!, $sortBy: String, $sortDir: String) {Catalog {searchStore(locale: $locale count: $count start: $start country: $country sortBy: $sortBy sortDir: $sortDir) {paging {count start total}}}}","variables":{"locale":"en","count":1,"start":0,"country":"US","sortBy":"lastModifiedDate","sortDir":"DESC"}}, headers={'origin': 'https://epicgames.com'})
res = res.json()
total = res['data']['Catalog']['searchStore']['paging']['total']
print('total: %d' % total)

pageSize = 500
pages = math.ceil(total / pageSize)
offerid = {}
namespace = {}
for i in range(0, pages):
	print('page: %d' % (i+1))
	res = requests.post('https://graphql.epicgames.com/graphql', json={"query":"query catalogQuery($locale: String, $count: Int, $start: Int, $country: String!, $sortBy: String, $sortDir: String) {Catalog {searchStore(locale: $locale count: $count start: $start country: $country sortBy: $sortBy sortDir: $sortDir ) {elements {namespace urlSlug catalogNs {mappings {mappings {offerId} pageSlug}}} paging {count start total}}}}","variables":{"locale":"en","count":pageSize,"start":i*pageSize,"country":"US","sortBy":"lastModifiedDate","sortDir":"DESC"}}, headers={'origin': 'https://epicgames.com'})
	res = res.json()
	try:
		for item in res['data']['Catalog']['searchStore']['elements']:
			if item['catalogNs']['mappings'] != None:
				for mapping in item['catalogNs']['mappings']:
					if mapping['pageSlug'] == item['urlSlug']:
						if item['namespace'] not in namespace:
							namespace[item['namespace']] = mapping['pageSlug']
					if mapping['mappings']['offerId'] != None:
						if mapping['mappings']['offerId'] not in offerid:
							offerid[mapping['mappings']['offerId']] = mapping['pageSlug']
	except:
		print('Error: ' + res['errors'][0]['message'])
		break
	time.sleep(5)

with open('offerid.json', 'r', encoding='utf-8') as f:
	offeridfinal = json.loads(f.read())
	for key in offerid:
		offeridfinal[key] = offerid[key]

with open('offerid.json', 'w', encoding='utf-8') as f:
	f.write(json.dumps(offeridfinal))

with open('namespace.json', 'r', encoding='utf-8') as f:
	namespacefinal = json.loads(f.read())
	for key in namespace:
		namespacefinal[key] = namespace[key]

with open('namespace.json', 'w', encoding='utf-8') as f:
	f.write(json.dumps(namespacefinal))

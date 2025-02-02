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
	for item in res['data']['Catalog']['searchStore']['elements']:
		if item['catalogNs']['mappings'] != None:
			for mapping in item['catalogNs']['mappings']:
				if mapping['pageSlug'] == item['urlSlug']:
					if item['namespace'] not in namespace:
						namespace[item['namespace']] = mapping['pageSlug']
				if mapping['mappings']['offerId'] != None:
					if mapping['mappings']['offerId'] not in offerid:
						offerid[mapping['mappings']['offerId']] = mapping['pageSlug']
	time.sleep(5)

with open('offerid.json', 'w', encoding='utf-8') as f:
	f.write(json.dumps(offerid))

with open('namespace.json', 'w', encoding='utf-8') as f:
	f.write(json.dumps(namespace))

import requests
import time

start_date = 1514764800*1000 # Jan 01 2018 00:00
pair = 'BTCUSD'
timeframe = '1m'

final_data=[]

for _ in range(0,500):
	url = 'https://api.bitfinex.com/v2/candles/trade:'+timeframe+':t'+pair+'/hist?sort=1&limit=1000&start='+str(start_date)
	
	r = requests.get(url)

	temp_data = r.json()
	final_data = final_data+temp_data

	start_date = temp_data[len(temp_data)-1][0]+1*60*1000

	print(time.ctime()+" "+str(len(temp_data)))

	if len(temp_data)<1000:
		break

	time.sleep(2)

print(len(final_data))

with open('BFX_'+pair+'_'+timeframe+'.json', 'w') as f:
	f.write(str(final_data))
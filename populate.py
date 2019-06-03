import os
import urllib.request
from bs4 import BeautifulSoup
import requests
import threading

urls = ['https://www.goodreads.com/quotes/tag/inspirational']

allThreads = []

def postQuote(quote, author):
    api = 'http://localhost:5000/quote'
    data = {
        'text': quote,
        'author': author,
        'pic': 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjc0ODE5fQ',
        'secret': os.environ['SECRET']
    }
    r = requests.post(url = api, data = data) 
    
    # extracting response text  
    if r.status_code != 201:
        print("oops. messed up")
    else:
        print("returned with: ", r.status_code)
    return 

for url in urls:
    for i in range(1, 50):
        urlWithPagenum = url + '?page=' + str(i)
        print('scraping from: ' + urlWithPagenum)
        with urllib.request.urlopen(urlWithPagenum) as response:
            page = response.read()
            soup = BeautifulSoup(page, 'html.parser')
            allQuotes= soup.find_all('div', attrs={'class':'quoteText'})
            allAuthors = soup.find_all('span', attrs={'class':'authorOrTitle'})
            print("Quotes: ", len(allQuotes))
            print("Authors: ", len(allAuthors))
            for Q, A in zip(allQuotes, allAuthors):
                postQuote(Q.contents[0].strip(), A.string.strip())
                """
                t = threading.Thread(target=postQuote, args=(Q.contents[0].strip(), A.string.strip(),))
                t.start()
                allThreads.append(t)
                """

"""
for thread in allThreads:
    thread.join()
"""

print("Done!")
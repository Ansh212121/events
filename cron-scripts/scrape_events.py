import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime
import time

# URL to scrape from
url = 'https://whatson.cityofsydney.nsw.gov.au/'

def scrape_events():
    r = requests.get(url)
    soup = BeautifulSoup(r.content, 'html.parser')
    
    event_links = soup.find_all('a', class_='event_tile-link')
    
    events = []
    for event in event_links:
        event_name = event.get_text(strip=True)
        event_url = event.get('href')
        
        events.append({
            'event_name': event_name,
            'event_url': event_url,
            'scraped_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        })
    
    # Save the scraped events data to a file or a database
    with open('events.json', 'w') as f:
        json.dump(events, f, indent=4)

# Run the function every 24 hours
while True:
    scrape_events()
    print("Scraped events. Waiting for next update...")
    time.sleep(86400)  # Sleep for 24 hours

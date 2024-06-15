## Scraping Part : 

[not needed for now] 2cap API integration 
    - [ ] Detect Captcha 
    - [ ] Solve Captcha Call  
    - [ ] Implement Solution 
    
[x] Scraper Needs: 
    - [x] Browser Personalized Finger Print.
    - [x] Human like Behavior randomized.
    - [x] Puppeteer scraper wrapper 
    - [x] Request Interception needed here 

[x] Multi Keyword Input & search 

[x] Instagram Login 
    - [x] Automatic Login handling username, password
        - [ ] Trigger a manual Login from front in case automatic login fails 
    - [x] manual Login integration.

[x] Automate Search 
   - [x] Search Implementation. 
   - [x] Collect Result and filter hashtags out
   - [x] Returns [Account]
    
[x] Profile scraping 
    - [x] Loop Thru the Account. 
    - [x] Scrape Profile.
    - [bug encountered] Press Follow Button.
    - [bug encountered] Scrape The Suggested Accounts.
    - [x] Returns Set<Accounts>

[x] Scrap Profile
    - [x] The client decided to replace the list bellow with the results in user.data.template.json
    - [x] items null if not avaliable 
        - username
        - location/city
        - country
        - email from contact us button
        - phone number if there is that button
        - link to the most recent post
        - following count
        - follower count
        - Instagram bio
        - website link 

[x] Export CSV 
   - [ ] [username, location, country, email .... + keyword_used]
   due to the Complexity of the user object gathered it would be better to export to csv 
   - [x] Export to CSV 

[ ] Create a Dockerfile and image for this product 


## Front End : 
- [x] React font-end 
    - [x] Setup a web-socket server 
    - [x] Initial page to input data in such as keywords 

## Finalize 
[x] Update from Dev to Production mode
[x] Write Readme File & how to run.
[x] Publish Product. 

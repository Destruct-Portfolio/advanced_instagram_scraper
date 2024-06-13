## Scraping Part : 

[not needed for now] 2cap API integration 
    - [ ] Detect Captcha 
    - [ ] Solve Captcha Call  
    - [ ] Implement Solution 
    
[ ] IP rotation
    - [ ] Reading Proxies. 
    - [ ] Proxy Layer 

[x] Scraper Needs: 
    - [x] Browser Personalized Finger Print.
    - [x] Human like Behavior randomized.
    - [x] Puppeteer scraper wrapper 
    - [x] Request Interception needed here 

[ ] Multi Keyword Input & search 

[ ] Instagram Login 
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

[ ] Export CSV 
   - [ ] [username, location, country, email .... + keyword_used]

[ ] Create a Dockerfile and image for this product 


## Front End : 
- [ ] React font-end 
    - [ ] Setup a web-socket server 
    - [ ] Initial page to input data in such as keywords 
    - [ ] A way to see if you are logged in or not 
    - [ ] A new Web-socket to create a some how terminal like data to the front end. 

## Finalize 
[ ] Update from Dev to Production mode
[ ] Write Readme File & how to run.
[ ] Publish Product. 




### NOTICE FUTURE PROBLEMS 
- [ ] Am getting the We suspect you are using an automation tool notice from IG 
    
    so i need to randomize my behavior more. and to click on that notice when its comes out 

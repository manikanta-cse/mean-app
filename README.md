# mean-app

Steps to run the app

- clone the project
- run npm install, it will take care of bower install too
- navigate to your browser and open http://localhost:3030/

This App was hosted on https://fast-journey-30818.herokuapp.com


commands for heroku

- heroku login
- heroku create
- heroku config:set NODE_ENV=production
- git push heroku master
- heroku ps:scale web=1
- heroku open
- heroku logs
- heroku restart
- heroku keys  //for ssh keys
- ssh-keygen
- heroku keys:add
- heroku keys:remove
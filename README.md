# SD-D-Project
Before running this, make sure you have node.js installed, as well as npm. If
you don't know how to that, google it for your operating system. Afterwards,
in cmd/terminal, type

`npm install`

to get all of the required packages installed. Afterwards simply run

`npm start`

to start the server. To view the page, the server defaults to
running on port 3000, so simply type

`localhost:3000`

into your browser to view the site

#Connecting to the database
To connect to the database, simply create a `.env` file in the same directory as
the project. The `.env` file needs to have a single line which is:

`MONGO_URL=<insert connection url here>`

To get the url, simply go to https://cloud.mongodb.com and log in, then hit
connect on the cluster, and select connect your application. You will need a
username and password, which can be generated under security with database
accesses. Note: Currently need to ask a team member for a database log in.

All relevent information to testing and testing strategy can be found here: https://pastebin.com/rATsj1QB. Test cases can also be found in the feature tests template in Issues by pressing create new issue. The testing template is available in Issues under create new issue and the report test results button.

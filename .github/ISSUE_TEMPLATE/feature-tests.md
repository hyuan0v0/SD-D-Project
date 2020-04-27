---
name: Feature Tests
about: Add feature and its test here.
title: ''
labels: ''
assignees: ''

---

# Tests of Current Features:

**Test 1: Signup**
1. Open the website
2. Press sign up
3. System prompts you for an email address and a password
4. Enter your information
5. Press sign up
6. After pressing sign up you will be redirected a page telling you you're now registered and prompting you to log in
a. Note: you will not be logged in automatically
---
**Test 2: Login**
1. Open the site
2. Press login
3. System prompts you to enter your username and password
4. Enter your username and password
a. If correct: you will be redirected to your dashboard
i. And your calendar should be visible
b. If incorrect: System prompts you to re-enter your username and password
---
**Test 3: Create Group**
1. Login
2. Navigate to the create groups page
3. Press first dropdown menu for a list of classes
4. Select your class from the list
5. The dropdown box should now display the name of the class
6. Press the second drop-down for a list of days
7. Select your choice of meeting day
8. The dropdown box should now display the day
9. Press the third dropdown, should see a list of times
10. Select your choice of meeting time
11. The dropdown box should now display your meeting time
12. Press create group
13. Redirected to my groups
14. Should now see a group on the calendar on specified day and time
---
**Test 3.5: Calendar**
1. Once you’ve joined a group navigate to your dashboard
2. Your calendar should now include all groups that you were already in as well as the new one
---
**Test 4: Contact Us**
1. Press the contact us button
2. Enter your name in the textbox labeled name
3. Enter your email in the email textbox
4. Type the body of your message
5. Answer the mock CAPTCHA question
6. Press send
7. URL should now contain your message information
---
**Test 5: Find Group**
1. From your dashboard press find group
2. Select the class you’re looking for a group for
3. Press find
4. Should see a list of groups that show their time and day of the week
5. Under each group there should be a join group button
6. Decide what group you want and press join group
7. Redirected to dashboard
8. Your newly joined group should now show on your calendar at the time seen on the find group page
---
# Tests for Future Features:
---
**Test 6: Add non-Group**
1. From your dashboard press schedule
2. Redirected to a form
3. Enter the name of the activity/class in the textbox labeled name
4. Indicate what days of the week it meets using the buttons labeled with each day
5. Indicate meeting time using the drop-down menu
6. Press add
7. Redirected to dashboard
8. Your new activity should be on the calendar at the date and time you entered
---
**Test 7: View Group Information**
1. From your dashboard navigate to my groups
2. select a group group
3. Redirected to group information page
4. Should be a section displaying names and email addresses

![ga_cog_large_red_rgb](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png) x <img width="106" alt="Screenshot 2019-09-16 at 18 43 20" src="https://user-images.githubusercontent.com/43203736/64980637-20591c80-d8b2-11e9-9ba3-bda6511b8ed2.png">

# Project 3: Date-a-base

### Installation

* Clone or download the repo
* Run `yarn init` in the CLI
* Run `mongod`, `yarn seed`, `yarn serve:backend` and `yarn serve:frontend` in the CLI

# Team
- Daniele Nocito -  [GitHub](https://github.com/danielito76)
- Adesola Oni-Shogbonyo - [GitHub](https://github.com/Iamshola)
- Michael G. Laird - [GitHub](https://github.com/MGL1994)
- Francisco Dias - [GitHub](https://github.com/FranciscoFHDias)

https://docs.google.com/presentation/d/1G5LT_msA3wBcIPmo3hW2InK_VVFWx5oaCoR0kxNsa4Y/edit#slide=id.p

## Overview
Date-a-Base is a virtual community where everyone can find and share advices about beautiful and funny locations in London and surroundings, suitable for a dating. The type of locations meet a wide range of preferences which can be filtered depending on the expectations.
Launch on GitHub Pages. Check out the GitHub Repo.

## Project Brief
​
### The brief requirements were:
​
* **Build a full-stack application** by making your own backend and your own front-end
* **Use an Express API** to serve your data from a Mongo database
* **Consume your API with a separate front-end** built with React
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
* **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
* **Have a visually impressive design** to kick your portfolio up a notch and have something to wow future clients & employers. **ALLOW** time for this.
* **Be deployed online** so it's publicly accessible.
* **Have automated tests** for _at least_ one RESTful resource on the back-end. Improve your employability by demonstrating a good understanding of testing principals.
* A **working app** hosted on the internet
​
## Project Execution
​
We spend the first day exploring ideas and throughly planning our project. This included:

#### Wireframes
![image](https://user-images.githubusercontent.com/43203736/63586388-1a189e80-c599-11e9-8e85-1b00d1e72e14.png)

![image](https://user-images.githubusercontent.com/43203736/63586416-2bfa4180-c599-11e9-96f4-07920abf58d6.png)

#### Trello board
![ezgif com-video-to-gif (1)](https://user-images.githubusercontent.com/43203736/64982277-b2aeef80-d8b5-11e9-8934-8f65b83db216.gif)


### Allocation of responsibilities
​
Our daily routine involved a morning brief and an end of day summary.
​
### Languages and Technologies Used:
* HTML5
* CSS3
* SASS
* JavaScript (ES6)
* Git
* GitHub
* React and React extensions
* Webpack
* Bulma
* Node JS
* Babel
* Insomnia
* External API
* Monogdb
* Express
* Heroku
* Google Fonts

### Timeframe:
7 days

### Features

> **All Features:**

  - View all locations
  - Filter through an index of locations based on date number, type of dating exp and budget.
  - Filter locations in map view


> **Registered Users can:**

  - Add more workspaces
  - Create a user profile and update their profile


​
## Approach Taken
### Navbar
Wanted logged in user avatar to display, involved storing the information in local storage, then retrieving the image url.
FileStack
Wanted a smooth, easy way for users to upload images, rather than having to post any pictures online manually before able to do so. Found filestack online and used the documentation + other examples on github to implement. Makes it much easier as our site relies heavily on use input.

### FIlters
As our site is about helping users make decisions, we wanted to make filters a big component - hence their placement on the landing page. Aside from using React-Select to format the filter dropdowns, the logic involved getting the data from the dropdowns, storing it in state, then passing this over to the locations index page so that it shows a pre-filtered list of locations. Else the user can go straight to the index page.

### Users
We wanted to create an index of user profiles, perhaps more useful in future iterations, but for the purpose of searching other like minded users. On this page we didn’t want the logged in user to see their own profile. This involved using a filter function before mapping over the users to display them.
As part of this, in order to find out more information about the user, we created a page asking for user details after the initial register. We did not make the extra questions required so that we could post the initial register, carry over the form details in state and then combine both form details to update the user.
We also wanted the user to be able to edit their own profile, which we allowed using a function to only show the edit button on a user own profile.
Styling
Based the style off of an old movie theatre style with neon effects. Used text shadow/box shadow to get a neon effect.
Wanted a transparent fixed top navbar, but also had wanted to use the fade in method on scroll for better UX. Found some guidance online and adapted to our needs.
Win
Enjoyed learning more about react, particularly storing things in state/local storage.
Implementing new technologies - filestack loader + react-select.
Blocker
Getting the navbar to stay at the bottom of the screen with no content, without hard coding viewport height as this caused problems on the locations index

### Contact format
We enabled the Contact Form to send email to a our specific gmail address from the backend.

### About Us
In the About Us page we used a 3d effect CSS to make the page more interesting

### Terms and Conditions
The same as About Us and Contacts, Terms and Conditions are in the footer so that accessible everywhere in the website. We decided to display the documentation using a Bulma modal overlay effect implemented with Javascript code.

### Future Features
* Address lookup function consuming a public API
* Improving User Experience based on user critic


[<img alt="General Assembly logo" src="https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png">](https://generalassemb.ly/?&where=london&topic=&mkt_account_id=1056949875&mkt_campaign_id=691843434&mkt_ad_group_id=34960362879&mkt_device_type=c&mkt_keyword=general%20assembly&mkt_matchtype=e&mkt_placement=&mkt_ad_id=155682399044&mkt_network=g&mkt_target_id=kwd-459322816&mkt_feed_item_id=&utm_source=google&utm_medium=paid-search-bra&utm_campaign=TS:TX:BRA:LON:BR:GeneralAssembly&utm_content=campus-lead-lander&utm_term=general%20assembly&gclid=CjwKCAjw0vTtBRBREiwA3URt7lOmVVqqHJWL-eOckmt-HPJE8V3JE6HCSEG9vMjXjAr0fjSdcfyETxoCCe8QAvD_BwE)

# Project Three: Date-a-base

[Launch Date-a-base](https://datingexp.herokuapp.com)

[<img width="1391" alt="Date-a-base screenshot" src="https://i.imgur.com/5muBDBm.png">](https://datingexp.herokuapp.com)

### Installation

* Clone or download the repo
* Run `yarn init` in the CLI
* Run `mongo`, `yarn seed`, `yarn serve:backend` and `yarn serve:frontend` in the CLI

## Team

* **Daniele Nocito** -  [GitHub](https://github.com/danielito76)
* **Adesola Oni-Shogbonyo** - [GitHub](https://github.com/Iamshola)
* **Michael G. Laird** - [GitHub](https://github.com/MGL1994)
* **Francisco Dias** - [GitHub](https://github.com/FranciscoFHDias)

https://docs.google.com/presentation/d/1G5LT_msA3wBcIPmo3hW2InK_VVFWx5oaCoR0kxNsa4Y/edit#slide=id.p

## Overview
Date-a-Base is a virtual community where everyone can find and share advices about beautiful and funny locations in London and surroundings, suitable for a dating. The type of locations meet a wide range of preferences which can be filtered depending on the expectations.

## Project Brief and Technical Requirements

* **Build a full-stack application** by making your own backend and your own front-end
* **Use an Express API** to serve your data from a MongoDB
* **Consume your API with a separate front-end** built with React
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
* **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
* **Be deployed online** so it's publicly accessible.
* **Have automated tests** for _at least_ one RESTful resource on the back-end. Improve your employability by demonstrating a good understanding of testing principals.
* **A working app in 5 days** hosted on the internet

## Project Execution

### Technologies Used
* HTML5
* SCSS
* JavaScript (ES6)
* Git
* GitHub
* React and React extensions
* Webpack
* Bulma
* Node.js
* Babel
* Insomnia
* External API
* MongoDB
* Express
* Heroku
* Google Fonts
* Mongoose
* Trello

### Approach Taken

#### Planning 

* **Team communication and ways of working** - We spend the first day exploring ideas and throughly planning our project. This included:
  * Our daily routine involved a morning stand-up/brief and an end of day de-brief.
  * ![ezgif com-video-to-gif (1)](https://user-images.githubusercontent.com/43203736/64982277-b2aeef80-d8b5-11e9-8934-8f65b83db216.gif)

* **Wireframes** - We complated wireframes for:
  * Home
  * All venues list with filter
  * Single venue detail page
  * Contacts us
  * Map with filter
  * Add venue
  * Login
  * Register
  * User profile
  * User profile Edit
  
Examples:
![image](https://user-images.githubusercontent.com/43203736/63586388-1a189e80-c599-11e9-8e85-1b00d1e72e14.png)

![image](https://user-images.githubusercontent.com/43203736/63586416-2bfa4180-c599-11e9-96f4-07920abf58d6.png)


**Features**

> **All Features:**
  - View all locations
  - Filter through an index of locations based on date number, type of dating exp and budget.
  - Filter locations in map view

> **Registered Users can:**
  - Add more workspaces
  - Create a user profile and update their profile
  
#### Execution

##### Backend

**Technology used** - MongoDB, Express and Mongoose

**Models**
Started by creating the models for both location and user.

```js
onst commentSchema = new mongoose.Schema({
  content: { type: String, required: true, maxlength: 380 },
  rating: { type: Number, required: true, min: 1, max: 5 },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
},{
  timestamps: true
})
const locationSchema = new mongoose.Schema({
  name: { type: String, required: 'Please provide a Name!', unique: true },
  addressLine1: { type: String, required: 'Please provide a Address Line 1!' },
  addressLine2: { type: String },
  addressCity: { type: String, required: 'Please provide a City!' },
  addressPostCode: { type: String, required: 'Please provide a Post Code!' },
  latitude: { type: Number, required: 'Please provide a {PATH}' },
  longitude: { type: Number, required: 'Please provide a {PATH}' },
  cost: { type: Number, required: 'Please provide a Cost!', min: 1, max: 5  },
  actType: { type: [ String ], required: 'Please provide a Activity Type!', validate: [notEmpty, notEmptyMsg] },
  dateNum: { type: [ Number ], required: 'Please provide a Date Number!', min: 1, max: 5,  validate: [notEmptyActType, notEmptyMsg] },
  desc: { type: String, required: 'Please provide a Description!', maxlength: 480 } ,
  image: { type: String },
  contactNumber: { type: Number },
  link: { type: String },
  comments: [ commentSchema ],
  likes: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
}, {
  toJSON: { virtuals: true }
})
```

We also used virtuals to calculate average ratings:

```js
locationSchema.virtual('averageRating')
  .get(function getAverageRating() {
    if(this.comments.length === 0) return 0
    return this.comments.reduce((total, comment) => comment.rating + total, 0) / this.comments.length
  })
```

**Controllers**
The focus then moved to the different controllers.

Example:
```js
function createRoute(req, res, next) {
  req.body.user = req.currentUser._id

  const location = new Location(req.body)

  location.save()
    .then(location => res.status(201).json(location))
    .catch(next)
}


function showRoute(req, res, next) {
  Location.findById(req.params.id)
    .populate({ path: 'user', select: '-email' })
    .populate({ path: 'comments.user', select: '-email' })
    .then(location => {
      if(!location) return res.sendStatus(404)

      return res.json(location)
    })
    .catch(next)
}
```
**RESTFul API Routes**

```js
router.get('/', (req, res) => {
  res.json({ message: 'Hello World!' })
})

router.route('/locations')
  .get(locationsController.index)
  .post(secureRoute, locationsController.create)

router.route('/locations/:id')
  .get(locationsController.show)
  .put(secureRoute, locationsController.update)
  .delete(secureRoute, locationsController.delete)

router.post('/locations/:id/comments', secureRoute, locationsController.commentCreate)
router.delete('/locations/:id/comments/:commentId', secureRoute, locationsController.commentDelete)
router.post('/locations/:id/like', secureRoute, locationsController.like)

router.get('/profiles', usersController.usersIndex)

router.route('/profiles/:id')
  .get(usersController.userShow)
  .put(usersController.userUpdate)

router.post('/register', authController.register)
router.post('/login', authController.login)

router.post('/send', contactController.email)
```

**Navbar**
Wanted logged in user avatar to display, involved storing the information in local storage, then retrieving the image url.

**Image uploader**
Wanted a smooth, easy way for users to upload images, rather than having to post any pictures online manually before able to do so. Found filestack online and used the documentation + other examples on github to implement. Makes it much easier as our site relies heavily on use input.

```js
<label className="label">Image</label>
  <ReactFilestack
    mode="transform"
    apikey={fileloaderKey}
    buttonText="Upload Photo"
    buttonClass="button"
    className="upload-image"
    options={options}
    onSuccess={(result) => this.handleUploadImages(result)}
    preload={true}
  />
```

**Filters**
As our site is about helping users make decisions, we wanted to make filters a big component - hence their placement on the landing page. Aside from using React-Select to format the filter dropdowns, the logic involved getting the data from the dropdowns, storing it in state, then passing this over to the locations index page so that it shows a pre-filtered list of locations. Else the user can go straight to the index page.

Example:
```js
filterLocations() {
    const [field, order] = this.state.sortTerm.split('|')
    const filtered = _.filter(this.state.locations, location => {
      return (this.state.dateNum ? location.dateNum.includes(this.state.dateNum) : true) &&
        (this.state.actType ? location.actType.includes(this.state.actType) : true) &&
        (this.state.cost ? location.cost === this.state.cost : true )
    })
    return _.orderBy(filtered, [field], [order])
  }
```

**Users**
We wanted to create an index of user profiles, perhaps more useful in future iterations, but for the purpose of searching other like minded users. On this page we didn’t want the logged in user to see their own profile. This involved using a filter function before mapping over the users to display them.

As part of this, in order to find out more information about the user, we created a page asking for user details after the initial register. We did not make the extra questions required so that we could post the initial register, carry over the form details in state and then combine both form details to update the user.
We also wanted the user to be able to edit their own profile, which we allowed using a function to only show the edit button on a user own profile.

**Maps**
Enabling the user to locate the locations on a map was an important feature for the user experience. We used MapBox and the external API PostCodes.io to achieve this.

```js
<Map
 style="mapbox://styles/mapbox/streets-v9"
 zoom={zoom}
 center={this.state.centre}
 containerStyle={{
   height: '600px',
   width: '100%'
 }}>

 {this.filterLocations().map(location =>
   <Marker
     key={location._id}
     coordinates={[location.longitude, location.latitude]}
     anchor="bottom"
     onClick={() => this.handleMarkerClick(location)}>
     <img width="30px" height="30px" src={mapMarker} />
   </Marker>
 )}
```

```js
locationSchema.pre('validate', function getGeolocation(done) {
  if(!this.isModified('addressPostCode')) return done()
  axios.post('https://postcodes.io/postcodes?filter=longitude,latitude', { postcodes: [this.addressPostCode] })
    .then(res => {

      if(!res.data.result[0].result) return done()

      const { latitude, longitude } = res.data.result[0].result
      this.latitude = latitude
      this.longitude = longitude

      done()
    })
})
```

**Styling**
Based the style off of an old movie theatre style with neon effects. Used text shadow/box shadow to get a neon effect.
Wanted a transparent fixed top navbar, but also had wanted to use the fade in method on scroll for better UX. Found some guidance online and adapted to our needs.

**Contact format**
We enabled the Contact Form to send email to a our specific gmail address from the backend.

**About Us**
In the About Us page we used a 3d effect CSS to make the page more interesting

**Terms and Conditions**
The same as About Us and Contacts, Terms and Conditions are in the footer so that accessible everywhere in the website. We decided to display the documentation using a Bulma modal overlay effect implemented with Javascript code.

## Wins and Blockers
> **Wins**
* Enjoyed learning more about react, particularly storing things in state/local storage.
* Implementing new technologies - filestack loader, react-select, mapbox.

> **Blockers**
* Getting the navbar to stay at the bottom of the screen with no content, without hard coding viewport height as this caused problems on the locations index

## Future Content/Features
* Address lookup function consuming a public API
* Improving user experience based on user critic

## What we learnt
* The benefits of using a NoSQL database,
* Understanding the functionality of Express, Mongoose, CRUD functionality and different between embedded and referenced data,
* Embedded JS, single page app with React and the use of Bulma,
* Team planning and communication.

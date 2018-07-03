# Its-Licious

## Under 48 Hours Challenge Background

This project is the result of a challenge I thought of for myself called **Under 48 Hours.**

The challenge of **Under 48 Hours** is to create (whether it be design, code, build, make, etc) any project of your choice within a total time limit of 48 working hours. These do not need to be a consecutive 48 hours, but just 48 hours of working time. Once you reach a maximum of **48 hours of work** or completion of the project, you must not continue working on the project anymore, and publish it in its final state for the world to see. 

Why 48 hours? By having an explicit deadline on a new project, the challenge focuses individuals to prioritize what they need to focus on in order to get their project to a workable state. Individuals must factor in the time it takes to design a project, to come up with a solution, deal with any unforeseen technicalities and everything in between to make it to the deadline. 48 hours of work is just long enough time to deliver a great project, but not too short that you don't have enough time.

Interested in the challenge? Try taking on **Under 48 Hours** and let me know how it goes!

## Project Background

**Its-Licious** is a responsive single page app (SPA) that allows the user to see all participating restaurants for [Winterlicious or Summerlicious in Toronto](https://www.toronto.ca/explore-enjoy/festivals-events/summerlicious/restaurants-menus/?view=tabList). The application has various features such as:
* filtering restaurants by various criteria such as cuisine type, yelp rating and neighbourhoods
* making reservations directly online using [OpenTable](https://www.opentable.com/) (only at participating restaurants)
* viewing all restaurants via Google Map
* reading Yelp and Google reviews for the restaurant obtained from the Yelp and Google APIs
* seeing online Lunch and/or dinner menu sets for Winterlicious

The project is deployed onto **GitHub Pages** via [Angular CLI gh-pages](https://www.npmjs.com/package/angular-cli-ghpages). By using **GitHub** pages we're provided with free hosting for what's essentially a static page.

## Tech

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.4.

The project is split into 2 components, the first being the front end, and the second being the node server used for data retrieval. 

On the front end side, the project is built on **Angular 5**. I opted to go with this choice due to my familiarity with Angular 4, and wanted to see if there were any noticeable differences between Angular 4 and 5. In terms of any CSS Frameworks, I've chosen to go barebones here to work on my CSS abilities. The project was made responsive using [Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox). The project was built for mobile use, but was built with desktop being the primary usecase.

On the backend side, a node server was ran a single time to populate the data by making requests to both the Yelp API and the Google API. These files can be in **/api** folder.

For this project, I've opted to use as little external packages/frameworks/helpers as possible to minimize external dependencies as well as to focus on features that are vital to the project, due to the time constraints of the challenge. 

External Packages/Assets included (apart from the packages that come from generating a project via the angular CLI) are the following:

* [MomentJS](https://momentjs.com/) - For super easy date parsing
* [axios](https://github.com/axios/axios) - for node server http requests
* [Font Awesome](fontawesome.io/icons/) - for great icon sets
* [Animate.css](https://daneden.github.io/animate.css/) - for really cool animations


### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Design




## Work Breakdown
By loosely keeping track of the hours worked for what task, I was able to come up with a general idea of where my hours were most spent.

* **Design**
  * Desktop: 14 hours
  * Logo: 1 hours
* **Development**
  * Desktop: 21 hours
  * Mobile: 4 hours
  * Yelp API: 3.5 hours
  * Google API: 3 hours
  
  **Total Time Spent: 46.5 hours** (1.5 hours short of the challenge limit)

## Medium
Interested in reading a lengthier breakdown of the project, from conception to after publishing analysis? Check out the series on Medium here:

An Audience Analysis - http://bit.ly/medium-its-licious-post-analysis

## Credits:
* [Spinach Icon](https://www.flaticon.com/authors/freepik)
* [Basil Icon](https://www.flaticon.com/authors/freepik)
* [Farm Icon](https://www.flaticon.com/authors/popcorns-arts)
* [wheelchair icon](https://www.flaticon.com/authors/freepik)
* [Cutlery Icon in logo](https://www.flaticon.com/authors/freepik)
* [Font Awesome](http://fontawesome.io/)
* [Animate.css](https://daneden.github.io/animate.css/)
* [City of Toronto](https://www.toronto.ca/explore-enjoy/festivals-events/summerlicious/restaurants-menus/?view=tabList) - for providing the data and restaurant images

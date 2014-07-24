#Teacher Test Scores App

This is a very simple app that was created for the following user story:
```
As a teacher, I want to enter a list of student names along with his or her
test score on a page, so I may see a summary of my class’ performance on a
test. The summary shall include the min, max, and average grade.
```

##Setup

* Install: `npm install` and `bower install`
* Run: `grunt serve` to preview or `grunt` to build

##Notes
WARNING: This is one of my first projects with unit tests. Because of this, I probably did some wonky testing things that don't follow best practices.

##Things that I wanted to implement but didn't have time

* Replace funky Bootstrap with custom css
* Various UI/UX improvements such as improving helper notifications
* End-to-end tests with [Protractor](https://github.com/angular/protractor)
* Replace localStorage with backend
  * RESTful API (probably using Express)
  * MongoDB database
* Simple result graphs with [D3](http://d3js.org/)

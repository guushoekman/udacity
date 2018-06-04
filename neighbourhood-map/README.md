## Neighborhood map

This project displays a map of Cape Town's CBD with a number of points of interests displayed as markers. Clicking on these markers will display a popup with its name, a brief summary, and a link to its wikipedia article. In the right bottom is a text area that can be used to filter the markers. It's also possible to open the marker popups by clicking on the names of the locations in that list.

### Run locally

To run this locally simply clone this repo and open `index.html` in a modern browser.

### Resources

This project uses a number of JavaScript libraries.

- The map and markers are drawn using [Leaflet](http://leafletjs.com/)
- The filter is built using [Knockout](http://knockoutjs.com/)
- A few small helpers use [jQuery](http://jquery.com/)

Each marker also displays a summary of the location, which it gets from the corresponding [Wikipedia](http://en.wikipedia.org/) article.

### References

- [Leaflet](https://leafletjs.com/reference-1.3.0.html)
- [Knockout](http://knockoutjs.com/documentation/introduction.html)
- [MediaWiki](https://en.wikipedia.org/w/api.php)
- I also got very useful feedback from Tamás at Udacity who helped me get unstuck. Thanks Tamás!
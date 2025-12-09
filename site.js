/* SITE.JS: THIS FILE CONTAINS THE METHODS/FUNCTIONS AND VARIABLES CONTROLLING YOUR SITE
//
*/

/* NOTE: MOVIES.JSON CONTAINS A LIST OF MOVIES AND ACCOMPANYING METADATA
//
//    They are in the following format:
//    title (String): the name of the movie
//    iscore (Number): the IMDB score
//    rating (String): the movie's MPAA rating
//    released (Array): the release date. Note that the order of the array is:  YYYY, MM, DD
//    country (String): the country of production
//    posters (Array): an array of String values with the URL to movie posters (in your img/ directory)
//    imdb (String): the URL to the corresponding IMDB website
//    website (String): the URL to the corresponding official website
//    likes (Number): a fictitious number of user likes
//    dislikes (Number): a fictitious number of user dislikes
//    posterindex (Number): a counter to use with the "posters" array to keep track of the current displayed poster index
//
// FOR STEP 16, ADD THREE OF YOUR OWN FAVORITE MOVIES WITH METADATA TO THE END OF THE JSON FILE LIST
*/



 // This automatically imports your movies.json file and puts it into
      //   the variable: movies
const vue_app = Vue.createApp({
     el: '#app_title',
     el: '#github',
      created () {
            fetch('movies.json').then(response => response.json()).then(json => {
                  this.movies = json
            })
      },
      data() {

        return {
            // This holds your movies.json data.
            movies: [],
            title: "Movies that i remember watching",
            owner: "Vincent Colon",
            github: "https://github.com/VC2008",
      }
    },
       methods: {
    runtime: (time) => `${Math.floor(time / 60)}h, ${time % 60}m`,
    released: ([day, month, year]) =>
      `${months[month - 1]} ${day}${(() => {
        const num = day.toString().split("").at(-1);
        if (num === "1") return "st";
        else if (num === "2") return "nd";
        else if (num === "3") return "rd";
        else return "th";
      })()}, ${year}`,
    up: function (i, which) {
      this.active(
        document.getElementsByClassName(which)[i],
        ++this.movies[i][which]
      );
    },
    switchImg: function (i) {
      this.movies[i].posterIndex =
        (this.movies[i].posterIndex + 1) % this.movies[i].posters.length;
    },
    active: (e, num) =>
      num > 0 ? e.classList.add("active") : e.classList.remove("active"),
    toTop: () => (window.location = "#vue_app"),
  },
});

vue_app.mount("#vue_app");

function sizer() {
  const height = new Set();
  document.querySelectorAll(".cardContainer").forEach((e, i) => {
    const header = Array.from(document.querySelectorAll(".film-header"))[i];
    height.add(header.offsetHeight);
  });
  if (height.size > 0) {
    const maxheight = Array.from(height)
      .sort((a, b) => a - b)
      .at(-1);
    document.querySelectorAll(".film-header").forEach((e) => {
      e.setAttribute("style", `height: ${maxheight}px`);
    });
  }
}

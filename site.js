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
const { nextTick } = Vue;
const vue_app = Vue.createApp({
  async created() {
    this.movies = await (await fetch("movies.json")).json();
    await nextTick();
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    const tooltipList = [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );
    sizer(), (window.onresize = sizer);
  },
      data() {
        return {
            movies: [],
            title: "Movies that i remember watching",
            owner: "Vincent Colon",
            github: "https://github.com/VC2008",
      }
    },
       methods: {
    runtime: (time) => `${Math.floor(time / 60)}h ${time % 60}m`,
    released: ([d, m, y]) =>
      `${months[m - 1]} ${d}${(() => {
        const lastTwo = d.toString().slice(-2);
        const num = lastTwo.slice(-1);
        if (["11", "12", "13"].includes(lastTwo)) return "th";
        else if (num === "1") return "st";
        else if (num === "2") return "nd";
        else if (num === "3") return "rd";
        else return "th";
      })()}, ${y}`,
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
  computed: {
    title: function () {
      return `Imdb + Remy's Top ${this.movies.length} Movies`;
    },
  },
});
vue_app.mount("#vue_app");
function sizer() {
  const height = new Set();
  const headers = Array.from(document.querySelectorAll(".film-header"));
  headers.forEach((e) => {
    e.removeAttribute("style");
    height.add(e.offsetHeight);
  });
  if (height.size > 0) {
    const mH = Array.from(height).sort().at(-1);
    headers.forEach((e) => e.setAttribute("style", `height: ${mH}px`));
  }
}
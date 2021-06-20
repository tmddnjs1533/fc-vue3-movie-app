import { createStore } from "vuex";
import movie from "~/store/movie";
import about from "~/store/about";

export default createStore({
  modules: {
    movie,
    about,
  },
});

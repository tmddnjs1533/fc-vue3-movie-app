<template>
  <Headline />
  <Search />
  <MovieList />
</template>
<script>
import Headline from "~/components/Headline";
import Search from "~/components/Search";
import MovieList from "~/components/MovieList";
export default {
  components: {MovieList, Search, Headline},
  created() {
    this.$store.commit('movie/resetMovies')
  }
}
</script>
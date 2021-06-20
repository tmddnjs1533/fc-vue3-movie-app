import axios from "axios";
import _uniqBy from "lodash/uniqBy";

export default {
  // 모듈
  namespaced: true,
  // 데이터
  state: () => ({
    movies: [],
    message: "여기에 검색 결과가 표시됩니다.",
    loading: false,
    theMovie: {},
  }),
  // 계산된 데이터를 만드는 방식(=computed)
  getters: {},
  // 함수(=methods)
  // 변이
  mutations: {
    updateState(state, payload) {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key];
      });
    },
    resetMovies(state) {
      state.movies = [];
    },
  },
  // 비동기다! (중요)
  actions: {
    async searchMovies({ state, commit }, payload) {
      if (state.loading) return;
      commit("updateState", {
        message: "",
        loading: true,
      });
      try {
        const res = await _fetchMovie({
          ...payload,
          page: 1,
        });
        const { Search, totalResults } = res.data;

        commit("updateState", {
          movies: _uniqBy(Search, "imdbID"),
        });
        console.log(totalResults);
        console.log(typeof totalResults);

        const total = parseInt(totalResults, 10);
        const pageLength = Math.ceil(total / 10);
        if (pageLength > 1) {
          for (let page = 2; page <= pageLength; page++) {
            if (page > payload.number / 10) break;
            const res = await _fetchMovie({
              ...payload,
              page,
            });
            const { Search } = res.data;
            commit("updateState", {
              movies: [...state.movies, ..._uniqBy(Search, "imdbID")],
            });
          }
        }
      } catch (message) {
        commit("updateState", {
          movies: [],
          message,
        });
      } finally {
        commit("updateState", {
          loading: false,
        });
      }
    },
    async searchMovieWithId({ state, commit }, payload) {
      if (state.loading) return;
      commit("updateState", {
        theMovie: {},
        loading: true,
      });
      try {
        const res = await _fetchMovie(payload);
        commit("updateState", {
          theMovie: res.data,
        });
      } catch (err) {
        commit("updateState", {
          theMovie: {},
        });
      } finally {
        commit("updateState", {
          loading: false,
        });
      }
    },
  },
};

function _fetchMovie(payload) {
  const { title, type, year, page, id } = payload;
  const OMDB_API_KEY = "dd3cbb0f";
  const url = id
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => {
        if (res.data.Error) {
          reject(res.data.Error);
        }
        resolve(res);
      })
      .catch((err) => {
        reject(err.message);
      });
  });
}

<template>
  <div class="container">
    <input
      v-model="title"
      placeholder="영화, 시리즈, 그 이상의 검색"
      class="form-control"
      type="text"
      @keyup.enter="apply" />
    <div class="selects">
      <select
        v-for="filter in filters"
        :key="filter.name"
        v-model="$data[filter.name]"
        class="form-select">
        <option
          v-if="filter.name === 'year'"
          value="">
          All Years
        </option>
        <option
          v-for="item in filter.items"
          :key="item">
          {{ item }}
        </option>
      </select>
    </div>
    <button
      class="btn btn-primary"
      @click="apply">
      Apply
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      type:'movie',
      number: 10,
      year:'',
      filters: [
        {
          name: 'type',
          items: ['movie', 'series','episode']
        },
        {
          name: 'number',
          items: [10,20,30]
        },
        {
          name: 'year',
          items: (() => {
            const years = []
            for (let i = new Date().getFullYear(); i >= 1985 ; i--) {
              years.push(i)
            }
            return years
          })()
        }
      ]
    }
  },
  methods: {
    async apply() {
      // mutations 실행 시 commit(), actions 실행 시 dispatch()
      this.$store.dispatch('movie/searchMovies',{
        title : this.title,
        type : this.type,
        year : this.year,
        number : this.number
      })

    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  > * {
    margin-right: 10px;
    font-size: 15px;
    &:last-child {
      margin-right: 0;
    }
  }
  .selects{
    display: flex;
    select {
      width: 120px;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .btn {
    width: 120px;
    height: 50px;
    font-weight: 700;
    flex-shrink: 0;
  }

  @include media-breakpoint-down(lg) {
    display: block;
    input {
      margin-right: 0;
      margin-bottom: 10px;
    }
    .selects {
      margin-right: 0;
      margin-bottom: 10px;
      select {
        width: 100%;
      }
    }
    .btn {
      width: 100%;
    }
  }
}
</style>
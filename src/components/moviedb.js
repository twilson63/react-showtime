const h = require('react-hyperscript')
const React = require('react')
const xhr = require('xhr')

const {
  Link
} = require('react-router')

const Moviedb = React.createClass({
  getResults(s, page) {
    xhr({
      method: 'GET',
      json: true,
      url: `http://www.omdbapi.com/?r=json&s=${s}&page=${page}&type=movie`
    }, (e, r, b) => {
      console.log(b)
      this.setState({
        movies: b.Search,
        page: page,
        total: b.totalResults
      })
    })
  },
  getInitialState() {
    return {
      s: '',
      movies: [],
      page: 1,
      total: -1
    }
  },
  handleChange(e) {
    this.setState({
      s: e.target.value
    })
  },
  handleNextClick() {
    const page = this.state.page + 1
    this.getResults(this.state.s, page)
  },
  handlePrevClick() {
    const page = this.state.page - 1
    this.getResults(this.state.s, page)
  },
  handleSubmit(e) {
    e.preventDefault()
    this.getResults(this.state.s, this.state.page)
  },
  render: function () {
    function movie(m) {
      return h(Link, {
        to: `/moviedb/${m.imdbID}`,
        className: 'fl w-50 w-25-l link overflow-hidden',
        href: '#'
      }, [
        h("div.grow.aspect-ratio--4x6.", {
          style: {
            background: `url(${m.Poster}) no-repeat center center`,
            backgroundSize: 'cover'
          }
        })
      ])
    }

    return h('div.vh-100.cover.bg-left.bg-center-l', {
      style: {
        backgroundImage: 'url(http://ia.media-imdb.com/images/M/MV5BMTczNjM0NDY0Ml5BMl5BcG5nXkFtZTgwMTk1MzQ2OTE@._V1_.png)'
      }
    }, [
      h("div.vh-100.bg-black-80.pb5.pb6-m.pb7-l", [
        h('div.pa4.athelas', [
          h("article.mw5.center.bg-white.br3.pa3.pa4-ns.mv3.ba.b--black-10", [
            h("div.tc", [
              h('h1.light-blue', 'Movies'),
              h('form', {
                onSubmit: this.handleSubmit
              }, [
                h('input', {
                  onChange: this.handleChange
                })
              ]),
              h(Link, {
                to: '/',
                className: 'link db mt2 light-blue'
              }, 'Home'),
              this.state.total > 0 ? h('div', [
                h('div', this.state.total + ' Movies'),
                h('div', 'Page: ' + this.state.page),
                h('button', {
                  className: 'f6 link dim br-pill ba ph3 pv2 mb2 dib black bg-transparent',
                  onClick: this.handlePrevClick
                }, 'Previous'),
                h('button', {
                  className: 'f6 link dim br-pill ba ph3 pv2 mb2 dib black bg-transparent',
                  onClick: this.handleNextClick
                }, 'Next')
              ]) : null

            ])
          ]),
          h('article',
            this.state.movies
            .filter(m => m.Poster !== 'N/A')
            .map(movie)
          )
        ])
      ])
    ])
  }
})

module.exports = Moviedb

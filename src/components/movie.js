const h = require('react-hyperscript')
const React = require('react')
const xhr = require('xhr')
const {
  Link
} = require('react-router')

const Movie = React.createClass({
  getInitialState() {
    xhr({
        method: 'GET',
        json: true,
        url: `http://www.omdbapi.com/?i=${this.props.params.imdb}`
      }, (e, r, b) =>
      this.setState({
        movieInfo: b
      })
    )

    return {
      movieInfo: ''
    }
  },
  render() {
    const m = this.state.movieInfo
    return h("article.helvetica.pb5", [
      h("header.vh-100.bg-light-pink.dt.w-100", [
        h("div.dtc.v-mid.cover.ph3.ph4-m.ph5-l", {
          "style": {
            "background": `url(${m.Poster}) no-repeat center right`,
            "backgroundSize": "cover"
          }
        }, [
          h("h1.f2.f-subheadline-l.measure.lh-title.fw9.gray", m.Title),
          h("h2.f6.fw6.black", m.Year)
        ])
      ]),
      h("div.serif.ph3.ph4-m.ph5-l", [
        h("p.lh-copy.f5.f3-m.f1-l.measure.center.pv4", [
          m.Plot
        ]),
        h("div.f5.f3-m.lh-copy", [
          h("div.cf.dt-l.w-100.bt.b--black-10.pv4", [
            h("div.dtc-l.v-mid.mw6.pr3-l", [
              h("img.w-100", {
                "src": m.Poster,
                "alt": "",
                "className": "w-100"
              })
            ])
          ])
        ])
      ])
    ])
  }
})

module.exports = Movie

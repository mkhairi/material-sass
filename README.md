# Material-sass bootswatch [![Gem Version](https://badge.fury.io/rb/material-sass.svg)](http://badge.fury.io/rb/material-sass)

`material-sass` is a Sass rubygems version of Material, a HTML5 UI design based on Google Material. Offical repo [github.com/Daemonite/material](https://github.com/Daemonite/material)

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'bootstrap'
gem 'material-sass'
```

**NOTE:** Ensure that the `sass-rails` gem is presented in your Gemfile.

And then run the bundler and restart your server to make the files available through the pipeline:

```console
$ bundle install
```

Or install it yourself as:

```console
$ gem install material-sass
```

## Usage

### a. Sass

Import Materialize styles in `app/assets/stylesheets/application.scss`:

```scss
@import "material";
```

**NOTE:** If you have just generated a new Rails application, it  may come with a `.css` file instead. If this file exists, it will be served instead of Sass, so remove it.

```console
$ rm app/assets/stylesheets/application.css
```

### b. JavaScript

Require Material javascripts in `app/assets/javascripts/application.js`:

```js
//= require jquery
//= require bootstrap
//= require material
```


## Contributing

1. Fork it ( https://github.com/[my-github-username]/material-sass/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

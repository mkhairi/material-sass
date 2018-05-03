# Material-sass [![Gem Version](https://badge.fury.io/rb/material-sass.svg)](http://badge.fury.io/rb/material-sass)

`material-sass` is a rubygems version of Material Design for Bootstrap 4

Offical repo  [github.com/Daemonite/material](https://github.com/Daemonite/material)

Documentation [daemonite.github.io/material](http://daemonite.github.io/material)


## Dependencies

**Rails 5.1+**
The Rails JavaScript helpers has been rewritten in a new gem called rails-ujs and they use vanilla JavaScript, so jQuery is not a dependency of Rails anymore. 
Since bootstrap relies on it, install it with ```bin/yarn add jquery``` or via ```gem 'jquery-rails'```  and add ```//= require jquery``` to ```application.js```. 

**NOTE:** Ensure that the `sass-rails` gem is presented in your Gemfile.



## Installation

Add this line to your application's Gemfile:

```ruby
gem 'bootstrap',     '~> 4.1.1'
gem 'material-sass', '~> 4.1.1'
```
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
//ps: no need to import 'bootstrap'
```

**NOTE:** If you have just generated a new Rails application, it  may come with a `.css` file instead. If this file exists, it will be served instead of Sass, so remove it.

```console
$ rm app/assets/stylesheets/application.css
```

### b. JavaScript

Require Material javascripts in `app/assets/javascripts/application.js`:

```js
//= require jquery
//= require popper
//= require bootstrap
//= require material
```

### c. Icons

Include this line in the <head>portion of your HTML code

``` <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"> ```

or import this line in your application.scss

``` @import "https://fonts.googleapis.com/icon?family=Material+Icons"; ```

or install this gem for offline icons

``` gem 'material_icons' ```

see [docs](https://github.com/Angelmmiguel/material_icons)

## Contributing
note: Any changes or Pull Request regarding material assets should be made in official [material](https://github.com/Daemonite/material) repo.

1. Fork it ( https://github.com/mkhairi/material-sass/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

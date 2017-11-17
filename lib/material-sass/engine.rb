module Material
  module Sass
    class Engine < ::Rails::Engine
      initializer 'material-sass.assets.precompile' do |app|
        %w(stylesheets javascripts).each do |sub|
          app.config.assets.paths << root.join('app/assets', sub).to_s
        end
       end
    end
  end
end

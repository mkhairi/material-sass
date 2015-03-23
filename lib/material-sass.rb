require "material-sass/version"

module Material
  module Sass
    class << self
      def load!
        if rails?
          register_rails_engine
        end
      end
      
      def rails?
        defined?(::Rails)
      end
      
      private
      
      def register_rails_engine
        require 'material-sass/engine'
      end
      
    end
  end
end

Material::Sass.load!
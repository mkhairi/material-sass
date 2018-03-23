require "bundler/gem_tasks"

source_dir = "material-src" 

namespace :javascripts do
  
  desc "Cleaning javascripts directory"
  task :clean do
   rm_rf "assets/javascripts/material"
  end
  
  desc "Copy #{source_dir}/assets/js/src"
  task :copy do
    src_dir = "#{source_dir}/js/dist/src/."
    tgt_dir = "assets/javascripts/material/components"
    mkdir_p tgt_dir
    cp_r src_dir, tgt_dir
    cp "#{source_dir}/js/material.js", "assets/javascripts/material.js"
    cp "#{source_dir}/js/material.min.js", "assets/javascripts/material.min.js"
    
  
    #src_dir = "#{source_dir}/js/dist/third-party/."
    #tgt_dir = "assets/javascripts/material/addons"
    #mkdir_p tgt_dir
    #cp_r src_dir, tgt_dir
  end

  desc "Remove map"
  task :tidy do
    Dir.glob('assets/javascripts/**/*.js').each do |tgt_file|
      content = File.read(tgt_file)
      removed_map_content = content.sub(%r{^//# sourceMappingURL=.*\n?\z}, '')
      File.open(tgt_file, "w") { |f| f.puts removed_map_content}
    end
  end


  desc "Setup javascript assets"
  task setup: [:clean, :copy, :tidy]
end

namespace :stylesheets do
  desc "Cleaning stylesheets directory"
  task :clean do
   rm_rf "assets/stylesheets/material"
  end

  desc "Copy #{source_dir}/assets/scss/"
  task :copy do
    src_dir = "#{source_dir}/assets/scss/."
    tgt_dir = "assets/stylesheets/material/"
    mkdir_p tgt_dir
    cp_r src_dir, tgt_dir
  end
 
  desc "Fix font url in stylesheets"
  task :fix_urls do
    Dir.glob('assets/stylesheet/**/*.scss').each do |tgt_file|
      content = File.read(tgt_file)
      fixed_content = content.gsub(/url\(\"\.\.\/Roboto\/([A-Za-z_]*.woff2)\"\)/, 'font-url("\1")')
      File.open(tgt_file, "w") { |f| f.puts fixed_content}
    end
  end

  desc "Setup stylesheet assets"
  task setup: [:clean, :copy, :fix_urls]
end

desc "Remove minified file .min"
task :cleanup do
  Dir.glob('assets/**/*.min.*').each do |file|
    rm file
  end
end



desc "Setup or update assets files"
task setup: ["javascripts:setup", "stylesheets:setup"]

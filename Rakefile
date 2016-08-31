require "bundler/gem_tasks"

source_dir = "material-src" 

namespace :javascripts do
  
  desc "Cleaning javascripts directory"
  task :clean do
   rm_rf "app/assets/javascripts/material"
  end
  
  desc "Copy #{source_dir}/assets/js/"
  task :copy do
    src_dir = "#{source_dir}/assets/js/."
    tgt_dir = "app/assets/javascripts/material/"
    mkdir_p tgt_dir
    cp_r src_dir, tgt_dir
    mv (tgt_dir+"src.js"), "app/assets/javascripts/material.js"
  end
  

  desc "Setup javascript assets"
  task setup: [:clean, :copy]
end

namespace :stylesheets do
  desc "Cleaning stylesheets directory"
  task :clean do
   rm_rf "app/assets/stylesheets/material"
  end

  desc "Copy #{source_dir}/assets/sass/"
  task :copy do
    src_dir = "#{source_dir}/assets/sass/."
    tgt_dir = "app/assets/stylesheets/material/"
    mkdir_p tgt_dir
    cp_r src_dir, tgt_dir
  end
 
  desc "Fix font url in stylesheets"
  task :fix_urls do
    Dir.glob('app/assets/stylesheet/**/*.scss').each do |tgt_file|
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
  Dir.glob('app/assets/**/*.min.*').each do |file|
    rm file
  end
end



desc "Setup or update assets files"
task setup: ["javascripts:setup", "stylesheets:setup"]

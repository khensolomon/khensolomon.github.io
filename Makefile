# bundle exec jekyll serve --livereload
# bundle exec jekyll serve --config _config.yml,_config_dev.yml --livereload

dev:
	bundle exec jekyll serve --livereload

build:
	JEKYLL_ENV=production bundle exec jekyll build
install: 
	npm install
build: ##@Docker install services dependencies
	docker-compose up --build
stop: ## @Docker compose stop 
	docker-compose stop
reset: ##@Docker stop && prune 
	rm -rf node_modules && rm -rf dist && rm -rf package-lock.json && docker-compose stop && docker system prune -a
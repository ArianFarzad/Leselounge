include .env
export $(shell sed 's/=.*//' .env)

# Default target
all: start

# Start the containers
start:
	@echo "Starting containers..."
	docker-compose up --build
	@echo "Containers started successfully."

# Restart the containers
restart:
	@echo "Restarting containers..."
	docker-compose restart
	@echo "Containers restarted successfully."

# Stop and clean up containers, images, and volumes
clean:
	@echo "Stopping and cleaning up..."
	docker-compose down --rmi all --volumes --remove-orphans
	@echo "Cleanup completed: Containers, images, and volumes removed."

# Show logs of the containers
logs:
	@echo "Showing logs..."
	docker-compose logs -f

# Show the status of the containers
status:
	@echo "Showing container status..."
	docker-compose ps

# Connect to the MongoDB shell
db:
	@echo "Connecting to MongoDB shell..."
	docker exec -it mongo mongosh "mongodb://$(MONGO_INITDB_ROOT_USERNAME):$(MONGO_INITDB_ROOT_PASSWORD)@localhost:27017/$(MONGO_DB)?authSource=admin"

# Show help message
help:
	@echo "Available targets:"
	@echo "  make start    - Start the containers"
	@echo "  make restart  - Restart the containers"
	@echo "  make clean    - Stop and clean up containers, images, and volumes"
	@echo "  make logs     - Show logs of the containers"
	@echo "  make status   - Show the status of the containers"
	@echo "  make db       - Connect to the MongoDB shell"
	@echo "  make help     - Show this help message"

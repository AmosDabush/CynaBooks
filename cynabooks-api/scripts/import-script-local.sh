#!/bin/bash
mongodb_is_ready() {
  mongo --host localhost:27017 --eval "db.adminCommand('ping')" >/dev/null 2>&1
}

# Wait for MongoDB to become available
until mongodb_is_ready; do
  echo "Waiting for MongoDB to start..."
  sleep 2
done

echo "Starting data import..."

# Import data from mockBooks.json into the specified MongoDB database and collection
echo "Running mongoimport..."
mongoimport --host localhost:27017 --db CYNABOOKS --collection books --type json --file "$(dirname "$0")/mockBooks.json" --jsonArray

# Check the exit code of mongoimport to see if it was successful
if [ $? -eq 0 ]; then
  echo "Data import completed successfully."
else
  echo "Error: Data import failed."
fi

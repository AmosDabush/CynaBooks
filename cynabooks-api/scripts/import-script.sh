#!/bin/bash

mongodb_is_ready() {
  while true; do
    result=$(mongo --host cynabooks-db --eval "db.adminCommand('ping')")
    echo "$result"

    if [[ "$result" == *'"ok" : 1'* ]]; then
      echo "MongoDB is ready!"
      break
    else
      echo "Waiting for MongoDB to be ready..."
      sleep 2
    fi
  done
}

echo "MongoDB is ready."

mongoimport --host cynabooks-db --db CYNABOOKS --collection books --type json --file /mongo-seed/generated_books.json --jsonArray
mongoimport --host cynabooks-db --db CYNABOOKS --collection books --type json --file /mongo-seed/mockBooks.json --jsonArray

echo "Data import completed."

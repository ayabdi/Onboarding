#!/bin/sh
# start services required by web application

echo "Starting MongoDB server..."
mongod --config /usr/local/etc/mongod.conf --fork

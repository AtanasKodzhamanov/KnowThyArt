#!/bin/bash

# temp backup

# Extract database credentials from DATABASE_URL
URL=$DATABASE_URL

# Use Python to parse the URL and set environment variables
HOST=$(python3 -c "from urllib.parse import urlparse; result = urlparse('$URL'); print(result.hostname)")
PORT=$(python3 -c "from urllib.parse import urlparse; result = urlparse('$URL'); print(result.port)")
USER=$(python3 -c "from urllib.parse import urlparse; result = urlparse('$URL'); print(result.username)")
PASSWORD=$(python3 -c "from urllib.parse import urlparse; result = urlparse('$URL'); print(result.password)")
DB_NAME=$(python3 -c "from urllib.parse import urlparse; result = urlparse('$URL'); print(result.path[1:])")

echo "HOST: $HOST"
echo "PORT: $PORT"
echo "USER: $USER"
echo "PASSWORD: $PASSWORD"
echo "DB_NAME: $DB_NAME"

# Backup file name
BACKUP_FILE="knowthyart_backup_$(date +%Y%m%d_%H%M%S).sql"

# Exporting the password for pg_dump
export PGPASSWORD=$PASSWORD

# Running pg_dump
pg_dump -h $HOST -p $PORT -U $USER -d $DB_NAME -F c > "$BACKUP_FILE"

echo "Backup created: $BACKUP_FILE"

# to run command
# chmod +x backup.sh
# ./backup.sh

# to list backups
# pg_restore -l knowthyart_backup.sql     

# to convert to sql 
# pg_restore -F c -f converted_backup.sql knowthyart_backup.sql
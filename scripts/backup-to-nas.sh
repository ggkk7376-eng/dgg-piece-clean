#!/bin/bash

# Configuration
NAS_IP="10.20.30.50"
NAS_SHARE="Docker"
NAS_USER="logi"
NAS_PASS="Rhino@go1967"
BACKUP_DIR="dgg-piece-backups"

# Timestamp
DATE=$(date +"%Y-%m-%d_%H-%M-%S")
ARCHIVE_NAME="dgg-piece-backup-$DATE.tar.gz"

echo "Starting backup process..."

# Create archive
echo "Creating archive $ARCHIVE_NAME..."
tar -czf $ARCHIVE_NAME sqlite_data media

if [ $? -eq 0 ]; then
    echo "Archive created successfully."
else
    echo "Error creating archive."
    exit 1
fi

# Upload to NAS
echo "Uploading to //$NAS_IP/$NAS_SHARE/$BACKUP_DIR..."

# Create directory if not exists (ignore error if exists)
smbclient //$NAS_IP/$NAS_SHARE -U "$NAS_USER%$NAS_PASS" -c "mkdir $BACKUP_DIR" > /dev/null 2>&1

# Upload file
smbclient //$NAS_IP/$NAS_SHARE -U "$NAS_USER%$NAS_PASS" -c "cd $BACKUP_DIR; put $ARCHIVE_NAME"

if [ $? -eq 0 ]; then
    echo "Backup uploaded successfully!"
    # Cleanup local file
    rm $ARCHIVE_NAME
    echo "Local cleanup done."
else
    echo "Error uploading to NAS. Local archive kept: $ARCHIVE_NAME"
    exit 1
fi

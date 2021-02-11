# webflow-scripts

## Updating scripts
1. ```npm install``` to install deps.
2. Edit scripts in **src** directory.
3. Run ```npm run build``` to build locally.
3. Push to master to automatically build & deploy changes to S3.

## Notice
As of Feb 11, 2021, the PHP files are no longer being uploaded automatically, as they are still hosted on the legacy EC2 instance and will soon be deprecated.
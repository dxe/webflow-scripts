# webflow-scripts

## Updating scripts
1. ```npm install``` to install deps.
2. Edit scripts in **src** directory.
3. Run ```npm run build``` to build locally.
3. Push to master to automatically build & deploy changes to S3.

## Testing

The easiest way to test changes may be this:

Duplicate the "Events" page on Webflow, paste the script contents into a
`<script>` tag on the page, and then delete the test page when done.

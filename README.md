# webflow-scripts

Scripts used by pages on main site on Webflow.

Some scripts are imported globally. See usage here:
https://webflow.com/dashboard/sites/dxe/custom-code

Other scripts may be specific to a single page.

Note that some logic is duplicated across scripts for it to be available in
multiple pages. For example, the home page and events page both load events.

## Updating scripts
1. ```npm install``` to install deps.
2. Edit scripts in **src** directory.
3. Run ```npm run build``` to build locally.
3. Push to master to automatically build & deploy changes to S3.

## Testing

The easiest way to test changes may be this:

Duplicate the "Events" page on Webflow, paste the script contents into a
`<script>` tag on the page, and then delete the test page when done.

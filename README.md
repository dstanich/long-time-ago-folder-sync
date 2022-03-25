# long-time-ago-folder-sync

Project related to assist `long-time-ago` project.  This application is a utility I use to look at a specified folder and copy the most recent N number of items from the folder to a different folder.

This project was built instead of using built in Linux sync mechanisms because the folder may change over time and files may be deleted in one place but I do not want them deleted in the main folder.

The intended workflow for this project in combination with `long-time-ago`:

- User runs `long-time-ago` and `long-time-ago-folder-sync` apps
- User uploads a new image to origin folder
- `long-time-ago-folder-sync` sees the new file and copies it to the folder that `long-time-ago` will read
- `long-time-ago` reads the new image and sends out notifications

While the original intention of this project is to work with `long-time-ago`, it could be used for any purpose of syncing N latest modified files.

## Example flow I use
This may not work exactly as-is for you, but it's what I use.

1. Setup origin folder with data.  In my case I am using [Maestral](https://maestral.app/docs/installation) to run a container to sync with Dropbox into a volume that I use as my origin.
2. Ensure the `.folder-sync-config.js` files are in the volume directory roots (ex: main-pic-dir).
3. Build: `docker build . -t dstanich/long-time-ago-folder-sync:1.0.0`
4. Run giving volume and config: `docker run -d -v main-pic-dir:/data -v dropbox-data:/origin --name=lta-folder-sync dstanich/long-time-ago-folder-sync:1.0.0`
   1. The main picture directory needs to map to `/data`
   2. Origin picture directory should map to `/origin`
5. Check logs with `docker logs --follow lta-folder-sync` and make sure it's working.
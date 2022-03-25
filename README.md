# long-time-ago-folder-sync

UNDER CONSTRUCTION

Project related to assist `long-time-ago` project.  This application is a utility I use to look at a specified folder and copy the most recent N number of items from the folder to a different folder.

This project was built instead of using built in Linux sync mechanisms because the folder may change over time and files may be deleted in one place but I do not want them deleted in the main folder.

The intended workflow for this project in combination with `long-time-ago`:

- User runs `long-time-ago` and `long-time-ago-folder-sync` apps
- User uploads a new image to origin folder
- `long-time-ago-folder-sync` sees the new file and copies it to the folder that `long-time-ago` will read
- `long-time-ago` reads the new image and sends out notifications

While the original intention of this project is to work with `long-time-ago`, it could be used for any purpose of syncing N latest modified files.

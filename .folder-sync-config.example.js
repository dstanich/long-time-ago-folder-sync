const config = {
    originFolder: './test-origin',  // Folder to check for new files in
    destinationFolder: './test-destination',  // Folder to copy files into
    frequency: 30,  // How often to check for new files (in sec)
    countToCopy: 3  // Number of files to check and copy (when missing)
};

export default config;

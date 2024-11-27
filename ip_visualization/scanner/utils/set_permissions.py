# scanner/utils/set_permissions.py
import os
import stat

def set_permissions(captures_directory):
    # Set the captures directory to be writable by the user
    os.chmod(captures_directory, stat.S_IRWXU | stat.S_IRGRP | stat.S_IROTH)

    # Loop through all files in the captures directory and set permissions
    for filename in os.listdir(captures_directory):
        file_path = os.path.join(captures_directory, filename)

        # Make sure the file is not a directory
        if os.path.isfile(file_path):
            # Give the file read/write permissions to the owner and readable by others
            os.chmod(file_path, stat.S_IRUSR | stat.S_IWUSR | stat.S_IRGRP | stat.S_IROTH)

    print(f"Permissions set for files in {captures_directory}")

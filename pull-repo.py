import time, os

path = "/var/www/html"

os.chdir(path)

while True:
    print("Getting latest changes...")
    if not os.path.exists(f"{path}/DeveloperIsland"):
        os.system("git clone https://github.com/Leo-Oberndorfer/DeveloperIsland")
    else:
        os.chdir(f"{path}/DeveloperIsland")
        os.system("git pull origin master")
    time.sleep(300)
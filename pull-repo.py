import time, os

path = "/var/www/html"

os.chdir(path)

while True:
    print("Getting latest changes...")
    if not os.path.exists(f"{path}/TropiDev"):
        os.system("git clone https://github.com/Leo-Oberndorfer/TropiDev")
    else:
        os.chdir(f"{path}/TropiDev")
        os.system("git pull origin main")
    time.sleep(60)
import subprocess, time, urllib.request

proc = subprocess.Popen(['node', 'server.js'])
time.sleep(1.5)

urls = [
    'http://localhost:3000/',
    'http://localhost:3000/js/app.js',
    'http://localhost:3000/js/data.js',
    'http://localhost:3000/js/store.js',
    'http://localhost:3000/js/map.js',
    'http://localhost:3000/css/custom.css',
    'http://localhost:3000/screens/01-welcome-landing.html',
    'http://localhost:3000/screens/04-my-complaints.html',
    'http://localhost:3000/screens/09-complaint-details-tracking.html'
]

success = True
for u in urls:
    try:
        with urllib.request.urlopen(u) as response:
            status = response.getcode()
            print(f'{u} => Status {status}')
            if status != 200:
                success = False
    except Exception as e:
        print(f'Error fetching {u}: {e}')
        success = False

proc.terminate()
proc.wait()

if success:
    print('\nALL URLS SERVED WITH 200 OK! Server is completely functional!')
else:
    print('\nSOME URLS FAILED!')
    exit(1)

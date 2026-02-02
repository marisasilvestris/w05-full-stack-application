# w05-full-stack-application
## Initial Setup (can delete later if you'd like, this is more for classmates than instructor)
### Copying repository from GitHub
- In your terminal (Ubuntu if on Windows) type `git clone git@github.com:marisasilvestris/w05-full-stack-application.git`
### Installing required packages
- cd into the directory `cd w05-full-stack-application`
#### Install client and server
- `cd server`
- `npm install`
- `cd ..`
- `ls` to make sure you're in `w05-full-stack-application`
- `cd client`
- `npm install`
### Add environmental variables
- `cd ..`
- `ls` to make sure you're in `w05-full-stack-application` 
- `touch .env`
- `code .` to open in visual studio code
- in env file add `DB_CONN = postgresql://postgres.omqsfgljvlfxifbpuszj:kl5L2C6um8S604Ek@aws-1-eu-central-1.pooler.supabase.com:6543/postgres`


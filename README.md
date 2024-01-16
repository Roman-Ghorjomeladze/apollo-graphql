# Description
Graphql API developed with Apollo server (version 4). It is using Prisma for communication with DB. Currently the data is stored in file system as the database dialect selected is sqlite. Database structure is generated from migrations that are placed in *root*/prisma/migrations. 

# How to start
install -> migrate -> build -> start
```bash
// To install dependencies navigate to root directory and execute install command
run: npm install

// To populate database run migrations
run: npm run db:migrate

// To build the project execute build command
run: npm run build

// To start the server run start script
run: npm start

// To start in watch mode run dev command
run: npm run dev
```

After the app is started you can visit the url that will be consoled in terminal and play with Graphql Playground. I was going to add front end app as well but couldn't manage to fit it in time as I was a bit busy. I couldn't finilise tests too. Hope you'll like the API :))

There are dosens of commands in package.json file under scripts key. they are checking for linting issues, fixing code allignment, generating types and so on. Maybe you'll like the setup and hopufully use it in future apps. I'd be glad to hear, that my work is helpful for you :))
# Task-Management-Application

# Projenin kurulum adımları:

1.MongoDB Compass Kurulumu:
https://www.mongodb.com/try/download/compass linkinden MongoDB yi kurduktan sonra Connection kısmındaki URL kısmına mongodb://localhost:27017 yazıp connect işlemini gerçekleştiriyoruz.

Daha sonra TaskManagementApplicationDb adında bir database oluşturuyoruz.
Database e tıklayıp içine girdikten sonra projedeki TaskManagementApplicationDb adındaki database dosyası içindeki koleksiyonları aynı isimlerde oluşturup ADD DATA kısmından import json kısmını seçiyoruz.
Projede TaskManagementApplicationDb klasörünün altındaki uygun json dosyasını seçip import ediyoruz.
Aynı işlemi auths adında bir koleksiyon oluşturup tekrarlıyoruz.

2.Node.js Kurulumu:
https://nodejs.org/tr/download/current adresinden uygun sürümü seçip indiriyoruz. Kurulumu doğrulamak için cmd'ye "node -v" yazıyoruz.
Gerekli modüllerin hepsi yüklenmiştir. terminal'e npm start veya nodemon app.js yazıp projeyi çalıştırdıktan sonra tarayıcıya localhost:7000/home yazarak anasayfamıza erişim sağlayabilirsiniz.

# Installation steps of the project:

1.Installing MongoDB Compass:
https://www.mongodb.com/try/download/compass after installing MongoDB from the link, we type mongodb://localhost:27017 into the URL section in the Connection section and perform the connect operation.

Then we create a database called TaskManagementApplicationDb.
After clicking on "Database" and entering, create collections with the same names inside the database file named TaskManagementApplicationDb. Then, under the "ADD DATA" section, choose the "import JSON" option to proceed.
In the project, we select the appropriate json file under the TaskManagementApplicationDb folder and import it.
We create a collection called auths and repeat the same process.

2.Node.js Installation:
https://nodejs.org/tr/download/current we select the appropriate version from the address and download it. We type "node -v" into the cmd to verify the installation.
All the necessary modules have been installed. after typing npm start or nodemon app.js in the terminal and running the project, you can access our homepage by typing localhost:7000/home in the browser.

# Websitesinin Fotoğrafları / Photos of The Website

![Home](/photos_of_website/home1.png)
![] (/photos_of_website/home2.png)
![] (/photos_of_website/home3.png)

![Login](/photos_of_website/login.png)

![Registration](/photos_of_website/registration.png)

![Forgot-Password](/photos_of_website/forgot-password.png)

![Reset-Password](/photos_of_website/reset-password.png)

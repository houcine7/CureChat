# CureChat App
Welcome to CureChat App, a health assistance application that allows users to chat with a chatbot, make video calls, and have interactive conversations within a messaging space. This README file will provide you with an overview of the app's features, installation instructions, and other important details.

## Features
- Chatbot Interaction: Users can engage in conversational interactions with a chatbot in health related questions.

- Video Calls: CureChat App includes a video call feature that enables users to have face-to-face consultations with healthcare professionals.

- Messaging Space: The app offers a messaging space where users can save and refer to their past conversations with the chatbot.

## Installation
To run CureChat App locally on your machine, please follow these instructions:

Clone the repository from GitHub:

    git clone https://github.com/guizo792/curechat-app.git
Install the required dependencies:
#### Frontend :
    cd curechat/frontend
    npm install
#### Signaling server (NodeJS)
    cd curechat/signaling-server
    npm install
#### Peering server (PeerJS)
    peerjs --port 3001
#### Backend (spring boot)
    cd curechat/backend
    mvn clean install
Start the application:
#### Frontend :
    ng serve
#### Signaling server (NodeJS)
    nodemon index.js
#### Backend (spring boot)
    mvn spring-boot:run

Note: Please ensure you have Node.js, npm, and maven installed on your machine before proceeding with the installation.

## Usage
Upon launching CureChat App, you will be greeted with a user-friendly interface that guides you through the different features of the application. Here's a brief guide on how to use each feature:

- Chatbot Interaction: Click on the chatbot icon or designated area to start interacting with the chatbot. Type your queries or statements, and the chatbot will respond accordingly and ask question to give you more accurate answer.

- Video Calls: To initiate a video call you have to be logged in, you should register by clicking the button in the navigation bar and fill the required information to create your account, and just then you'll get the video call by clicking get started after creating the meeting you can share the link with others to join

- Messaging Space: This feature also implies to be logged in, the messaging space keeps a record of your conversations with the chatbot. You can access this feature by clicking on the messaging choice. Review your past discussions, search for specific information, or simply refer back to previous interactions.

## Demo

Home page

![](https://i.imgur.com/RU46EEi.png)

![](https://i.imgur.com/l53eJ6v.png)

Signup

![](https://i.imgur.com/0Ntx6PV.png)

Login

![](https://i.imgur.com/KMDVZQp.png)

The chatbot only answer health related questions

![](https://i.imgur.com/2lOIN42.png)

The chatbot asks the user to give more accurate answer

![](https://i.imgur.com/yU4CoGH.png)

Meeting home page

![](https://i.imgur.com/TfdMXkD.png)

Meeting space

![](https://i.imgur.com/RSyRqt5.png)

Messaging space

![](https://i.imgur.com/UcwEEYg.jpg)

Specific conversation

![](https://i.imgur.com/IkHrjNR.jpg)

Meeting home page

![](https://i.imgur.com/TfdMXkD.png)

#### Happy chatting and stay healthy!


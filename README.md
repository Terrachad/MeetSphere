![meetsphere-rounded-git](https://github.com/user-attachments/assets/ff4bdd8d-6a49-4177-a90c-1fea1c47297f)

# 📋 Table of Contents
* 🚀 [Introduction](#introduction)
* ⚙️ [Tech Stack](#tech-stack)
* 🔋 [Features](#features)
* 🤸 [Quick Start](#quick-start)

# 🚀 Introduction
<a name="introduction"></a>

A comprehensive video conferencing platform built with Next.js and TypeScript, mirroring Zoom's functionality. This application enables secure user authentication, meeting creation, and advanced conferencing features including recording, screen sharing, and participant management.

# ⚙️ Tech Stack
<a name="tech-stack"></a>
* Next.js
* TypeScript
* Clerk
* getstream
* shadcn
* Tailwind CSS

# 🔋 Features
<a name="features"></a>
## ✨ Complete Video Conferencing Solution
### 🔐 Secure Authentication
Experience seamless login with Clerk, supporting both social sign-on and traditional email/password methods.

### 🎥 Meeting Management
#### 📞 Instant Meetings
Start new meetings instantly with pre-configured audio and video settings.

#### 📅 Future Planning
Schedule upcoming meetings with detailed configurations and share access links.

#### 🏠 Personal Meeting Space
Access your dedicated meeting room with a permanent link for quick meetings.

### 🎮 Advanced Meeting Controls
#### 🔄 Interactive Features
* Meeting recording capabilities
* Screen sharing functionality
* Emoji reactions for engagement
* Flexible grid layout options
* Comprehensive participant management

#### 👥 Participant Management
* Individual participant controls
* Mute/unmute capabilities
* Video sharing permissions
* Participant pinning options

### 📊 Meeting History
#### 📼 Recording Access
Review past meeting recordings for reference.

#### 📝 Meeting Archives
Access comprehensive list of past meetings with metadata.

### 🔒 Platform Security
#### 🛡️ Real-time Protection
Secure real-time interactions with robust privacy measures.

#### 📱 Universal Access
Responsive design ensuring seamless experience across all devices.

# 🤸 Quick Start
<a name="quick-start"></a>
Follow these steps to set up the project locally on your machine.

## Prerequisites
Make sure you have the following installed on your machine:
* Git
* Node.js
* npm (Node Package Manager)

## Cloning the Repository
```bash
git clone https://github.com/adrianhajdin/zoom-clone.git
cd zoom-clone
```

## Installation
Install the project dependencies using npm:
```bash
npm install
```

## Set Up Environment Variables
Create a new file named `.env` in the root of your project and add the following content:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

NEXT_PUBLIC_STREAM_API_KEY=
STREAM_SECRET_KEY=
```

Replace the placeholder values with your actual Clerk & getstream credentials. You can obtain these credentials by signing up on the Clerk website and getstream website.

## Running the Project
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

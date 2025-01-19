# React Native Movie App - README

## Project Description

A feature-rich React Native app designed for movie enthusiasts. This app provides:

- **Now Playing, Popular, and Upcoming Movies**: Browse through the latest movies.
- **User Authentication**: Secure login via Firebase.
- **Personalized Collections**: Save and manage your favorite movies effortlessly.

---

## ✨ Features

1. **Splash Screen**:
   - Includes an animated Lottie animation.
2. **User Authentication**:
   - **Login**: Secure login with email and password.
   - **Registration**: Sign up with details including a profile photo.
3. **Home Screen**:
   - Tabs: `Now Playing`, `Popular`, `Upcoming`, `Favorites`.
   - Movies displayed with posters, titles, and summaries.
   - Tap to navigate to detailed movie information.
4. **Movie Details**:
   - Ratings, votes, popularity, release date, and more.
   - Add or remove movies from Favorites.
5. **Favorites Section**:
   - Synced with Firebase Firestore for real-time updates.
6. **User Profile**:
   - Edit personal details like name, photo, and address.
7. **Smooth Navigation**:
   - Drawer and Tab Navigation.
8. **TMDb API Integration**:
   - Fetch real-time movie data via the [TMDb API](https://www.themoviedb.org/).

---

## ⚙️ Setup Instructions

### 📂 Clone the Repository

1. Open your terminal.
2. Clone the repository:
   ```bash
   git clone https://github.com/skviradiya/MovieApp.git
   ```
3. Navigate to the project folder:
   ```bash
   cd MovieApp
   ```

### 🚀 Run the Project

#### Step 1: Start the Metro Server

First, start **Metro**, the JavaScript _bundler_ for React Native:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

#### Step 2: Start your Application

With Metro running in its own terminal, open a new terminal in the root of your project and run:

**For Android**:

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

**For iOS**:

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

Ensure you have the Android Emulator or iOS Simulator set up correctly. You can also run the app directly from Android Studio or Xcode.

---

### 🛠 React Native Setup

This is a new **[React Native](https://reactnative.dev)** project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

Before proceeding, ensure you’ve completed the [Environment Setup](https://reactnative.dev/docs/environment-setup) for React Native.

---

### 🔥 Firebase Setup

1. Visit the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Enable **Authentication** and **Firestore Database**.
3. Download the `google-services.json` (Android) or `GoogleService-Info.plist` (iOS) file and add it to the project.
4. Install Firebase dependencies:
   ```bash
   yarn add @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore
   ```

#### Firebase Modules Overview 📋

| **Module**                                               | **Description**                                            |
| -------------------------------------------------------- | ---------------------------------------------------------- |
| [Authentication](https://rnfirebase.io/auth/usage)       | Secure user authentication.                                |
| [Cloud Firestore](https://rnfirebase.io/firestore/usage) | Real-time NoSQL database for syncing and storing app data. |

For more details, visit the official [React Native Firebase Documentation](https://rnfirebase.io).

---

## 🛠 Tech Stack

- **[React Native](https://reactnative.dev)**: Framework for building cross-platform mobile applications using JavaScript and React.
- **[Firebase Authentication](https://firebase.google.com/docs/auth)**: Provides secure and user-friendly authentication mechanisms for apps.
- **[Cloud Firestore](https://firebase.google.com/docs/firestore)**: NoSQL database for real-time data synchronization and efficient storage.
- **[TMDb API](https://www.themoviedb.org/documentation/api)**: Source for comprehensive movie data, including ratings, summaries, and more.
- **[Redux](https://redux.js.org/)**: A predictable state container for JavaScript apps, enabling efficient state management.
- **[React Navigation](https://reactnavigation.org/)**: Flexible and extensible navigation solution for React Native applications.
- **[Axios](https://axios-http.com/)**: Promise-based HTTP client for making API requests from JavaScript applications.
- **[Image Crop Picker](https://github.com/ivpusic/react-native-image-crop-picker)**: Library for selecting and cropping images within React Native applications.

---

## 📸 Screenshots

Below are screenshots showcasing different screens of the app:

| Splash Screen                             | Sign In Screen                             | Register Screen                               |
| ----------------------------------------- | ------------------------------------------ | --------------------------------------------- |
| ![Splash Screen](/screenshots/splash.png) | ![Sign In Screen](/screenshots/signIn.png) | ![Register Screen](/screenshots/register.png) |

| Home Screen                            | Movie Details Screen                              | Drawer View Screen                        |
| -------------------------------------- | ------------------------------------------------- | ----------------------------------------- |
| ![Home Screen](/screenshots//home.png) | ![Details Screen](/screenshots/movie-details.png) | ![Drawer Screen](/screenshots/drawer.png) |

| Profile Screen                              | No Internet Screen                                  | Image Select Popup                             |
| ------------------------------------------- | --------------------------------------------------- | ---------------------------------------------- |
| ![Profile Screen](/screenshots/profile.png) | ![No Internet Screen](/screenshots/no-internet.png) | ![Image Select](/screenshots/image-select.png) |

| Logout Popup                             |     |
| ---------------------------------------- | --- |
| ![Logout Popup](/screenshots/logout.png) |     |

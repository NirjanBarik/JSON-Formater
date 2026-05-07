# ⚡ JSON Formatter & Validator 

![Project Banner](./assets/banner.png)

A professional, full-stack JSON utility tool built with the MERN stack. Format, validate, minify, and save your JSON snippets with ease.

---

## ✨ Features

- 🛠 **JSON Formatting**: Prettify messy JSON with standard 2-space indentation.
- ✅ **Validation**: Instant validation with detailed error messages for malformed JSON.
- ⚡ **Minification**: Compress JSON data for smaller storage/transmission.
- 💾 **Persistence**: Save important snippets to a MongoDB database for future reference.
- 🕒 **History Tracking**: Sidebar history to quickly reload or delete previous snippets.
- 📊 **Real-time Stats**: Track character count, line count, and data size as you type.
- 📋 **One-click Copy**: Copy formatted/minified output directly to your clipboard.
- 🌓 **Dark/Light Mode**: Toggle between premium dark and light themes with smooth transitions and persistence.
- 🎨 **Modern UI**: Sleek, responsive design built with React and Vanilla CSS, supporting multiple themes.

---

## 🚀 Tech Stack

### Frontend
- **React** (Vite)
- **Lucide React** (Icons)
- **Axios** (API Requests)
- **CSS3** (Custom Modern Design)

### Backend
- **Node.js**
- **Express**
- **Mongoose** (ODM)

### Database
- **MongoDB** (Cloud or Local)

---

## 🛠️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) instance (Local or Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/json-formatter-mern.git
cd json-formatter-mern
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install
```

### 3. Environment Configuration
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

### 4. Run the Application
From the **root directory**, run:
```bash
npm run dev
```
This will start both the client (Vite) and the server (Express) concurrently.

---

---

## 🆕 Recent Updates

### 🌓 Dark/Light Mode Toggle
We've added a highly requested theme toggle feature!
- **Smooth Transitions**: Enjoy a premium feel with 0.3s ease transitions between themes.
- **Preference Persistence**: Your choice is saved in `localStorage`, so it's remembered every time you visit.
- **Optimized Visibility**: Both themes are carefully crafted for maximum readability and eye comfort.

![Theme Toggle Demo](./assets/theme-toggle-demo.webp)

---

## 🖥️ Usage

1. Paste your JSON data into the **Input** panel.
2. Use the **Format**, **Validate**, or **Minify** buttons to process the data.
3. View the results in the **Output** panel.
4. Click **Save Snippet** to store the JSON for later use.
5. Access your saved snippets from the **History** sidebar on the right.

---

## 🌐 Deployment

### Backend (Render)
1. Create a new **Web Service** on [Render](https://render.com/).
2. Connect your GitHub repository.
3. Set the following configurations:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add **Environment Variables**:
   - `MONGODB_URI`: Your MongoDB Atlas connection string.

### Frontend (Vercel)
1. Create a new project on [Vercel](https://vercel.com/).
2. Connect your GitHub repository.
3. Set the following configurations:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add **Environment Variable**:
   - `VITE_API_URL`: The URL of your deployed Render backend (e.g., `https://your-api.onrender.com/api`).

---

## 📸 Screenshots

### Dark Mode
![Dark Mode Screenshot](./assets/dark-mode.png)

### Light Mode
![Light Mode Screenshot](./assets/light-mode.png)

---

## 🤝 Contributing

Contributions are welcome! If you have suggestions for new features or improvements, feel free to open an issue or submit a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📧 Contact

Email - nirjanbarik1@gmail.com

Project Link: [https://github.com/NirjanBarik/json-formatter-mern](https://github.com/NirjanBarik/json-formatter-mern)

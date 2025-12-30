# 📰 Tech News Frontend

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript)
![Lucide Icons](https://img.shields.io/badge/Icons-Lucide%20React-purple?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)

**A modern, responsive React-based frontend for the Automated RAG AI News Agent**

[Features](#-features) • [Setup](#-setup) • [Project Structure](#-project-structure) • [Scripts](#-available-scripts) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Setup & Installation](#-setup--installation)
- [Available Scripts](#-available-scripts)
- [Configuration](#-configuration)
- [Components](#-components)
- [API Integration](#-api-integration)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**Tech News Frontend** is a modern React application that serves as the user interface for the Automated RAG AI News Agent. It provides an intuitive, responsive platform for users to explore trending news, search articles, and read AI-generated summaries powered by Retrieval-Augmented Generation (RAG).

Built with React 18 and modern JavaScript, this frontend delivers a seamless experience across all devices with real-time updates and intelligent news aggregation.

---

## ✨ Features

### Core Functionality
- 📰 **Trending News Dashboard** - View the latest trending articles at a glance
- 🔍 **Advanced Search** - Semantic search across the news knowledge base
- 💡 **AI-Powered Summaries** - Get concise AI-generated summaries of articles
- 🏷️ **Smart Categorization** - Articles organized by topic and category
- 💾 **Save Articles** - Bookmark and manage your favorite articles
- 📊 **Trend Analysis** - Visualize emerging trends and patterns
- 🔄 **Real-time Updates** - Live news feed with automatic refresh
- 📱 **Responsive Design** - Fully responsive layout for desktop, tablet, and mobile

### UI/UX Features
- 🌙 **Dark Mode Support** - Easy on the eyes for extended reading
- ⚡ **Lightning-Fast Performance** - Optimized React components and lazy loading
- 🎨 **Beautiful Icons** - Lucide React icon library for crisp, modern UI
- ♿ **Accessibility** - WCAG compliant with semantic HTML
- 📧 **HTML Sanitization** - Safe rendering of article content with DOMPurify

---

## 🛠️ Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | React | 18.2.0 |
| **Language** | JavaScript (ES6+) | - |
| **Icons** | Lucide React | 0.562.0 |
| **Security** | DOMPurify | 3.3.1 |
| **Testing** | React Testing Library | 13.4.0 |
| **Build Tool** | Create React App | 5.0.1 |
| **Package Manager** | npm | 8.0+ |

### Dependencies Overview
- **React & React DOM** - Core UI library
- **Lucide React** - Beautiful, consistent icon library
- **DOMPurify** - XSS sanitization for safe HTML rendering
- **React Testing Library** - Component testing
- **Web Vitals** - Performance monitoring

---

## 📁 Project Structure

```
tech-news-frontend/
├── public/
│   ├── index.html              # Main HTML entry point
│   ├── favicon.ico             # Browser tab icon
│   └── manifest. json           # PWA configuration
│
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navigation & header
│   │   ├── NewsCard.jsx        # Individual news article card
│   │   ├── NewsList.jsx        # List of news articles
│   │   ├── SearchBar.jsx       # Search functionality
│   │   ├── FilterPanel.jsx     # Category & filter controls
│   │   ├── Sidebar.jsx         # Sidebar navigation
│   │   └── LoadingSpinner.jsx  # Loading indicator
│   │
│   ├── pages/
│   │   ├── Home.jsx            # Dashboard/Home page
│   │   ├── Search.jsx          # Search results page
│   │   ├── ArticleDetail.jsx   # Individual article view
│   │   ├── SavedArticles.jsx   # Bookmarked articles page
│   │   ├── Trends.jsx          # Trending topics page
│   │   └── NotFound.jsx        # 404 page
│   │
│   ├── services/
│   │   ├── api.js              # API client & endpoints
│   │   ├── auth.js             # Authentication logic
│   │   └── utils.js            # Utility functions
│   │
│   ├── assets/
│   │   ├── images/             # Image assets
│   │   ├── logos/              # Logo files
│   │   └── icons/              # Custom icons (if any)
│   │
│   ├── styles/
│   │   ├── index.css           # Global styles
│   │   ├── variables.css       # CSS variables & theme
│   │   ├── components.css      # Component-specific styles
│   │   └── responsive.css      # Mobile responsive styles
│   │
│   ├── App.jsx                 # Main App component & routing
│   ├── App.css                 # App-level styles
│   ├── index.js                # React DOM render
│   └── index.css               # Base styles
│
├── . gitignore                  # Git ignore rules
├── package.json                # Dependencies & scripts
├── package-lock.json           # Dependency lock file
└── README.md                   # This file
```

---

## 🚀 Setup & Installation

### Prerequisites
- **Node.js** 14.0 or higher
- **npm** 6.0 or higher (or Yarn)
- **Git**

### Step 1: Navigate to Frontend Directory
```bash
cd tech-news-frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

This installs all packages listed in `package.json`.

### Step 3: Configure Environment Variables

Create a `.env` file in the root of the `tech-news-frontend` directory:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000
REACT_APP_API_KEY=your_api_key_here
REACT_APP_API_TIMEOUT=30000

# Feature Flags
REACT_APP_ENABLE_DARK_MODE=true
REACT_APP_ENABLE_TRENDING=true
REACT_APP_ENABLE_SAVED_ARTICLES=true

# App Configuration
REACT_APP_ARTICLES_PER_PAGE=10
REACT_APP_AUTO_REFRESH_INTERVAL=300000
```

**Environment Variables Explanation:**
- `REACT_APP_API_URL` - Backend API server URL
- `REACT_APP_API_KEY` - Authentication token for API requests
- `REACT_APP_API_TIMEOUT` - Request timeout in milliseconds
- `REACT_APP_ARTICLES_PER_PAGE` - Number of articles per page
- `REACT_APP_AUTO_REFRESH_INTERVAL` - News refresh interval in milliseconds

### Step 4: Start Development Server
```bash
npm start
```

The app will open at `http://localhost:3000` in your default browser with hot-reload enabled.

---

## ⚙️ Available Scripts

### `npm start`
```bash
npm start
```
- Runs the app in development mode
- Opens [http://localhost:3000](http://localhost:3000) automatically
- Hot reload enabled - changes appear instantly
- Console shows lint errors and warnings

### `npm run build`
```bash
npm run build
```
- Builds the app for production to the `build` folder
- Optimizes and minifies all code
- Hashes included in filenames for caching
- Ready for deployment to any static host

**Build Output:**
```
build/
├── static/
│   ├── css/
│   ├── js/
│   └── media/
├── index.html
├── favicon.ico
└── manifest.json
```

### `npm test`
```bash
npm test
```
- Launches test runner in interactive watch mode
- Runs all files matching `*. test.js` or `*.test.jsx`
- Re-runs tests on file changes
- Press `q` to quit watch mode

### `npm run eject`
```bash
npm run eject
```
⚠️ **Warning:  This is a one-way operation! **

Ejects from Create React App to expose all configuration: 
- Webpack, Babel, ESLint configurations
- Full control over build process
- Cannot be reversed - use only if necessary

---

## 📝 Configuration

### Environment-Based Configuration

Create different `.env` files for different environments:

**Development (. env. development)**
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_DEBUG=true
```

**Production (.env.production)**
```env
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_DEBUG=false
```

Load them automatically based on the environment: 
```bash
npm start                    # Uses . env.development
npm run build               # Uses .env.production
```

### Theming

Customize colors and styles in `src/styles/variables.css`:

```css
:root {
  /* Primary Colors */
  --primary-color:  #007bff;
  --secondary-color: #6c757d;
  
  /* Background Colors */
  --bg-light: #ffffff;
  --bg-dark:  #1a1a1a;
  
  /* Text Colors */
  --text-light: #333333;
  --text-dark: #f0f0f0;
  
  /* Spacing */
  --spacing-unit: 8px;
  --spacing-sm: calc(var(--spacing-unit) * 1);
  --spacing-md: calc(var(--spacing-unit) * 2);
  --spacing-lg: calc(var(--spacing-unit) * 3);
}
```

---

## 🧩 Components

### Header Component
Navigation and branding
```jsx
<Header />
```

### NewsCard Component
Individual article card display
```jsx
<NewsCard 
  article={article}
  onSave={handleSave}
  onRead={handleRead}
/>
```

### SearchBar Component
Search functionality
```jsx
<SearchBar 
  onSearch={handleSearch}
  placeholder="Search news..."
/>
```

### FilterPanel Component
Category and source filtering
```jsx
<FilterPanel 
  categories={categories}
  onFilterChange={handleFilter}
/>
```

### NewsList Component
Container for multiple articles
```jsx
<NewsList 
  articles={articles}
  isLoading={loading}
  onArticleClick={handleArticleClick}
/>
```

---

## 📡 API Integration

### Base API Client

The API client is configured in `src/services/api.js`:

```javascript
// Example API calls
const api = {
  // News endpoints
  getTrendingNews: () => GET('/news/trending'),
  searchNews: (query) => POST('/news/search', { query }),
  getArticle: (id) => GET(`/news/${id}`),
  
  // User endpoints
  getSavedArticles: () => GET('/user/saved-articles'),
  saveArticle: (articleId) => POST(`/user/saved-articles`, { articleId }),
  
  // Trending endpoints
  getTrends: () => GET('/trends')
};
```

### Making API Requests

```javascript
import { api } from '../services/api';

// Fetch trending news
try {
  const response = await api.getTrendingNews();
  setNews(response.data);
} catch (error) {
  console.error('Error fetching news:', error);
}
```

### Error Handling

```javascript
try {
  const data = await fetch(`${API_URL}/endpoint`)
    .then(res => res.json());
} catch (error) {
  if (error.response?. status === 401) {
    // Handle unauthorized
  } else if (error.response?.status === 404) {
    // Handle not found
  }
}
```

---

## 🚢 Deployment

### Deploy to Netlify

1. **Build the project:**
```bash
npm run build
```

2. **Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

3. **Deploy:**
```bash
netlify deploy --prod --dir=build
```

### Deploy to Vercel

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
vercel --prod
```

### Deploy to GitHub Pages

1. **Add to package.json:**
```json
"homepage": "https://yourusername.github.io/Automated-RAG-AI-News-Agent"
```

2. **Build and deploy:**
```bash
npm run build
npm install gh-pages --save-dev
npx gh-pages -d build
```

### Docker Deployment

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run: 
```bash
docker build -t tech-news-frontend .
docker run -p 80:80 tech-news-frontend
```

---

## 🐛 Troubleshooting

### Common Issues

**Issue: Port 3000 already in use**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti :3000 | xargs kill -9
```

**Issue: Dependencies not installing**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue: API calls not working**
- Verify backend server is running
- Check `REACT_APP_API_URL` in `.env`
- Ensure CORS is enabled on backend
- Check browser console for network errors

**Issue: Build fails with memory error**
```bash
# Increase Node memory
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

**Issue: Hot reload not working**
- Restart development server:  `npm start`
- Check file permissions
- Verify `src/` directory is being watched

---

## 🎨 Customization Guide

### Changing Color Scheme
Edit `src/styles/variables.css`:
```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
}
```

### Adding New Icons
Lucide React has 1000+ icons available: 
```javascript
import { Heart, Share2, Bookmark, Trash2 } from 'lucide-react';
```

[Browse all icons](https://lucide.dev/)

### Modifying Layout
Edit component layouts in `src/components/`
Edit global styles in `src/styles/`

---

## 📊 Performance Optimization

### Code Splitting
```javascript
import { lazy, Suspense } from 'react';

const SearchPage = lazy(() => import('./pages/Search'));

<Suspense fallback={<LoadingSpinner />}>
  <SearchPage />
</Suspense>
```

### Image Optimization
Use responsive images:
```javascript
<img 
  src={image}
  alt="Article"
  loading="lazy"
  srcSet={`${image}-small.jpg 480w, ${image}-large.jpg 1024w`}
/>
```

### Memoization
```javascript
import { memo } from 'react';

const NewsCard = memo(({ article }) => (
  // Component JSX
));

export default NewsCard;
```

---

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Example Test
```javascript
import { render, screen } from '@testing-library/react';
import NewsCard from '../components/NewsCard';

test('renders article title', () => {
  render(<NewsCard article={{ title: 'Test' }} />);
  expect(screen.getByText('Test')).toBeInTheDocument();
});
```

---

## 🔗 Available Resources

- [React Documentation](https://react.dev/)
- [Create React App Docs](https://create-react-app.dev/)
- [Lucide Icons](https://lucide.dev/)
- [DOMPurify](https://github.com/cure53/DOMPurify)
- [React Testing Library](https://testing-library.com/react)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
```bash
git clone https://github.com/YOUR_USERNAME/Automated-RAG-AI-News-Agent.git
```

2. **Create a feature branch**
```bash
cd tech-news-frontend
git checkout -b feature/your-feature-name
```

3. **Make your changes**
- Follow React best practices
- Ensure code is clean and well-documented
- Update styles consistently

4. **Test your changes**
```bash
npm test
npm run build
```

5. **Commit and push**
```bash
git add .
git commit -m "Add your feature description"
git push origin feature/your-feature-name
```

6. **Create a Pull Request**
- Provide clear description of changes
- Link any related issues

---

## 📄 License

This project is licensed under the MIT License.  See [LICENSE](../../LICENSE) for details.

---

## 📧 Support

- 📖 Check the [main README](../../README.md)
- 🐛 Report issues on [GitHub Issues](https://github.com/shauryaverma03/Automated-RAG-AI-News-Agent/issues)
- 💬 Join [GitHub Discussions](https://github.com/shauryaverma03/Automated-RAG-AI-News-Agent/discussions)
- 👨‍💼 Contact:  [shauryaverma03](https://github.com/shauryaverma03)

---

## 🙏 Acknowledgments

- Built with [React 18](https://react.dev/)
- Icons from [Lucide React](https://lucide.dev/)
- Security via [DOMPurify](https://github.com/cure53/DOMPurify)
- Bootstrapped with [Create React App](https://create-react-app.dev/)

---

<div align="center">

**Made with ❤️ by [Shaurya Verma](https://github.com/shauryaverma03)**

⭐ If you find this helpful, please star the repository!

[Back to top](#-tech-news-frontend)

</div>

# 한국 HanGuk Bites - Korean Restaurant Website

A sophisticated, authentic Korean restaurant website built with modern web technologies. Features a premium design that blends traditional Korean cultural elements with contemporary fine dining aesthetics.

## 🎨 Design Philosophy

- **Authentic Korean Culture**: Warm, natural tones inspired by traditional Korean aesthetics
- **Premium Fine Dining**: Clean, elegant layouts with sophisticated typography
- **No Generic Templates**: Custom-designed components avoiding AI-generic looks
- **Mobile-First**: Responsive design optimized for all devices
- **Subtle Animations**: Smooth transitions without overwhelming effects

## 🎨 Color Palette

- **Charcoal Black**: `#1A1A1A` - Primary dark color
- **Soft Cream**: `#F5EFE6` - Background and text
- **Korean Red**: `#A31D1D` - Accent color for CTAs and highlights
- **Earthy Wood**: `#8B6F47` - Secondary accent

## 🚀 Technology Stack

### Frontend
- **React 19** - UI library
- **React Router DOM** - Client-side routing
- **Tailwind CSS 4** - Utility-first styling
- **Axios** - HTTP client
- **Vite** - Build tool and dev server

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
korean-restaurant-web/
├── client/                    # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── Layout.jsx
│   │   │   └── home/
│   │   │       ├── Hero.jsx
│   │   │       ├── About.jsx
│   │   │       └── Features.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Menu.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── Reservations.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   └── package.json
└── server/                    # Backend Express API
    ├── index.js
    └── package.json
```

## ✨ Features

### Public Pages

1. **Homepage**
   - Hero section with Korean typography
   - About section with restaurant story
   - Features showcase with cultural icons

2. **Menu Page**
   - Categorized menu (BBQ, Noodles, Rice, Drinks, Desserts)
   - Interactive category filters
   - Korean and English dish names

3. **Gallery**
   - Grid layout with hover effects
   - Lightbox modal for image viewing
   - Categories: Restaurant & Food

4. **Reservations**
   - Booking form with validation
   - Date/time selection
   - Special requests field
   - Connected to backend API

5. **Contact**
   - Restaurant information
   - Opening hours
   - Map placeholder
   - Social media links

### Admin Panel

1. **Login Page**
   - Simple authentication (demo credentials: admin/hanguk2024)
   - Clean, minimal design

2. **Dashboard**
   - View all bookings
   - Filter by status (pending/confirmed/cancelled)
   - Approve or cancel reservations
   - Real-time statistics

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd korean-restaurant-web
```

### 2. Install Frontend Dependencies
```bash
cd client
npm install
```

### 3. Install Backend Dependencies
```bash
cd ../server
npm install
```

### 4. Start the Backend Server
```bash
npm start
# Server runs on http://localhost:5000
```

### 5. Start the Frontend Development Server
Open a new terminal:
```bash
cd client
npm run dev
# Frontend runs on http://localhost:5173
```

## 🔌 API Endpoints

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get single booking
- `POST /api/bookings` - Create new booking
- `PATCH /api/bookings/:id` - Update booking status
- `DELETE /api/bookings/:id` - Delete booking

### Admin
- `POST /api/admin/login` - Admin authentication

### Health Check
- `GET /api/health` - API status check

## 🎯 Current Implementation

### Using Dummy Data
The application currently uses in-memory data storage for demonstrations:
- Bookings are stored in an array in `server/index.js`
- Data resets when the server restarts
- Pre-populated with 3 sample bookings

### Ready for Database Integration
The code is structured to easily integrate with a real database:
1. Replace in-memory arrays with database queries
2. Add environment variables for database connection
3. Implement proper user authentication with JWT
4. Add password hashing for admin accounts

## 🔐 Admin Credentials (Demo)

- **Username**: admin
- **Password**: hanguk2024

**Note**: For production, implement proper authentication with hashed passwords, JWT tokens, and secure session management.

## 📱 Responsive Design

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All components are fully responsive with mobile-first approach.

## 🎨 Typography

- **Headings**: Cormorant Garamond, Noto Serif KR
- **Korean Text**: Noto Serif KR
- **Body Text**: Inter

## 🚧 Future Enhancements

### Database Integration
- MySQL/PostgreSQL for production
- User authentication with JWT
- Image uploads for gallery
- Email notifications for bookings

### Features to Add
- Online payment integration
- Loyalty program
- Email newsletter signup
- Multi-language support (Korean/English)
- Real-time table availability
- Order online functionality
- Customer reviews section

### Performance
- Image optimization
- Lazy loading
- Service worker for offline support
- SEO optimization

## 🌐 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy the 'dist' folder
```

### Backend (Heroku/Railway/Render)
```bash
cd server
# Configure environment variables
# Deploy using platform-specific instructions
```

### Environment Variables
Create `.env` file in server directory:
```
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

## 📝 License

This project is created as a demonstration of a modern restaurant website.

## 👨‍💻 Development Notes

### Code Quality
- Clean, modular component structure
- Reusable components
- Consistent naming conventions
- Comments for complex logic

### Accessibility
- Semantic HTML
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader friendly

### Performance
- Optimized bundle size
- Minimal dependencies
- Efficient state management
- Fast page loads

## 🤝 Contributing

This is a demonstration project. For a production version:
1. Implement real database
2. Add proper authentication
3. Set up CI/CD pipeline
4. Add comprehensive testing
5. Implement error logging
6. Add analytics tracking

## 📧 Contact

For inquiries about this project, please contact through the repository.

---

**Built with ❤️ for authentic Korean dining experiences**

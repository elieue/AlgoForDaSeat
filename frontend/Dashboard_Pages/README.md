# AlgoForDaSeat Dashboard

A comprehensive admin dashboard for managing school enrollment applications, built with Vue 3 and connected to the AlgoForDaSeat backend.

## Features

- **Real-time Data**: Connected to the backend API for live application data
- **Application Management**: View and manage applications by status (pending, waitlisted, approved, rejected)
- **Slot Allocation**: Process slot allocation algorithms
- **Statistics Dashboard**: Real-time statistics and metrics
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Consistent Styling**: Matches the existing application pages design

## Prerequisites

- Node.js (v16 or higher)
- The AlgoForDaSeat backend server running on port 3000

## Installation

1. Navigate to the dashboard directory:
```bash
cd frontend/Dashboard_Pages
```

2. Install dependencies:
```bash
npm install
```

## Running the Dashboard

1. Make sure the backend server is running on `http://localhost:3000`

2. Start the dashboard development server:
```bash
npm run dev
```

3. The dashboard will open at `http://localhost:5173`

## API Integration

The dashboard connects to the following backend endpoints:

- `GET /api/applications/stats` - Get application statistics
- `GET /api/applications/all` - Get all applications
- `GET /api/applications/status/:status` - Get applications by status
- `GET /api/applications/pending` - Get pending applications
- `POST /api/applications/allocate` - Trigger slot allocation

## Project Structure

```
src/
├── api/
│   └── dashboard.js          # API integration layer
├── components/
│   └── shared/               # Reusable components
│       ├── Sidebar.vue       # Navigation sidebar
│       ├── StatsCard.vue     # Statistics cards
│       ├── WelcomeCard.vue   # Welcome section
│       └── QuickActions.vue  # Quick action buttons
├── store/
│   └── dashboardStore.js     # Pinia store for state management
├── views/
│   ├── AdminDashboard.vue    # Main dashboard view
│   └── ApplicationsView.vue  # Dynamic applications view
└── router/
    └── index.js             # Vue Router configuration
```

## Styling

The dashboard uses the same design system as the existing application pages:

- **Color Scheme**: Orange/yellow primary colors with high contrast
- **Typography**: Inter and Poppins fonts
- **Components**: Consistent card designs, buttons, and layouts
- **Responsive**: Mobile-first responsive design

## Key Components

### AdminDashboard.vue
Main dashboard view with statistics cards and quick actions.

### ApplicationsView.vue
Dynamic view that handles different application statuses:
- Pending Applications
- Waitlisted Applications  
- Approved Applications
- Rejected Applications
- Application Rankings

### dashboardStore.js
Pinia store managing:
- Application data and statistics
- Loading and error states
- API calls and data fetching
- Slot allocation functionality

## Development

### Adding New Features

1. **New API Endpoints**: Add methods to `src/api/dashboard.js`
2. **New Views**: Create Vue components in `src/views/`
3. **New Routes**: Add routes to `src/router/index.js`
4. **State Management**: Extend `src/store/dashboardStore.js`

### Styling Guidelines

- Use CSS custom properties (variables) defined in `App.vue`
- Follow the existing color scheme and typography
- Ensure responsive design for all screen sizes
- Use consistent spacing and border radius values

## Troubleshooting

### Common Issues

1. **API Connection Errors**: Ensure the backend server is running on port 3000
2. **Proxy Issues**: Check that the vite proxy configuration is correct
3. **Styling Issues**: Verify CSS variables are properly imported

### Debug Mode

Enable debug logging by checking the browser console for API calls and store updates.

## Contributing

1. Follow the existing code style and patterns
2. Test on multiple screen sizes
3. Ensure API integration works correctly
4. Update documentation for new features 
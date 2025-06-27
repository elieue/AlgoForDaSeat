# AlgoForDaSeat Application Pages

A comprehensive admin dashboard and application management system for school enrollment, built with Vue 3 and connected to the AlgoForDaSeat backend.

## Features

- **Real-time Dashboard**: Live statistics and overview of application process
- **Application Management**: View and manage applications by status (pending, waitlisted, approved, rejected)
- **Slot Allocation**: Process slot allocation algorithms with real-time updates
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Consistent Styling**: Unified design system across all components
- **Interactive Sidebar**: Collapsible navigation with floating icons

## Prerequisites

- Node.js (v16 or higher)
- The AlgoForDaSeat backend server running on port 3000

## Installation

1. Navigate to the application pages directory:
```bash
cd frontend/Application_Pages
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

1. Make sure the backend server is running on `http://localhost:3000`

2. Start the development server:
```bash
npm run dev
```

3. The application will open at `http://localhost:5173`

## Project Structure

```
Application_Pages/
├── api/
│   └── applications.js          # API integration layer
├── dashboard/
│   ├── components/
│   │   ├── DashboardStatCard.vue    # Individual stat cards
│   │   ├── StatCardsRow.vue         # Stats grid layout
│   │   ├── HeatmapCard.vue          # Heatmap visualization
│   │   ├── WelcomeCard.vue          # Welcome section
│   │   └── QuickActions.vue         # Quick action buttons
│   └── DashboardView.vue            # Main dashboard view
├── applications/
│   ├── components/
│   │   ├── ApplicationRankingsTable.vue
│   │   ├── ApprovedApplicationsTable.vue
│   │   ├── PendingApplicationsTable.vue
│   │   ├── RejectedApplicationsTable.vue
│   │   ├── WaitlistedApplicationsTable.vue
│   │   ├── StatusBadge.vue
│   │   └── ViewButton.vue
│   ├── ApplicationRankingsView.vue
│   ├── ApprovedApplicationsView.vue
│   ├── PendingApplicationsView.vue
│   ├── RejectedApplicationsView.vue
│   └── WaitlistedApplicationsView.vue
├── layout/
│   ├── AppShell.vue              # Main app layout
│   └── Sidebar.vue               # Navigation sidebar
├── store/
│   └── applications.js           # Pinia store for state management
├── style.css                     # Global styles and CSS variables
└── router.js                     # Vue Router configuration
```

## API Integration

The application connects to the following backend endpoints:

- `GET /api/applications/stats` - Get application statistics
- `GET /api/applications/all` - Get all applications
- `GET /api/applications/status/:status` - Get applications by status
- `GET /api/applications/pending` - Get pending applications
- `POST /api/applications/allocate` - Trigger slot allocation

## Key Components

### DashboardView.vue
Enhanced dashboard with:
- Real-time statistics cards
- Welcome section with quick actions
- Slot allocation functionality
- Application heatmap visualization
- Loading and error states

### Sidebar.vue
Collapsible navigation sidebar with:
- Floating icons when collapsed
- Full navigation when expanded
- Active state indicators
- Smooth transitions

### Applications Store
Pinia store managing:
- Application data by status
- Loading and error states
- Slot allocation functionality
- Real-time data synchronization

## Styling System

The application uses a consistent design system:

- **Color Scheme**: Orange/yellow primary colors with high contrast
- **Typography**: Inter and Poppins fonts
- **CSS Variables**: Centralized color and spacing variables
- **Responsive**: Mobile-first responsive design
- **Components**: Consistent card designs, buttons, and layouts

## Enhanced Features

### Real-time Statistics
- Live application counts by status
- Percentage calculations
- Auto-refresh after slot allocation

### Slot Allocation
- One-click slot allocation processing
- Real-time status updates
- Error handling and loading states

### Quick Actions
- Process slot allocation
- View slot chart
- Navigate to pending applications
- System settings (coming soon)

### Welcome Section
- Administrator welcome message
- Total application count
- Quick navigation buttons
- Dashboard illustration

## Development

### Adding New Features

1. **New API Endpoints**: Add methods to `api/applications.js`
2. **New Views**: Create Vue components in appropriate directories
3. **New Routes**: Add routes to `router.js`
4. **State Management**: Extend `store/applications.js`

### Styling Guidelines

- Use CSS custom properties (variables) defined in `style.css`
- Follow the existing color scheme and typography
- Ensure responsive design for all screen sizes
- Use consistent spacing and border radius values

## Troubleshooting

### Common Issues

1. **API Connection Errors**: Ensure the backend server is running on port 3000
2. **Styling Issues**: Verify CSS variables are properly imported
3. **Component Errors**: Check that all imports are correct

### Debug Mode

Enable debug logging by checking the browser console for API calls and store updates.

## Contributing

1. Follow the existing code style and patterns
2. Test on multiple screen sizes
3. Ensure API integration works correctly
4. Update documentation for new features

## Integration Status

✅ **Dashboard Enhanced** - Real-time statistics and slot allocation  
✅ **API Connected** - All backend endpoints integrated  
✅ **Styling Unified** - Consistent design across all components  
✅ **Responsive Design** - Works on all screen sizes  
✅ **Navigation Improved** - Enhanced sidebar with floating icons  
✅ **Error Handling** - Proper loading and error states  
✅ **Slot Allocation** - Full integration with backend algorithm  

The dashboard is now fully integrated with the existing application pages and provides a comprehensive admin interface for managing school enrollment applications! 🎉 
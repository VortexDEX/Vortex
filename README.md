# Vortex DEX 🌪️

A modern decentralized exchange platform built with Nuxt 3, TypeScript, and Tailwind CSS.

## Features

- 🔄 **Token Swapping** - Intuitive token swap interface with real-time price display
- 💰 **Liquidity Pools** - Browse and manage liquidity pool positions  
- 📊 **Portfolio Management** - Track assets and LP positions with detailed analytics
- 📱 **Mobile Optimized** - Responsive design with mobile-first UX enhancements
- 🎨 **Modern UI** - Glass-morphism design with cyberpunk aesthetics
- ⚡ **Performance** - Built with Nuxt 3 SSR for optimal loading speeds
- 🔒 **Type Safety** - Full TypeScript implementation with Zod validation

## Technology Stack

- **Framework**: Nuxt 3.17.6
- **Frontend**: Vue 3 Composition API with `<script setup>`
- **Styling**: Tailwind CSS with custom glass-morphism components
- **Type Safety**: TypeScript with strict configuration
- **State Management**: Pinia stores
- **Icons**: Nuxt Icon with Heroicons
- **Validation**: Zod schemas for form validation
- **Package Manager**: pnpm
- **Development Environment**: Nix Flake

## Getting Started

### Prerequisites

- Nix with flakes enabled

### Development Setup

1. **Enter the development environment:**
   ```bash
   nix develop
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Start development server:**
   ```bash
   pnpm dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm generate     # Generate static site
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint issues
pnpm typecheck    # Run TypeScript type checking
```

## Project Structure

```
├── assets/css/         # Global styles and Tailwind configuration
├── components/         # Reusable Vue components
│   ├── MobileOptimizer.vue    # Mobile UX enhancements
│   ├── MouseRipple.vue        # Interactive mouse effects
│   ├── TokenSelector.vue      # Token selection modal
│   └── Toast.vue              # Notification system
├── composables/        # Vue composables (to be implemented)
├── layouts/           
│   └── default.vue     # Main layout with navigation
├── pages/             
│   ├── index.vue       # Landing page with features
│   ├── swap.vue        # Token swap interface
│   ├── pools.vue       # Liquidity pools management
│   └── portfolio.vue   # Portfolio dashboard
├── server/            # Nuxt server configuration
├── stores/            
│   └── tokens.ts       # Token data management
├── types/             
│   └── index.ts        # TypeScript type definitions
└── utils/             
    ├── validation.ts   # Zod validation schemas
    └── error-handler.ts # Error handling utilities
```

## Current Implementation

### ✅ Core Features
- **Landing Page**: Feature showcase with statistics and call-to-action
- **Token Swap**: Complete swap interface with token selection modal
- **Liquidity Pools**: Pool browsing with APY display and management
- **Portfolio**: Asset tracking with LP position management
- **Mobile UX**: Touch optimization, viewport handling, and gesture support
- **Navigation**: Responsive navbar with mobile menu
- **UI Components**: Glass-morphism cards, interactive buttons, toast notifications

### ✅ Technical Features
- **SSR**: Server-side rendering with client hydration
- **Type Safety**: Comprehensive TypeScript coverage
- **Validation**: Form validation with Zod schemas
- **Error Handling**: Centralized error management system
- **Mobile Optimization**: Touch gestures, viewport fixes, and performance enhancements
- **Security**: XSS protection, secure headers, and input validation

### 🚧 Planned Features
- Wallet integration (Web3 providers)
- Real-time price feeds integration
- Smart contract interaction
- Transaction history tracking
- Advanced charting components

## Development Philosophy

This project follows modern Vue.js and Nuxt best practices:

- **Composition API**: Exclusive use of `<script setup>` syntax
- **Type Safety**: Strict TypeScript with proper type definitions
- **Component Design**: Single responsibility and reusable components
- **State Management**: Pinia for reactive state with proper typing
- **Performance**: SSR-first with optimized client-side hydration
- **Mobile-First**: Responsive design with touch-optimized interactions

## Configuration

The project includes comprehensive configuration:

- **Nuxt Config**: PWA-ready setup with security headers
- **Nix Flake**: Reproducible development environment
- **ESLint**: Code quality enforcement
- **TypeScript**: Strict type checking
- **Tailwind**: Custom utility classes and components

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the existing code style and patterns
4. Ensure type safety and add proper validation
5. Test on both desktop and mobile
6. Commit your changes (`git commit -m 'feat: add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## License

MIT License

# AUTILENT - City Dashboard Portal

A modern web application for city analytics and insights portal for stakeholders, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Modern Authentication**: Clean login interface with social login options
- **Responsive Design**: Mobile-first approach with beautiful UI
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework for rapid development
- **Next.js 14**: Latest React framework with App Router

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd autilent-aseer-portal
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
autilent-aseer-portal/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   └── LoginPage.tsx      # Login page component
├── public/               # Static assets
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md            # Project documentation
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Lucide React** - Icon library
- **React Hook Form** - Form handling

## Design System

The application uses a consistent design system with:

- **Primary Colors**: Blue (#3b82f6, #2563eb)
- **Success Colors**: Green (#10b981)
- **Warning Colors**: Yellow (#f59e0b)
- **Danger Colors**: Red (#ef4444)
- **Typography**: Inter font family
- **Components**: Reusable button, input, and card components

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is proprietary software for AUTILENT and the Asir Region Development Authority. 
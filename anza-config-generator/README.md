# Anza Solana Config Generator

A Vue 3 + Vite application that helps users dynamically build a Solana validator or RPC node configuration.

## Features

- Generate Solana node configurations using an intuitive UI
- Choose between validator or RPC node types
- Apply presets for common configuration scenarios:
  - Minimal Validator
  - High-Performance RPC
  - Testnet Node
- View configuration as .env file or CLI command
- Download configuration as a .env file
- Copy configuration to clipboard
- Warning system for suboptimal configurations
- Validation to ensure all required fields are filled

## Technology Stack

- Vue 3 with Composition API
- TypeScript
- Vite
- Tailwind CSS
- Pinia for state management

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/anza-config-generator.git
```

2. Navigate to the project directory
```
cd anza-config-generator
```

3. Install dependencies
```
npm install
```

4. Start the development server
```
npm run dev
```

5. Build for production
```
npm run build
```

## Usage

1. Select node type (validator or RPC)
2. Optionally select a preset configuration
3. Fill in all required fields
4. Configure additional options as needed
5. View the generated configuration
6. Copy or download the configuration

## License

MIT

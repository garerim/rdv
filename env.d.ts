declare namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
      NEXT_PUBLIC_STRIPE_SECRET_KEY: string;
      STRIPE_WEBHOOK_SECRET: string;
      // Add more environment variables as needed
    }
  }
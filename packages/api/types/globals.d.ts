export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onboardingComplete?: boolean;
    };
  }

  interface UserPublicMetadata {
    fullName?: string;
    staffId?: string;
  }
}

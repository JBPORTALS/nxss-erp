export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onboardingComplete?: boolean;
      org_id: string;
      org_slug: string;
      org_name: string;
      org_role: string;
    };
  }

  interface UserPublicMetadata {
    fullName?: string;
    staffId?: string;
  }
}

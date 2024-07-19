export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onboardingComplete?: boolean;
      org_id?: string;
      staff?: {
        organizations?: {
          org_id?: string;
          profileDetailsUpdated?: boolean;
          identificationDocUpdated?: boolean;
          status?: "initial" | "inreview" | "verified" | "rejected";
          reason_for_rejection?: string;
        }[];
      };
    };
  }
}

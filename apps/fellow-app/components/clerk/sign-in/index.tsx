// AuthComponents.js
import type { ClerkAPIError } from "@clerk/types";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { Path, Svg } from "react-native-svg";
import * as Linking from "expo-linking";
import * as Web from "expo-web-browser";
import { useOAuth, useSignIn, useSignUp } from "@clerk/clerk-expo";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import { Text } from "~/components/ui/text";
import { H2, H3, Muted } from "~/components/ui/typography";
import { useWarmUpBrowser } from "~/hooks/useWarmUpBrowser";

Web.maybeCompleteAuthSession();

export const EmailInput = ({
  onSubmit,
}: {
  onSubmit: (email: string) => void;
}) => {
  useWarmUpBrowser();
  const [email, setEmail] = useState("");
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const [isLoading, setIsLoading] = useState(false);

  const url = Linking.useURL();
  const onGoogleOauth = useCallback(async () => {
    setIsLoading(true);
    try {
      if (url) {
        const { setActive, createdSessionId } = await startOAuthFlow({
          redirectUrl: url,
        });
        if (createdSessionId) {
          setActive?.({ session: createdSessionId });
        }
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  }, [url]);

  return (
    <React.Fragment>
      <H2 className="text-center font-medium text-[#4C4065]">
        Your academic journey, all in one place.
      </H2>
      <View className="w-full items-center gap-3 pb-12">
        <Label nativeID="name" className="text-center font-semibold">
          Enter your email address to get started
        </Label>
        <Input
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          className="w-full"
          textAlign="center"
        />
        <Button className="w-full" onPress={() => onSubmit(email)}>
          <Text>Continue</Text>
        </Button>
        <View className="w-full flex-row items-center">
          <Separator className="flex-1" />
          <Muted className="px-2">OR CONTINUE WITH</Muted>
          <Separator className="flex-1" />
        </View>
        <Button
          onPress={() => onGoogleOauth()}
          className="w-full"
          variant={"secondary"}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={"black"} />
          ) : (
            <Svg width="16" height="16" viewBox="0 0 17 17" fill="none">
              <Path
                d="M16.5 8.51109C16.5 7.85332 16.4455 7.37332 16.3277 6.87555H8.66327V9.8444H13.1621C13.0714 10.5822 12.5816 11.6933 11.4932 12.4399L11.4779 12.5393L13.9013 14.3791L14.0692 14.3955C15.6111 13 16.5 10.9466 16.5 8.51109Z"
                fill="#4285F4"
              />
              <Path
                d="M8.66326 16.3333C10.8673 16.3333 12.7176 15.6222 14.0692 14.3955L11.4932 12.4399C10.8038 12.911 9.87866 13.2399 8.66326 13.2399C6.50455 13.2399 4.67236 11.8444 4.01924 9.91553L3.92351 9.92349L1.40368 11.8346L1.37073 11.9244C2.71312 14.5377 5.47049 16.3333 8.66326 16.3333Z"
                fill="#34A853"
              />
              <Path
                d="M4.01924 9.91553C3.84691 9.41776 3.74717 8.88439 3.74717 8.3333C3.74717 7.78216 3.84691 7.24885 4.01017 6.75108L4.00561 6.64506L1.4542 4.70325L1.37073 4.74216C0.817464 5.82662 0.5 7.04442 0.5 8.3333C0.5 9.62219 0.817464 10.8399 1.37073 11.9244L4.01924 9.91553Z"
                fill="#FBBC05"
              />
              <Path
                d="M8.66327 3.42663C10.1961 3.42663 11.2301 4.07551 11.8197 4.61777L14.1236 2.41331C12.7086 1.12443 10.8673 0.333313 8.66327 0.333313C5.47049 0.333313 2.71312 2.12885 1.37073 4.74217L4.01017 6.75108C4.67236 4.8222 6.50455 3.42663 8.66327 3.42663Z"
                fill="#EB4335"
              />
            </Svg>
          )}

          <Text className="font-semibold">Google</Text>
        </Button>
        <Muted className="w-[80%] text-center text-base">
          By continuing, you agree to our{" "}
          <Text className="text-foreground underline">Terms</Text> and{" "}
          <Text className="text-foreground underline">Usage Policy.</Text>
        </Muted>
      </View>
    </React.Fragment>
  );
};

export const VerificationInput = ({
  onSubmit,
}: {
  onSubmit: (code: string) => void;
}) => {
  const [code, setCode] = useState("");

  return (
    <View className="w-full flex-1 gap-8 pt-8">
      <View className="items-center gap-1">
        <H2>Please check your email</H2>
        <Muted>{`We’ve sent a code to your entered email`}</Muted>
      </View>
      <View className="items-center gap-4">
        <Input
          placeholder="Enter verification code"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
          className="w-full"
          textAlign="center"
        />
        <Button className="w-full" onPress={() => onSubmit(code)}>
          <Text>Verify</Text>
        </Button>
        <Muted>{`Didn’t receive an email? Resend ( in 36s )`}</Muted>
      </View>
    </View>
  );
};

export const ProfileInfoInput = ({
  onSubmit,
}: {
  onSubmit: (profileInfo: { firstName: string; lastName: string }) => void;
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <View className="w-full flex-1 items-center gap-8 pt-8">
      <H2>Complete your profile</H2>
      <View className="w-full gap-4">
        <View className="gap-1">
          <Label nativeID="first_name">First Name</Label>
          <Input
            nativeID="first_name"
            placeholder="Jhon"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        <View className="gap-1">
          <Label nativeID="first_name">First Name</Label>
          <Input
            placeholder="Doe"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
        <Button onPress={() => onSubmit({ firstName, lastName })}>
          <Text>Complete</Text>
        </Button>
      </View>
    </View>
  );
};

export const AuthFlow = () => {
  const [step, setStep] = useState("email");
  const [isNewUser, setIsNewUser] = useState(false);
  const { signIn, setActive: setSignInActive } = useSignIn();
  const { signUp, setActive: setSignUpActive } = useSignUp();

  const handleEmailSubmit = async (email: string) => {
    try {
      const signInAttempt = await signIn?.create({
        identifier: email,
        strategy: "email_code",
      });

      if (signInAttempt?.status === "complete") {
        setSignInActive?.({ session: signInAttempt.createdSessionId });
      } else if (signInAttempt?.status === "needs_first_factor") {
        setStep("verification");
      }
    } catch (err) {
      const error = err as { errors: ClerkAPIError[] };
      if (error.errors[0].code === "form_identifier_not_found") {
        console.log("new user");
        try {
          const completeSignup = await signUp?.create({ emailAddress: email });
          await completeSignup?.prepareEmailAddressVerification({
            strategy: "email_code",
          });

          setIsNewUser(true);
          setStep("verification");
        } catch (signUpErr) {
          console.error("Error creating user:", signUpErr);
        }
      } else {
        console.error("Error sending verification email:", err);
      }
    }
  };

  const handleVerificationSubmit = async (code: string) => {
    try {
      if (isNewUser) {
        const completeSignUp = await signUp?.attemptEmailAddressVerification({
          code,
        });
        if (completeSignUp?.status === "missing_requirements") {
          setStep("profile");
        } else {
          console.log(
            "Unexpected status after email verification:",
            completeSignUp?.status,
          );
        }
      } else {
        const completeSignIn = await signIn?.attemptFirstFactor({
          strategy: "email_code",
          code,
        });

        if (completeSignIn?.status === "complete") {
          setSignInActive?.({ session: completeSignIn.createdSessionId });
        } else {
          console.log(
            "Unexpected status after sign in:",
            completeSignIn?.status,
          );
        }
      }
    } catch (err) {
      console.error("Error during verification:", err);
    }
  };

  const handleProfileSubmit = async (profileData: {
    firstName: string;
    lastName: string;
  }) => {
    try {
      const completeSignUp = await signUp?.update(profileData);
      if (completeSignUp?.status === "complete") {
        setSignUpActive?.({ session: completeSignUp.createdSessionId });
      } else {
        console.log(
          "Unexpected status after profile completion:",
          completeSignUp?.status,
        );
      }
    } catch (err) {
      console.error("Error completing profile:", err);
    }
  };

  return (
    <View className="flex-1 items-center justify-between bg-background p-6">
      <H3>Fellow</H3>
      {step === "email" && <EmailInput onSubmit={handleEmailSubmit} />}
      {step === "verification" && (
        <VerificationInput onSubmit={handleVerificationSubmit} />
      )}
      {step === "profile" && isNewUser && (
        <ProfileInfoInput onSubmit={handleProfileSubmit} />
      )}
      <Text>NexussERP</Text>
    </View>
  );
};

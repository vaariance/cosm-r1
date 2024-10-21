"use client";
import "@vaariance/ui/styles.css";
import { Button, Text } from "@vaariance/ui";
import Cosmr1CredentialHandlerModule from "@vaariance/cred-web";

export default function Web() {
  const credentialManager = Cosmr1CredentialHandlerModule();

  const register = async () => {
    const result = await credentialManager.register({
      attestation: "none",
      challenge: Buffer.from(btoa("register me"), "base64"),
      rp: {
        id: "localhost",
        name: "localhost",
      },
      user: {
        displayName: "user",
        id: Buffer.from(btoa("user id"), "base64"),
        name: "user@localhost.3000",
      },
      timeout: 60000,
    });
    console.log(result);
  };

  const authenticate = async () => {
    const result = await credentialManager.authenticate({
      challenge: Buffer.from(btoa("sign this"), "base64"),
      timeout: 6000,
      userVerification: "required",
      rpId: "localhost",
    });
    console.log(result);
  };
  return (
    <div className="w-full h-screen flex flex-col-reverse items-center justify-center bg-background gap-5">
      <Button variant={"default"} onPress={register}>
        <Text>Create A Passkey</Text>
      </Button>
      <Button variant={"default"} onPress={authenticate}>
        <Text>Sign in with Passkey</Text>
      </Button>
    </div>
  );
}

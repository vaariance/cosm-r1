import "@vaariance/ui/styles.css";

import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Text, Button } from "@vaariance/ui";
import Cosmr1CredentialHandlerModule from "@vaariance/cred-native";

export default function App() {
  const credentialManager = Cosmr1CredentialHandlerModule;

  const register = async () => {
    const result = await credentialManager.register({
      attestation: "none",
      challenge: btoa("register me"),
      rp: {
        id: "localhost",
        name: "localhost",
      },
      user: {
        displayName: "user",
        id: btoa("user id"),
        name: "user@localhost.3000",
      },
      timeout: 60000,
    });
    console.log(result);
  };

  const authenticate = async () => {
    const result = await credentialManager.authenticate({
      challenge: btoa("sign this"),
      timeout: 6000,
      userVerification: "required",
      rpId: "localhost",
    });
    console.log(result);
  };
  return (
    <View className="flex-1 items-center justify-center flex-col-reverse bg-background gap-5">
      <Button variant={"default"} onPress={register}>
        <Text>Create A Passkey</Text>
      </Button>
      <Button variant={"default"} onPress={authenticate}>
        <Text>Sign in with Passkey</Text>
      </Button>
      <StatusBar style="auto" />
    </View>
  );
}

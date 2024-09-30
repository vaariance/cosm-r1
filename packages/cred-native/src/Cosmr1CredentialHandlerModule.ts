import {
  type EventTypeMap,
  type PublicKeyCredential,
  type AuthenticatorAttestationResponse,
  type AuthenticatorAssertionResponse,
  type AttestationOptions,
  type AssertionOptions,
} from "@vaariance/shared-types";
import {
  requireNativeModule,
  NativeModulesProxy,
  EventEmitter,
} from "expo-modules-core";

// It loads the native module object from the JSI or falls back to
// the bridge module (from NativeModulesProxy) if the remote debugger is on.
const nativeModule = requireNativeModule("Cosmr1CredentialHandler");

const emitter = new EventEmitter(
  nativeModule ?? NativeModulesProxy.Cosmr1CredentialHandler,
);

const moduleObjects = {
  defaultConfiguraton: {
    TIMEOUT: nativeModule.TIMEOUT,
    ATTESTATION: nativeModule.ATTESTATION as AttestationConveyancePreference,
    AUTHENTICATOR_ATTACHMENT:
      nativeModule.AUTHENTICATOR_ATTACHMENT as AuthenticatorAttachment,
    REQUIRE_RESIDENT_KEY: nativeModule.REQUIRE_RESIDENT_KEY as boolean,
    RESIDENT_KEY: nativeModule.RESIDENT_KEY as ResidentKeyRequirement,
    USER_VERIFICATION:
      nativeModule.USER_VERIFICATION as UserVerificationRequirement,
    PUB_KEY_CRED_PARAM:
      nativeModule.PUB_KEY_CRED_PARAM as PublicKeyCredentialParameters,
  },

  events: {
    onRegistrationStarted: (
      callback: (event: EventTypeMap["onRegistrationStarted"]) => void,
    ) => emitter.addListener("onRegistrationStarted", callback),
    onRegistrationFailed: (
      callback: (event: EventTypeMap["onRegistrationFailed"]) => void,
    ) => emitter.addListener("onRegistrationFailed", callback),
    onRegistrationComplete: (
      callback: (event: EventTypeMap["onRegistrationComplete"]) => void,
    ) => emitter.addListener("onRegistrationComplete", callback),
    onAuthenticationStarted: (
      callback: (event: EventTypeMap["onAuthenticationStarted"]) => void,
    ) => emitter.addListener("onAuthenticationStarted", callback),
    onAuthenticationFailed: (
      callback: (event: EventTypeMap["onAuthenticationFailed"]) => void,
    ) => emitter.addListener("onAuthenticationFailed", callback),
    onAuthenticationSuccess: (
      callback: (event: EventTypeMap["onAuthenticationSuccess"]) => void,
    ) => emitter.addListener("onAuthenticationSuccess", callback),
  },
};

const mainFunctions = {
  async register(
    args: AttestationOptions<string>,
  ): Promise<PublicKeyCredential<
    string,
    AuthenticatorAttestationResponse<string>
  > | null> {
    const credential = await nativeModule.register(
      args.preferImmediatelyAvailableCred ?? false,
      args.challenge,
      args.rp,
      args.user,
      args.timeout,
      args.attestation,
      args.excludeCredentials,
      args.authenticatorSelection,
    );
    return JSON.parse(credential);
  },

  async authenticate(
    args: AssertionOptions<string>,
  ): Promise<PublicKeyCredential<
    string,
    AuthenticatorAssertionResponse<string>
  > | null> {
    const credential = await nativeModule.authenticate(
      args.challenge,
      args.timeout,
      args.rpId,
      args.userVerification,
      args.allowCredentials,
    );
    return JSON.parse(credential);
  },
};

export default Object.assign(moduleObjects, mainFunctions);

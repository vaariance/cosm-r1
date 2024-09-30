export type SerializableResult<T, E> =
  | {
      ok: false;
      value?: undefined;
      error: E;
      info?: unknown;
    }
  | {
      ok: true;
      value: T;
      error?: undefined;
      info?: undefined;
    };

export type Result<T, E = string> = SerializableResult<T, E> & {
  unwrap(): T;
  unwrap_err(): E;
  unwrap_or(default_value: T): T;
  map_err<F>(f: (e: E) => F): Result<T, F>;
  map<U>(f: (v: T) => U): Result<U, E>;
};

export const Result = <T, E>(res: SerializableResult<T, E>): Result<T, E> =>
  res.ok ? Ok(res.value) : Err(res.error);

export const Err = <E>(error: E, info?: unknown): Result<never, E> => ({
  ok: false,
  info,
  error,
  unwrap: () => {
    throw error;
  },
  unwrap_err: () => error,
  unwrap_or: <T>(default_value: T): T => default_value,
  map_err: <F>(f: (e: E) => F): Result<never, F> => Err(f(error)),
  map: (): Result<never, E> => Err(error),
});

export const Ok = <T>(value: T): Result<T, never> => ({
  ok: true,
  value,
  unwrap: () => value,
  unwrap_err: () => {
    throw new Error(`Not an error. Has value: ${value}`);
  },
  unwrap_or: <F>(_: F): T => value,
  map_err: <F>(_: (e: never) => F): Result<T, F> => Ok(value),
  map: <U>(f: (v: T) => U): Result<U, never> => Ok(f(value)),
});

export type Subscription = {
  remove: () => void;
};
export type EventEmitter = {
  addListener: <T extends Cosmr1CredentialHandlerModuleEvents>(
    eventName: T,
    listener: (event: EventTypeMap[T]) => void,
  ) => Subscription;
  removeAllListeners: (eventName: Cosmr1CredentialHandlerModuleEvents) => void;
  removeSubscription: (subscription: Subscription) => void;
  emit: <T extends Cosmr1CredentialHandlerModuleEvents>(
    eventName: T,
    params: EventTypeMap[T],
  ) => void;
};

export type Cosmr1CredentialHandlerModuleEvents =
  | "onRegistrationStarted"
  | "onRegistrationFailed"
  | "onRegistrationComplete"
  | "onAuthenticationStarted"
  | "onAuthenticationFailed"
  | "onAuthenticationSuccess";

export type EventTypeMap = {
  onRegistrationStarted: CreateCredentialOptions;
  onRegistrationComplete: PublicKeyCredential<
    BufferSource,
    AuthenticatorAttestationResponse<BufferSource>
  > | null;
  onRegistrationFailed: unknown;
  onAuthenticationStarted: GetCredentialOptions;
  onAuthenticationSuccess: PublicKeyCredential<
    BufferSource,
    AuthenticatorAssertionResponse<BufferSource>
  > | null;
  onAuthenticationFailed: unknown;
};

export type RelyingParty = {
  name: string;
  id: string;
};

export type UserEntity = {
  id: BufferSource;
  name: string;
  displayName: string;
};

export type AuthenticatorSelection = {
  authenticatorAttachment: AuthenticatorAttachment;
  requireResidentKey: boolean;
  residentKey: ResidentKeyRequirement;
  userVerification: UserVerificationRequirement;
};

export type ExclusiveCredentials = {
  items: PublicKeyCredentialDescriptor[];
};

type ExclusiveCredentialsB64 = {
  items: Pick<PublicKeyCredentialDescriptor, "type" | "transports"> &
    { id: string }[];
};

export interface CreateCredentialOptions {
  rp: RelyingParty;
  user: UserEntity;
  challenge: BufferSource;
  pubKeyCredParams: PublicKeyCredentialParameters[];
  timeout: number;
  authenticatorSelection: AuthenticatorSelection;
  attestation: AttestationConveyancePreference;
  excludeCredentials?: PublicKeyCredentialDescriptor[];
}

export interface GetCredentialOptions {
  challenge: BufferSource;
  allowCredentials: PublicKeyCredentialDescriptor[];
  timeout: number;
  userVerification?: UserVerificationRequirement;
  rpId?: string;
}

export const Constants = {
  TIMEOUT: 60000,
  ATTESTATION: "direct" as AttestationConveyancePreference,
  AUTHENTICATOR_ATTACHMENT: "platform" as AuthenticatorAttachment,
  REQUIRE_RESIDENT_KEY: true,
  RESIDENT_KEY: "required" as ResidentKeyRequirement,
  USER_VERIFICATION: "required" as UserVerificationRequirement,
  PUB_KEY_CRED_PARAM: {
    type: "public-key",
    alg: -7,
  } as PublicKeyCredentialParameters,
};

export type AttestationOptions<G = string | BufferSource> =
  G extends BufferSource ? AttestationOptionsBinary : AttestationOptionsB64;

export type AttestationOptionsBinary = {
  preferImmediatelyAvailableCred?: boolean;
  challenge: BufferSource;
  rp: RelyingParty;
  user: UserEntity;
  timeout: number | null;
  attestation: AttestationConveyancePreference | null;
  excludeCredentials?: ExclusiveCredentials;
  authenticatorSelection?: AuthenticatorSelection;
};

export type AttestationOptionsB64 = Omit<
  AttestationOptionsBinary,
  "challenge" | "user" | "excludeCredentials"
> & {
  challenge: string;
  user: Pick<UserEntity, "name" | "displayName"> & { id: string };
  excludeCredentials?: ExclusiveCredentialsB64;
};

export type AssertionOptions<H = string | BufferSource> = H extends BufferSource
  ? AssertionOptionsBinary
  : AssertionOptionsB64;

export type AssertionOptionsBinary = {
  challenge: BufferSource;
  allowCredentials?: ExclusiveCredentials;
  timeout: number | null;
  userVerification?: UserVerificationRequirement;
  rpId?: string;
};

export type AssertionOptionsB64 = Omit<
  AssertionOptionsBinary,
  "challenge" | "allowCredentials"
> & {
  challenge: string;
  allowCredentials?: ExclusiveCredentialsB64;
};

export type PublicKeyCredential<
  S = BufferSource | string,
  T = AuthenticatorAttestationResponse<S> | AuthenticatorAssertionResponse<S>,
> = {
  id: string;
  rawId?: S;
  type: string;
  response?: T;
};

export type AuthenticatorAttestationResponse<T> = {
  attestationObject: T;
  clientDataJSON: T;
};

export type AuthenticatorAssertionResponse<U> = {
  authenticatorData: U;
  signature: U;
  clientDataJSON: U;
  userHandle: U;
};

export type ClientDataObject = {
  challenge: string;
  origin: string;
  type: "webauthn.create" | "webauthn.get";
};

export type AttestationObject = {
  authData: ArrayBuffer;
  fmt: string;
  attStmt: AttestationStatement;
};

export type AttestationStatement = {
  sig: Uint8Array;
  x5c: ArrayLike<number>;
  alg: number;
};

export type AttestedCredentialData<T = ArrayBuffer> = {
  aaguid: ArrayBuffer;
  credentialIDLength: number;
  credentialID: ArrayBuffer;
  credentialPublicKey: Tuple<T, T>;
};

export type Tuple<T, U> = [T, U];

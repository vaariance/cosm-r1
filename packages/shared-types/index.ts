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

export type RelyingParty = {
  name: string;
  id: string;
};

export type UserEntity = {
  id: string;
  name: string;
  displayName: string;
};

export type AuthenticatorSelection = {
  authenticatorAttachment: string;
  requireResidentKey: boolean;
  residentKey: string;
  userVerification: string;
};

export type PublicKeyCredentialDescriptor = {
  id: string;
  type: string;
  transports?: string[];
};

export type ExclusiveCredentials = {
  items: PublicKeyCredentialDescriptor[];
};

export type PublicKeyCred = {
  type: string;
  alg: number;
};

export interface CreateCredentialOptions {
  rp: RelyingParty;
  user: UserEntity;
  challenge: string;
  pubKeyCredParams: PublicKeyCred[];
  timeout: number;
  authenticatorSelection: AuthenticatorSelection;
  attestation: string;
  excludeCredentials?: PublicKeyCredentialDescriptor[];
}

export interface GetCredentialOptions {
  challenge: string;
  allowCredentials: PublicKeyCredentialDescriptor[];
  timeout: number;
  userVerification: string;
  rpId: string;
}

export const Constants = {
  TIMEOUT: 60000,
  ATTESTATION: "direct",
  AUTHENTICATOR_ATTACHMENT: "platform",
  REQUIRE_RESIDENT_KEY: true,
  RESIDENT_KEY: "required",
  USER_VERIFICATION: "required",
};

export type AttestationOptions = {
  preferImmediatelyAvailableCred: boolean;
  challenge: string;
  rp: RelyingParty;
  user: UserEntity;
  timeout?: number;
  attestation?: string;
  excludeCredentials?: ExclusiveCredentials;
  authenticatorSelection?: AuthenticatorSelection;
};

export type AssertionOptions = {
  challenge: string;
  allowCredentials: PublicKeyCredentialDescriptor[];
  timeout?: number;
  userVerification?: string;
  rpId?: string;
};

export type PublicKeyCredential<
  T = AuthenticatorAttestationResponse | AuthenticatorAssertionResponse,
> = {
  id: string;
  rawId: ArrayBuffer;
  type: string;
  response: T;
};

export type AuthenticatorAttestationResponse = {
  attestationObject: ArrayBuffer;
  clientDataJSON: ArrayBuffer;
};

export type AuthenticatorAssertionResponse = {
  authenticatorData: ArrayBuffer;
  signature: ArrayBuffer;
  clientDataJSON: ArrayBuffer;
  userHandle: ArrayBuffer;
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

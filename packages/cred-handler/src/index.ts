import {
  NativeModulesProxy,
  EventEmitter,
  Subscription,
} from "expo-modules-core";

// Import the native module. On web, it will be resolved to Cosmr1CredentialHandler.web.ts
// and on native platforms to Cosmr1CredentialHandler.ts
import { ChangeEventPayload } from "shared-types";

import Cosmr1CredentialHandlerModule from "./Cosmr1CredentialHandlerModule";

// Get the native constant value.
export const PI = Cosmr1CredentialHandlerModule.PI;

export function hello(): string {
  return Cosmr1CredentialHandlerModule.hello();
}

export async function setValueAsync(value: string) {
  return await Cosmr1CredentialHandlerModule.setValueAsync(value);
}

const emitter = new EventEmitter(
  Cosmr1CredentialHandlerModule ?? NativeModulesProxy.Cosmr1CredentialHandler,
);

export function addChangeListener(
  listener: (event: ChangeEventPayload) => void,
): Subscription {
  return emitter.addListener<ChangeEventPayload>("onChange", listener);
}

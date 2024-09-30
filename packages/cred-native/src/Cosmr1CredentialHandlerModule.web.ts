import Cosmr1CredentialHandlerModule from "@vaariance/cred-web";
import { EventEmitter } from "expo-modules-core";

const emitter = new EventEmitter({} as any);

const webModule = Cosmr1CredentialHandlerModule(emitter);

export default webModule;

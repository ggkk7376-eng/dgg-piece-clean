import config from "@payload-config";
import { getPayload } from "payload";

export const payload = await getPayload({ config }).catch(e => {
    console.error("PAYLOAD INIT FAILED (Ignored for build):", e);
    // Return a proxy that throws on access, allowing import to succeed but usage to fail
    return new Proxy({}, {
        get: (_target, prop) => {
            throw new Error(`Payload failed to init: cannot access ${String(prop)}`);
        }
    }) as any;
});

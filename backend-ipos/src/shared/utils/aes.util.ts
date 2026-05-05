import * as crypto from "crypto";


const ALGO = "aes-256-gcm";

function getKey(): Buffer {
    const keyHex = process.env.ENCRYPTION_KEY;


    if (!keyHex) {
        throw new Error("ENCRYPTION_KEY is not set");
    }

    const key = Buffer.from(keyHex, "hex");

    if (key.length !== 32) {
        throw new Error("ENCRYPTION_KEY must be 32 bytes (64 hex chars)");
    }

    return key;
}
export function encrypt(text: string) {
    const iv = crypto.randomBytes(12);
    const KEY = getKey();

    const cipher = crypto.createCipheriv(ALGO, KEY, iv);

    const encrypted = Buffer.concat([
        cipher.update(text, "utf8"),
        cipher.final(),
    ]);

    const tag = cipher.getAuthTag();

    return "v1:" + Buffer.concat([iv, tag, encrypted]).toString("base64");
}

export function decrypt(enc: string) {
    if (!enc.startsWith("v1:")) {
        return enc; // plain data
    }
    const KEY = getKey();


    const raw = enc.slice(3); // remove prefix
    const data = Buffer.from(raw, "base64");

    const iv = data.subarray(0, 12);
    const tag = data.subarray(12, 28);
    const text = data.subarray(28);

    const decipher = crypto.createDecipheriv(ALGO, KEY, iv);
    decipher.setAuthTag(tag);

    return decipher.update(text) + decipher.final("utf8");
}
import { ZodSchema } from "zod";

export async function safeFetch<T>(
    input: RequestInfo,
    init: RequestInit,
    schema: ZodSchema<T>
): Promise<T> {
    const res = await fetch(input, init);
    const json = await res.json();

    const parsed = schema.safeParse(json);

    if (!parsed.success) {
        console.error("API contract violation:", parsed.error);
        throw new Error("API_CONTRACT_VIOLATION");
    }
    return parsed.data;
}

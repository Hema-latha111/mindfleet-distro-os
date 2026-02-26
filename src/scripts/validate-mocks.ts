
import { z } from "zod";
import {
    DispatchRunListItemSchema,
    DispatchStatusSchema,
    MeSchema,
    AIChatResponseSchema
} from "../validation/schemas";
import { mockMe } from "../mocks/fixtures/mockMe";
import { mockDispatchList } from "../mocks/fixtures/mockDispatchList";
import { mockAIResponse } from "../mocks/fixtures/mockAIResponse";

console.log("--------------------------------------------------");
console.log("Running Zod Validation on Mocks");
console.log("--------------------------------------------------");

async function validate() {
    try {
        console.log("\n1. Validating Mock Me Response...");
        MeSchema.parse(mockMe);
        console.log("✅ MeSchema passed.");

        console.log("\n2. Validating Mock Dispatch List...");
        // The mock data structure for list is { request_id, data: { items: [] } }
        // We need to define the envelope schema for the list items
        const DispatchListSchema = z.object({
            request_id: z.string(),
            data: z.object({
                items: z.array(DispatchRunListItemSchema)
            })
        });

        DispatchListSchema.parse(mockDispatchList);
        console.log("✅ DispatchListSchema passed.");

        console.log("\n3. Validating AI Chat Response...");
        AIChatResponseSchema.parse(mockAIResponse);
        console.log("✅ AIChatResponseSchema passed.");

        console.log("\n--------------------------------------------------");
        console.log("🎉 All validations passed successfully!");
        console.log("--------------------------------------------------");

    } catch (error) {
        console.error("\n❌ Validation Failed:");
        if (error instanceof z.ZodError) {
            console.error(JSON.stringify(error.format(), null, 2));
        } else {
            console.error(error);
        }
        process.exit(1);
    }
}

validate();

import { OpenAIModule } from "./openai.module.js";
import { OpenAIService } from "./openai.service.js";

const openAiModule = new OpenAIModule();
const openAiService = new OpenAIService(openAiModule);

export { openAiService };

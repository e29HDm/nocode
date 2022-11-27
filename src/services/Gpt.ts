import { Configuration, OpenAIApi } from "openai";
import { LocalStorage } from "./LocalStorage";

export class Gpt {
  static async completion(
    prompt: string,
    input: string
  ): Promise<string | undefined> {
    const configuration = new Configuration({
      apiKey: LocalStorage.get("apiKey") || "",
    });
    const openai = new OpenAIApi(configuration);

    const finalPrompt = `
    You will be asked to do simple tasks like sorting list of items, or answering questions.
    Respond correctly to any of those tasks to get a reward. Do not write anything related to programming or coding. Simply solve the tasks.

    Follow the instructions below:

    INSTRUCTIONS:
    ${prompt}

    INPUT:
    ${input}

    OUTPUT:
    `;

    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: finalPrompt,
      max_tokens: 150,
      temperature: 0,
      top_p: 1,
      n: 1,
      stream: false,
      logprobs: null,
    });
    return completion.data.choices[0].text;
  }
}

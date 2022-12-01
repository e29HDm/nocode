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

Follow the instructions in the tasks bellow:

TASKS:

==============

INSTRUCTIONS:

sort list alphabetically while keeping order numbering

INPUT:
1. cat
2. car
3. dog
4. cart
5. aa
6. caca

OUTPUT:
->

1. aa
2. cat
3. car
4. cart
5. caca
6. dog

==============

INSTRUCTIONS:

write a grocery list to prepare a wonderful thanksgiving

INPUT:

OUTPUT:
->

1. Turkey
2. Stuffing
3. Cranberry sauce
4. Mashed potatoes
5. Gravy
6. Green beans
7. Rolls
8. Pumpkin pie

==============

INSTRUCTIONS:

keep only the first number before each ":("
separate those numbers with a newline character
then make a numbered list with it

INPUT:

0:(1), 150:(0), 200:(-1), 350:(0), 600:(1), 650:(2), 700:(3), 750:(4), 800:(3), 850:(2), 900:(1), 950:(0)

OUTPUT:
->

1. 0
2. 150
3. 200
4. 350
5. 600
6. 650
7. 700
8. 750
9. 800
10. 850
11. 900
12. 950

==============

INSTRUCTIONS:

Replace every "\n" by a line break character
Replace every "i" by a "a"
Replace the first occurrence of the word "banana" by "hello"

INPUT:
binini\nbinini\npair\nbinini\nhello\nbibini\ncar\n

OUTPUT:
->

hello
banana
pair
banana
hello
babana
car

==============

INSTRUCTIONS:

for each line, count the number of words and characters

INPUT:

hello world
how are you today?
blablablablablablablablabla
for each line, count the number of words and characters

OUTPUT:
->

Line 1: 2 words, 11 characters
Line 2: 4 words, 18characters
Line 3: 1 word, 27characters
Line 4: 10 words, 55characters

==============

INSTRUCTIONS:

${prompt}

INPUT:

${input}

OUTPUT:
->
`;

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: finalPrompt,
      max_tokens: 300,
      temperature: 0,
      top_p: 1,
      n: 1,
      stream: false,
      logprobs: null,
    });
    return completion.data.choices[0].text;
  }
}

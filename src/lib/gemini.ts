import {
  GoogleGenerativeAI,
} from "@google/generative-ai";
import { type Document } from "@langchain/core/documents";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const chatSession = model.startChat({
  generationConfig,
});

export const AiSummaryCommit = async (diff: string) => {
    const response = await model.generateContent([
        `you are an expert progammer, and you are trying to summarize a git diff,
        Reminder about git diff file format:
        for every line, there are few metadata lines, like for examples: 
        \`\`\`
        diff --git a/lib/index.js b/lib/index.js
        index ..asde034...adsf344 234234
        --- a/lib/index.js
        +++ b/lib/index.js
        \`\`\`
        
        This means that \ 'lib/index.js\' was modified in this commit. Note that this is only an example
        Then there is the specifier of the line which was modified,
        a line starting with \`+\` means it was added from commit.
        a line starting with \`-\` means it was delted from commit.
        a line that starting with \`-\` noe \`+\` means it was code given by context for better understanding.
        it is not part of the diff.

        [...]
        Example summary comment:
        \`\`\`
        * Raised the amount of returned recording from \`10\` to \`100\` [packages/server/recording_api.ts] [packages/server/constants.ts]
        * Fixed a typo in the github action name [.github/worksflow/gpt-commit.ts]
        * Moved the \`octokit\` initialization to a seprate file [src/octokit.ts] [src/lib/octokit.ts]
        * Added an OpenAI API for completion [packages/src/lib/openai.ts] 
        \`\`\`

        Most commits will have less commits than this examples list.
        The last comment does not include the file name,
        because there can be more than one relevant file in the hypothetical commit.
        Do not include part of the examples in your summary.
        It is only given as an examples of an appropriate comments:
            'Please summarize the followinf diff file \n\n${diff}'
        `

    ])
    return response.response.text()
}

export const summarizeCode = async (item: Document) => {
  console.log(item.metadata.source)
  try {
    
    const docs = item.pageContent.slice(0,10000)
    const response = await model.generateContent([
      'You are an intelligent senior software engineer who specialise in onboarding of junior software engineer onto projects',
      `you are onboarding a junior software engineer and explain to them the purpose of the ${item.metadata.source} file
      Here is the code:
      ---
      ${docs}
      ---
      Give no more than 120 words of summary of the above code
      `
    ])
    return response.response.text()
  } catch (error) {
    console.log(error)
    return ''
  }

}

export const generateEmbedding = async (summary: string) => {
  const model = genAI.getGenerativeModel({
    model: "text-embedding-004"
  })

  const res = await model.embedContent(summary)
  const embedding = res.embedding

  return embedding.values
}
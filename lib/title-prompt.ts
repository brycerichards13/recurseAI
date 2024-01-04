export const titlePromptText = `
for all responses to my queries, I require the information to be structured like a quote of a person.
This format should be strictly adhered to, regardless of the nature of the query.
  Rules for response:
    The start must be a quotation mark.
    The end must be a quotation mark.

You must look at the previous inputs and you are to respond with just the title that captures the essence of the paragraphs.
The response must be a single sentence, it could be a few words, it could be a few words.
It must not be more than 75 characters long.
`;

import htmlToText from 'html-to-text';
// ExpressJS handler helper.
export const handleErrorsExpress = (handler) => async (
  request,
  response,
) => {
  try {
    const result = await handler(request);
    response.status(200).json(result);
  } catch (error) {
    response.status(error.code || 500).send(error.message || error);
  }
};

// Filter unwanted fields, that's all.
export function successResponse({ stream = [], data = [] }) {
  return {
    stream: stream,
    posts: data
  };
}

// Filter unwanted fields, that's all. Also add a default value to the stream.
export function failResponse({
  stream = [
    {
      text:
        "J'ai essayé de contacter un service externe. Celui-ci n'a pas répondu."
    }
  ],
  data = []
}) {
  return {
    stream: stream,
    posts: data
  };
}

// Options for html-to-text
const cleanTitleOptions = {
  wordwrap: false,
  preserveNewlines: true,
  singleNewLineParagraphs: true,
  ignoreHref: true,
  hideLinkHrefIfSameAsText: true,
  ignoreImage: true,
  uppercaseHeadings: false
};

// Options for html-to-text
const cleanDescriptionOptions = {
  wordwrap: false,
  preserveNewlines: true,
  singleNewLineParagraphs: true,
  ignoreHref: true,
  hideLinkHrefIfSameAsText: true,
  ignoreImage: true,
  uppercaseHeadings: false
};

// simple helper to clean html strings.
export const cleanResponse = ({ title, desc }) => ({
  cleanedTitle: htmlToText.fromString(title, cleanTitleOptions),
  cleanedDesc: htmlToText.fromString(desc, cleanDescriptionOptions)
});
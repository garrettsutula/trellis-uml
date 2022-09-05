export const extractModelType = /(?:\.\/models\/(\w*)\/).*(?:.yaml)/;
export const extractTemplateType = /^.\/\w*\/(?<modelType>\w*)\/(?<fileName>\w*).(?<fileType>\w*).hbs$/;

export const templateType = /(\w*).hbs/;
export const schemaType = /(\w*).schema.json/;
export const scriptType = /(\w*).js/;
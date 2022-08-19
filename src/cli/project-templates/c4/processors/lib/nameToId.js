module.exports = (name) => name.replace(/_{2}|_|\*|\(|\)/g, '').replace(/\n| |-|_|\.|:{2}|_{3}/g, '');

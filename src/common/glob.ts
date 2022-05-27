import { glob } from 'glob';

export function globAsync(filePath): Promise<string[]> {
  return new Promise((resolve, reject) => {
    glob(filePath, (err, matches) => {
      if (err) reject(err);
      resolve(matches);
    });
  });
}

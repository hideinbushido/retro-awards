import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getStorageInstance } from './firebase';

export type UploadCategory = 'OPENING' | 'ANIME';
export type UploadType = 'Cover' | 'Audio';

export function uploadFile(
  year: number,
  category: UploadCategory,
  type: UploadType,
  file: File,
  onProgress: (pct: number) => void,
): Promise<string> {
  const storage = getStorageInstance();
  const ext = file.name.split('.').pop();
  const name = file.name.replace(/\.[^/.]+$/, '').toUpperCase();
  const path = `${year}/${category}/${type}/${name}.${ext}`;
  const storageRef = ref(storage, path);
  const task = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    task.on(
      'state_changed',
      (snap) => onProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
      reject,
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        resolve(url);
      },
    );
  });
}

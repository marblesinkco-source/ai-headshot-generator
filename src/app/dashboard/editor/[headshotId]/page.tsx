import type { Metadata } from 'next';
import HeadshotEditor from '@/components/dashboard/headshot-editor';

export const metadata: Metadata = {
  title: 'Edit Headshot — TailorPic',
};

export default function EditorPage() {
  return <HeadshotEditor />;
}

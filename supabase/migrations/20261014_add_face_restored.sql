-- Add face_restored column to track CodeFormer face restoration
ALTER TABLE generated_headshots ADD COLUMN IF NOT EXISTS face_restored boolean DEFAULT false;

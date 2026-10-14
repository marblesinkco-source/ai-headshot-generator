-- Add quality_score column to generated_headshots
-- Stores the overall image quality score (0-100) computed by scoreGeneratedImage()
ALTER TABLE generated_headshots ADD COLUMN IF NOT EXISTS quality_score integer;

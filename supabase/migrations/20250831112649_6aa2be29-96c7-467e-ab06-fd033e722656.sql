-- Fix security issues for existing tables by enabling RLS
ALTER TABLE public.companies_input ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_media_results ENABLE ROW LEVEL SECURITY;

-- Fix the search path for the update function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
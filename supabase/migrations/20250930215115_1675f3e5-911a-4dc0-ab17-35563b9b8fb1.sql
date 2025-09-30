-- Create a separate schema for other project features
CREATE SCHEMA IF NOT EXISTS other_project;

-- Move tables to other_project schema
ALTER TABLE IF EXISTS public.companies_input SET SCHEMA other_project;
ALTER TABLE IF EXISTS public.social_media_results SET SCHEMA other_project;

-- Recreate views in other_project schema
DROP VIEW IF EXISTS public.companies_with_social_counts;
DROP VIEW IF EXISTS public.crawling_progress;
DROP VIEW IF EXISTS public.social_media_summary;

CREATE OR REPLACE VIEW other_project.companies_with_social_counts AS
SELECT 
    ci.id,
    ci.company_name,
    ci.website,
    ci.status,
    ci.last_crawled_at,
    COUNT(smr.id) as social_media_profiles_found
FROM other_project.companies_input ci
LEFT JOIN other_project.social_media_results smr ON ci.company_name = smr.company_name
GROUP BY ci.id, ci.company_name, ci.website, ci.status, ci.last_crawled_at;

CREATE OR REPLACE VIEW other_project.crawling_progress AS
SELECT 
    status,
    COUNT(*) as count,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM other_project.companies_input), 2) as percentage
FROM other_project.companies_input
GROUP BY status;

CREATE OR REPLACE VIEW other_project.social_media_summary AS
SELECT 
    platform,
    COUNT(DISTINCT company_name) as companies_with_profile,
    COUNT(*) as total_profiles
FROM other_project.social_media_results
GROUP BY platform;

-- Move functions to other_project schema
CREATE OR REPLACE FUNCTION other_project.add_companies(companies json)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = other_project
AS $$
DECLARE
    company_record JSON;
BEGIN
    FOR company_record IN SELECT * FROM json_array_elements(companies)
    LOOP
        INSERT INTO other_project.companies_input (company_name, website)
        VALUES (
            company_record->>'name',
            company_record->>'website'
        )
        ON CONFLICT DO NOTHING;
    END LOOP;
END;
$$;

CREATE OR REPLACE FUNCTION other_project.reset_company_for_recrawl(company_name_param character varying)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = other_project
AS $$
BEGIN
    UPDATE other_project.companies_input 
    SET 
        status = 'pending',
        last_crawled_at = NULL,
        error_message = NULL
    WHERE company_name = company_name_param;
    
    DELETE FROM other_project.social_media_results 
    WHERE company_name = company_name_param;
END;
$$;

-- Drop old functions from public schema
DROP FUNCTION IF EXISTS public.add_companies(json);
DROP FUNCTION IF EXISTS public.reset_company_for_recrawl(character varying);

-- Grant necessary permissions on the new schema
GRANT USAGE ON SCHEMA other_project TO authenticated;
GRANT USAGE ON SCHEMA other_project TO service_role;
GRANT ALL ON ALL TABLES IN SCHEMA other_project TO service_role;
GRANT SELECT ON ALL TABLES IN SCHEMA other_project TO authenticated;
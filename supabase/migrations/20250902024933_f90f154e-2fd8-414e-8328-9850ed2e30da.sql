-- Fix RLS policies for visitor_analytics and newsletter_subscriptions to allow anonymous inserts

-- Update visitor_analytics policy to allow anyone to insert (for anonymous tracking)
DROP POLICY IF EXISTS "Service role full access to visitor_analytics" ON public.visitor_analytics;

CREATE POLICY "Allow anonymous inserts to visitor_analytics" 
ON public.visitor_analytics 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Service role can read visitor_analytics" 
ON public.visitor_analytics 
FOR SELECT 
USING ((auth.jwt() ->> 'role'::text) = 'service_role'::text);

-- Update newsletter_subscriptions policy to allow anyone to insert
DROP POLICY IF EXISTS "Service role full access to newsletter_subscriptions" ON public.newsletter_subscriptions;

CREATE POLICY "Allow anonymous inserts to newsletter_subscriptions" 
ON public.newsletter_subscriptions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Service role can read newsletter_subscriptions" 
ON public.newsletter_subscriptions 
FOR SELECT 
USING ((auth.jwt() ->> 'role'::text) = 'service_role'::text);
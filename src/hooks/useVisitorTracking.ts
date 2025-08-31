import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useVisitorTracking = () => {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Get visitor's location data from a free IP geolocation service
        const response = await fetch('https://ipapi.co/json/');
        const locationData = await response.json();

        // Only store city and country, never IP address for privacy
        const { error } = await supabase
          .from('visitor_analytics')
          .insert({
            city: locationData.city || null,
            country: locationData.country_name || null,
          });

        if (error) {
          console.error('Error tracking visitor:', error);
        }
      } catch (error) {
        console.error('Error fetching location data:', error);
        // Fallback: track visit without location data
        try {
          await supabase
            .from('visitor_analytics')
            .insert({
              city: null,
              country: null,
            });
        } catch (fallbackError) {
          console.error('Error tracking fallback visitor:', fallbackError);
        }
      }
    };

    // Track visitor only once per session
    const hasTrackedThisSession = sessionStorage.getItem('visitor-tracked');
    if (!hasTrackedThisSession) {
      trackVisitor();
      sessionStorage.setItem('visitor-tracked', 'true');
    }
  }, []);
};

export default useVisitorTracking;
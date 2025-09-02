import React, { useState, useEffect } from 'react';
import { X, Mail, Linkedin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const NewsletterPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem('newsletter-popup-seen');
    
    if (!hasSeenPopup) {
      // Show popup after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('newsletter-popup-seen', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('newsletter_subscriptions')
        .insert({
          email: email.toLowerCase().trim(),
          linkedin_url: linkedinUrl.trim() || null
        });

      console.log('Newsletter subscription attempt:', { data, error });

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Already subscribed",
            description: "This email is already subscribed to our newsletter.",
            variant: "destructive"
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Successfully subscribed!",
          description: "Thank you for subscribing. We'll send updates monthly (max).",
        });
        handleClose();
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Subscription failed",
        description: "There was an error processing your subscription. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background border border-border rounded-lg shadow-lg max-w-md w-full p-6 relative animate-in fade-in-0 zoom-in-95 duration-300">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 h-6 w-6"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Mail className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h3 className="font-heading text-xl text-foreground mb-2">
            Stay Updated
          </h3>
          <p className="text-muted-foreground text-sm">
            Get insights on procurement and contract management. 
            <br />
            <span className="font-medium">Maximum once per month</span> - we promise not to clutter your inbox.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="linkedin" className="text-sm font-medium flex items-center gap-2">
              <Linkedin className="h-4 w-4" />
              LinkedIn Profile (optional)
            </Label>
            <Input
              id="linkedin"
              type="url"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder="https://linkedin.com/in/yourprofile"
              className="mt-1"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Maybe Later
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsletterPopup;
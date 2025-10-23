import { useEffect } from "react";
import IslandNavbar from "@/components/IslandNavbar";
import FooterSection from "@/components/FooterSection";
import useVisitorTracking from "@/hooks/useVisitorTracking";

const PrivacyPolicy = () => {
  useVisitorTracking();

  useEffect(() => {
    document.title = "Privacy Policy - Oscar Lopez";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Privacy Policy for GiveMeThatNDA app. Learn how we collect, use, and protect your information."
      );
    }

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", window.location.href);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <IslandNavbar />
      
      <main className="container mx-auto px-6 lg:px-12 py-24 max-w-4xl">
        <h1 className="font-body text-4xl md:text-5xl text-foreground mb-2">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground text-sm mb-8">
          GiveMeThatNDA - Last Updated: October 23, 2025
        </p>

        <section className="mb-12">
          <h2 className="font-body text-3xl text-foreground mb-4">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            GiveMeThatNDA ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our mobile application.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-body text-3xl text-foreground mb-4">Information We Collect</h2>
          
          <h3 className="font-body text-xl text-foreground mb-3 mt-6">Information You Provide</h3>
          <ul className="text-muted-foreground space-y-2 pl-8 list-disc">
            <li><strong>Profile Information:</strong> Name, email address, company name, company address, and registration number</li>
            <li><strong>NDA Content:</strong> Information you enter when creating NDAs, including party details, purpose, and terms</li>
            <li><strong>Signatures:</strong> Digital signatures and optional verification photos you provide</li>
          </ul>
          
          <h3 className="font-body text-xl text-foreground mb-3 mt-6">Automatically Collected Information</h3>
          <ul className="text-muted-foreground space-y-2 pl-8 list-disc">
            <li><strong>Device Information:</strong> Device type, operating system version</li>
            <li><strong>Usage Data:</strong> App features used, crash reports (if enabled)</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="font-body text-3xl text-foreground mb-4">How We Use Your Information</h2>
          <p className="text-muted-foreground mb-4">We use the collected information to:</p>
          <ul className="text-muted-foreground space-y-2 pl-8 list-disc">
            <li>Generate and store your NDA documents</li>
            <li>Enable you to share NDAs via email</li>
            <li>Provide customer support</li>
            <li>Improve app functionality and user experience</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="font-body text-3xl text-foreground mb-4">Data Storage</h2>
          
          <h3 className="font-body text-xl text-foreground mb-3 mt-6">Local Storage</h3>
          <ul className="text-muted-foreground space-y-2 pl-8 list-disc">
            <li>All your data is stored <strong>locally on your device</strong></li>
            <li>We do <strong>NOT</strong> store your data on external servers</li>
            <li>Your NDAs, signatures, and profile information remain on your device only</li>
          </ul>
          
          <h3 className="font-body text-xl text-foreground mb-3 mt-6">Data Security</h3>
          <ul className="text-muted-foreground space-y-2 pl-8 list-disc">
            <li>Data is protected by your device's security features</li>
            <li>We recommend enabling device encryption and using a strong passcode</li>
            <li>Regular security updates are provided through app updates</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="font-body text-3xl text-foreground mb-4">Data Sharing</h2>
          <p className="text-muted-foreground mb-4">We do NOT share your personal information with third parties, except:</p>
          <ul className="text-muted-foreground space-y-2 pl-8 list-disc">
            <li><strong>Email Service:</strong> When you choose to share an NDA via email, the document is sent through your device's email client</li>
            <li><strong>Legal Requirements:</strong> If required by law or to protect our rights</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="font-body text-3xl text-foreground mb-4">Your Rights</h2>
          <p className="text-muted-foreground mb-4">You have the right to:</p>
          <ul className="text-muted-foreground space-y-2 pl-8 list-disc">
            <li><strong>Access:</strong> View all data stored in the app</li>
            <li><strong>Delete:</strong> Remove any or all data from the app</li>
            <li><strong>Export:</strong> Share your NDAs via email</li>
            <li><strong>Withdraw Consent:</strong> Stop using the app at any time</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="font-body text-3xl text-foreground mb-4">Children's Privacy</h2>
          <p className="text-muted-foreground">
            Our app is not intended for users under 18 years of age. We do not knowingly collect information from children. If you believe a child has provided information through our app, please contact us at support@oscarlopez.ch.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-body text-3xl text-foreground mb-4">Changes to This Policy</h2>
          <p className="text-muted-foreground">
            We may update this Privacy Policy from time to time. We will notify you of significant changes through the app or via email. Your continued use of the app after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-body text-3xl text-foreground mb-4">International Users</h2>
          <p className="text-muted-foreground">
            Since all data is stored locally on your device, international data transfer regulations do not apply. Your data never leaves your device unless you explicitly choose to share it via email.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-body text-3xl text-foreground mb-4">Contact Us</h2>
          <p className="text-muted-foreground mb-4">
            If you have questions about this Privacy Policy or our data practices, please contact us:
          </p>
          <div className="bg-muted/30 rounded-lg p-6">
            <p className="text-muted-foreground">
              Email: <a href="mailto:support@oscarlopez.ch" className="text-primary hover:underline">support@oscarlopez.ch</a><br />
              Response Time: Within 24 hours
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-body text-3xl text-foreground mb-4">Consent</h2>
          <p className="text-muted-foreground">
            By using GiveMeThatNDA, you consent to this Privacy Policy and agree to its terms.
          </p>
        </section>
      </main>

      <FooterSection />
    </div>
  );
};

export default PrivacyPolicy;

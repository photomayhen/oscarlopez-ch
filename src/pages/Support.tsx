import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import IslandNavbar from "@/components/IslandNavbar";
import FooterSection from "@/components/FooterSection";
import useVisitorTracking from "@/hooks/useVisitorTracking";

const Support = () => {
  const navigate = useNavigate();
  useVisitorTracking();

  useEffect(() => {
    document.title = "Support - Oscar Lopez";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Get support for GiveMeThatNDA app. Find answers to common questions and contact information."
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
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to previous page</span>
        </button>
        
        <h1 className="font-body text-4xl md:text-5xl text-foreground mb-4">
          GiveMeThatNDA - Support
        </h1>
        <p className="font-body text-lg text-muted-foreground mb-8">
          Thank you for using GiveMeThatNDA. We're here to help you create professional Non-Disclosure Agreements quickly and easily.
        </p>

        <div className="bg-muted/30 rounded-lg p-6 mb-8">
          <p className="font-semibold text-foreground mb-2">Need Help?</p>
          <p className="text-muted-foreground">
            Email: <a href="mailto:support@oscarlopez.ch" className="text-primary hover:underline">support@oscarlopez.ch</a><br />
            Response Time: Within 24 hours
          </p>
        </div>

        <h2 className="font-body text-3xl text-foreground mt-12 mb-6">
          Frequently Asked Questions
        </h2>

        <div className="space-y-8">
          <div className="pb-6 border-b border-border">
            <h3 className="font-semibold text-foreground mb-3">Q: How do I create my first NDA?</h3>
            <p className="text-muted-foreground pl-5">
              A: Simply complete your profile, then tap "Create NDA" on the home screen. Answer the questionnaire about the other party and NDA terms, review the generated document, and proceed to signatures.
            </p>
          </div>

          <div className="pb-6 border-b border-border">
            <h3 className="font-semibold text-foreground mb-3">Q: Is my data secure?</h3>
            <p className="text-muted-foreground pl-5">
              A: Yes! All your data is stored locally on your device. We never upload your NDAs, signatures, or personal information to external servers. Your data stays with you.
            </p>
          </div>

          <div className="pb-6 border-b border-border">
            <h3 className="font-semibold text-foreground mb-3">Q: Can I use this for international agreements?</h3>
            <p className="text-muted-foreground pl-5">
              A: Absolutely! We support multiple jurisdictions including UK, US, Canada, Australia, EU, and Singapore. Select your jurisdiction when creating the NDA.
            </p>
          </div>

          <div className="pb-6 border-b border-border">
            <h3 className="font-semibold text-foreground mb-3">Q: How do I share my NDA?</h3>
            <p className="text-muted-foreground pl-5">
              A: After signing, tap "Share NDA" to send it via email. The recipient will receive a PDF copy of the fully executed agreement.
            </p>
          </div>

          <div className="pb-6 border-b border-border">
            <h3 className="font-semibold text-foreground mb-3">Q: Can I edit an NDA after creation?</h3>
            <p className="text-muted-foreground pl-5">
              A: Once an NDA is signed, it cannot be edited to maintain document integrity. You can create a new NDA with updated information if needed.
            </p>
          </div>

          <div className="pb-6 border-b border-border">
            <h3 className="font-semibold text-foreground mb-3">Q: What happens if I delete the app?</h3>
            <p className="text-muted-foreground pl-5">
              A: Since all data is stored locally, deleting the app will remove all your NDAs and profile information. Please back up important documents before uninstalling.
            </p>
          </div>

          <div className="pb-6 border-b border-border">
            <h3 className="font-semibold text-foreground mb-3">Q: Is there a limit to how many NDAs I can create?</h3>
            <p className="text-muted-foreground pl-5">
              A: No! You can create unlimited NDAs with our app.
            </p>
          </div>

          <div className="pb-6 border-b border-border">
            <h3 className="font-semibold text-foreground mb-3">Q: Do I need internet connection to use the app?</h3>
            <p className="text-muted-foreground pl-5">
              A: You can create and view NDAs offline. Internet connection is only required for sharing NDAs via email.
            </p>
          </div>

          <div className="pb-6 border-b border-border">
            <h3 className="font-semibold text-foreground mb-3">Q: Are the NDAs legally binding?</h3>
            <p className="text-muted-foreground pl-5">
              A: Yes, our NDAs are drafted to be legally binding documents. However, we recommend consulting with a legal professional for specific situations or high-value agreements.
            </p>
          </div>

          <div className="pb-6">
            <h3 className="font-semibold text-foreground mb-3">Q: How do I report a bug or suggest a feature?</h3>
            <p className="text-muted-foreground pl-5">
              A: Email us at support@oscarlopez.ch with details about the bug or your feature suggestion. We value your feedback!
            </p>
          </div>
        </div>

        <div className="mt-12 p-6 bg-muted/30 rounded-lg">
          <h2 className="font-body text-2xl text-foreground mb-4">Still Need Help?</h2>
          <p className="text-muted-foreground mb-4">
            If you couldn't find an answer to your question, please don't hesitate to contact us:
          </p>
          <ul className="text-muted-foreground space-y-2 pl-5">
            <li>• Email: <a href="mailto:support@oscarlopez.ch" className="text-primary hover:underline">support@oscarlopez.ch</a></li>
            <li>• We typically respond within 24 hours</li>
            <li>• Include your device type and OS version for technical issues</li>
          </ul>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default Support;

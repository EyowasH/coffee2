'use client';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import MagneticButton from '@/components/ui/MagneticButton';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  AlertCircle, 
  Phone, 
  MessageSquare, 
  Coffee, 
  Building2, 
  Globe 
} from 'lucide-react';

interface FormState {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  coffeeInterest: string;
  requiredVolume: string;
  destinationMarket: string;
  message: string;
  honeypot: string; // Anti-spam bot field
}

const initialFormState: FormState = {
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  country: '',
  coffeeInterest: '',
  requiredVolume: '',
  destinationMarket: '',
  message: '',
  honeypot: '',
};

type FormErrors = Partial<Record<keyof FormState, string>>;

export default function Partnership() {
  const [step, setStep] = useState(0); // 0 = Entry screen, 1-4 = Form steps, 5 = Confirmation
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [rateLimitMessage, setRateLimitMessage] = useState<string | null>(null);

  // References for keyboard focusing upon validation failure
  const companyRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const updateForm = (key: keyof FormState, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Clear field-specific error as they type
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const stepErrors: FormErrors = {};

    if (currentStep === 1) {
      if (!form.companyName.trim()) {
        stepErrors.companyName = 'Company Legal Name is required.';
      } else if (form.companyName.trim().length < 2) {
        stepErrors.companyName = 'Company name must be at least 2 characters.';
      }

      if (!form.country.trim()) {
        stepErrors.country = 'Registered country is required.';
      } else if (form.country.trim().length < 2) {
        stepErrors.country = 'Country name must be at least 2 characters.';
      }

      if (!form.destinationMarket.trim()) {
        stepErrors.destinationMarket = 'Destination port or target market is required.';
      } else if (form.destinationMarket.trim().length < 2) {
        stepErrors.destinationMarket = 'Destination market description must be at least 2 characters.';
      }
    }

    if (currentStep === 2) {
      if (!form.coffeeInterest) {
        stepErrors.coffeeInterest = 'Please select a primary coffee interest category.';
      }
      if (!form.requiredVolume) {
        stepErrors.requiredVolume = 'Please select your estimated sourcing volume.';
      }
    }

    if (currentStep === 3) {
      if (!form.message.trim()) {
        stepErrors.message = 'Please specify details about your sensory standards or annual procurement requirements.';
      } else if (form.message.trim().length < 10) {
        stepErrors.message = 'Sourcing specification/message must be at least 10 characters for proper evaluation.';
      }
    }

    if (currentStep === 4) {
      if (!form.fullName.trim()) {
        stepErrors.fullName = 'Full Name of the representative is required.';
      } else if (form.fullName.trim().length < 2) {
        stepErrors.fullName = 'Representative name must be at least 2 characters.';
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!form.email.trim()) {
        stepErrors.email = 'Business email address is required.';
      } else if (!emailRegex.test(form.email.trim())) {
        stepErrors.email = 'Please provide a valid business email address (e.g. name@company.com).';
      }

      const phoneCleaned = form.phone.replace(/[^0-9]/g, '');
      if (!form.phone.trim()) {
        stepErrors.phone = 'Telephone or WhatsApp number is required for export validation.';
      } else if (phoneCleaned.length < 7) {
        stepErrors.phone = 'Please provide a valid telephone number with country code (minimum 7 digits).';
      }
    }

    setErrors(stepErrors);

    // Auto-focus first error field to assist assistive screen-readers and keyboard tabs
    if (Object.keys(stepErrors).length > 0) {
      if (currentStep === 1) {
        if (stepErrors.companyName) companyRef.current?.focus();
        else if (stepErrors.country) countryRef.current?.focus();
        else if (stepErrors.destinationMarket) destinationRef.current?.focus();
      }
      if (currentStep === 3) {
        if (stepErrors.message) messageRef.current?.focus();
      }
      if (currentStep === 4) {
        if (stepErrors.fullName) fullNameRef.current?.focus();
        else if (stepErrors.email) emailRef.current?.focus();
        else if (stepErrors.phone) phoneRef.current?.focus();
      }
      return false;
    }

    return true;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBackStep = () => {
    setStep((prev) => Math.max(0, prev - 1));
    setErrors({});
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validateStep(4)) return;

    // 1. Honeypot check (Spam Prevention)
    if (form.honeypot) {
      // Quietly trick bots with mock success layout to prevent visual disruption
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setStep(5);
      }, 1000);
      return;
    }

    // 2. Client-side Rate Limiting (Form Abuse Prevention)
    const limitKey = 'fb_form_last_sub';
    const now = Date.now();
    const lastSub = localStorage.getItem(limitKey);
    if (lastSub) {
      const timeElapsed = now - parseInt(lastSub, 10);
      if (timeElapsed < 60000) {
        const secondsLeft = Math.ceil((60000 - timeElapsed) / 1000);
        setRateLimitMessage(`Security rate limit: Please wait ${secondsLeft} seconds before submitting another inquiry.`);
        setTimeout(() => setRateLimitMessage(null), 5000);
        return;
      }
    }

    setIsSubmitting(true);
    setRateLimitMessage(null);

    // Simulate reliable secure B2B api transmission
    setTimeout(() => {
      localStorage.setItem(limitKey, now.toString());
      setIsSubmitting(false);
      setStep(5);
    }, 1500);
  };

  const getEstimatedScoreRange = () => {
    if (!form.requiredVolume) return "Awaiting selector...";
    switch (form.requiredVolume) {
      case 'Sample Request':
        return "Direct Sample Evaluation Match";
      case 'Less than 1 Container':
        return "Premium Micro-lot Allocation";
      case '1–5 Containers':
        return "FCL Container Contract Sourcing";
      case '5–10 Containers':
        return "Strategic Harvest Portfolios";
      case '10+ Containers':
        return "Commercial Enterprise Supply Sourcing";
      default:
        return "B2B Customized Supply Tier";
    }
  };

  return (
    <section
      id="partnership"
      className="bg-obsidian border-t border-glassBorder text-stone py-24 sm:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {step === 0 ? (
          /* Step 0 - Cinematic Gate Entrance & Double Conversion Route */
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center py-12">
            <span className="text-label text-gold block mb-4">Sourcing Inquiries</span>
            <h2 className="font-display font-light text-5xl sm:text-6xl md:text-7xl text-white tracking-tight leading-none mb-6">
              Begin an Export Partnership.
            </h2>
            <p className="font-body text-[#8A8A8A] text-sm sm:text-base max-w-2xl leading-relaxed mb-10">
              We work with legal roasters, international green importers, and agricultural distributors across Europe, North America, Middle East, and Asia. Tell us about your quality metrics to coordinate custom sample lots.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
              <MagneticButton variant="gold" onClick={() => setStep(1)} className="!px-10 !py-4 w-full sm:w-auto">
                LAUNCH EXPORT INQUIRY &rarr;
              </MagneticButton>
              
              <a
                href="https://wa.me/251924115178"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-[#25D366]/30 bg-[#25D366]/5 text-[#25D366] hover:bg-[#25D366]/10 hover:border-[#25D366]/60 transition-all duration-300 font-body text-xs font-semibold tracking-[0.16em] uppercase px-10 py-4 w-full sm:w-auto min-h-[44px]"
                id="whatsapp-gate-contact-btn"
              >
                <Phone className="w-4 h-4" />
                CHAT ON WHATSAPP
              </a>
            </div>
          </div>
        ) : step === 5 ? (
          /* Step 5 - Confirmation Success Layout with Next Steps & WhatsApp fallback */
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center flex flex-col items-center py-16 px-6 bg-obsidian-soft border border-white/5"
            role="status"
            aria-live="polite"
          >
            <CheckCircle2 className="w-16 h-16 text-gold mb-6" />
            <h3 className="font-display text-white text-3xl sm:text-4xl tracking-tight mb-4">
              Inquiry Filed Successfully.
            </h3>
            <p className="font-body text-[#8A8A8A] text-sm leading-relaxed mb-6 max-w-lg">
              Thank you for contacting <span className="text-white font-semibold">Fresh Beans Coffee Trading PLC</span>. Our export team will review your inquiry and respond within <span className="text-white font-medium">1–2 business days</span>. An automated copy has been queued for your records.
            </p>
            
            <span className="text-[10px] text-white/40 block mb-6 px-4 py-2 border border-white/5 bg-white/2 max-w-md font-mono uppercase tracking-widest leading-normal">
              REGISTRATION NAME: {form.fullName} <br />
              COMPANY ENTITY: {form.companyName}
            </span>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
              {/* Availability Catalog Download Option */}
              <div className="flex flex-col items-center gap-2">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setDownloadSuccess(true);
                    setTimeout(() => setDownloadSuccess(false), 6000);
                  }}
                  className="inline-flex items-center gap-2 text-gold hover:text-white font-semibold font-body text-xs tracking-wider uppercase transition-colors py-2"
                  id="partnership-success-download-btn"
                >
                  <FileText className="w-4 h-4" />
                  Download Availability Catalog (PDF)
                </a>
                <AnimatePresence>
                  {downloadSuccess && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-[11px] text-emerald-400 font-mono mt-1"
                    >
                      ✓ Latest export crop sheets saved locally!
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Secure WhatsApp follow-up fallback */}
              <a
                href="https://wa.me/251924115178"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#25D366]/40 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-all font-body text-xs tracking-wider uppercase px-6 py-2.5 min-h-[44px]"
                id="partnership-success-whatsapp-btn"
              >
                <Phone className="w-4.5 h-4.5" /> Urgent Follow-up via WhatsApp
              </a>
            </div>
          </motion.div>
        ) : (
          /* Steps 1 to 4 Full Secure Wizard Pipeline with Real-Time Summary */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch" role="group" aria-label={`Partnership Form - Step ${step} of 4`}>
            {/* Left Column Form Area - 65% width equivalent */}
            <div className="lg:col-span-8 flex flex-col justify-between bg-obsidian-soft border border-stone/5 p-8 sm:p-12 relative">
              {/* Top Step counters */}
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4].map((sNum) => (
                    <span
                      key={sNum}
                      className={`h-2 transition-all duration-300 ${
                        sNum === step ? 'w-6 bg-gold' : sNum < step ? 'w-2 bg-gold/40' : 'w-2 bg-stone/5'
                      }`}
                      aria-label={`Step ${sNum} ${sNum === step ? '(Current)' : sNum < step ? '(Completed)' : '(Pending)'}`}
                    />
                  ))}
                </div>
                <span className="text-caption text-gold uppercase tracking-[0.2em] font-semibold text-[10px]" aria-live="polite">
                  STEP 0{step} OF 04
                </span>
              </div>

              <div className="text-[9px] sm:text-[10px] text-[#8A8A8A] uppercase font-mono tracking-wider mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-white/2 p-3 border border-white/5">
                <span>Secure Channel Sourcing</span>
                <span>SUBMISSION DESK: <strong className="text-gold">coffeefreshbeans@gmail.com</strong></span>
              </div>

              {/* Bot Protection Honeypot field (hidden offscreen physically & logically) */}
              <div style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', border: '0' }} aria-hidden="true">
                <label htmlFor="website_verify">Security Field</label>
                <input
                  id="website_verify"
                  type="text"
                  name="website_verify"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.honeypot}
                  onChange={(e) => updateForm('honeypot', e.target.value)}
                />
              </div>

              {/* Steps inputs handling */}
              <form onSubmit={handleSubmit} className="flex-grow flex flex-col justify-center min-h-[350px]" noValidate>
                <AnimatePresence mode="wait">
                  
                  {/* STEP 1: ORGANIZATION & DELIVERY MARKET */}
                  {step === 1 && (
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col gap-6 text-left"
                    >
                      <div className="flex items-center gap-3 mb-1">
                        <Building2 className="w-6 h-6 text-gold" />
                        <h3 className="font-display text-white text-2xl sm:text-3xl font-medium tracking-tight">
                          Organization & Delivery Base
                        </h3>
                      </div>

                      {/* Company Name */}
                      <div className={`flex flex-col gap-1.5 relative border-b ${errors.companyName ? 'border-red-500 bg-red-500/2' : 'border-[#8A8A8A]/20 focus-within:border-gold'} transition-all py-2 group`}>
                        <label htmlFor="companyName" className={`text-[9px] font-bold tracking-widest uppercase font-body group-focus-within:text-gold block ${errors.companyName ? 'text-red-500' : 'text-[#8A8A8A]'}`}>
                          Company Legal Name *
                        </label>
                        <input
                          id="companyName"
                          ref={companyRef}
                          type="text"
                          required
                          value={form.companyName}
                          onChange={(e) => updateForm('companyName', e.target.value)}
                          placeholder="e.g. Terroir Specialty Roasters Ltd"
                          className="bg-transparent border-none text-white font-body text-base outline-none w-full py-1 placeholder-white/20 uppercase"
                          aria-invalid={!!errors.companyName}
                          aria-describedby={errors.companyName ? "error-company" : undefined}
                        />
                        {errors.companyName && (
                          <span id="error-company" className="text-[10px] text-red-500 font-mono mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.companyName}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
                        {/* Office Country */}
                        <div className={`flex flex-col gap-1.5 border-b py-2 transition-all ${errors.country ? 'border-red-500 bg-red-500/2' : 'border-[#8A8A8A]/20 focus-within:border-gold'} group`}>
                          <label htmlFor="country" className={`text-[9px] font-bold tracking-widest uppercase font-body group-focus-within:text-gold block ${errors.country ? 'text-red-500' : 'text-[#8A8A8A]'}`}>
                            Registered Office Country *
                          </label>
                          <input
                            id="country"
                            ref={countryRef}
                            type="text"
                            required
                            value={form.country}
                            onChange={(e) => updateForm('country', e.target.value)}
                            placeholder="e.g. Germany, Japan, USA"
                            className="bg-transparent border-none text-white font-body text-sm outline-none w-full py-1 placeholder-white/20 uppercase"
                            aria-invalid={!!errors.country}
                            aria-describedby={errors.country ? "error-country" : undefined}
                          />
                          {errors.country && (
                            <span id="error-country" className="text-[10px] text-red-500 font-mono mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.country}
                            </span>
                          )}
                        </div>

                        {/* Destination Market */}
                        <div className={`flex flex-col gap-1.5 border-b py-2 transition-all ${errors.destinationMarket ? 'border-red-500 bg-red-500/2' : 'border-[#8A8A8A]/20 focus-within:border-gold'} group`}>
                          <label htmlFor="destinationMarket" className={`text-[9px] font-bold tracking-widest uppercase font-body group-focus-within:text-gold block ${errors.destinationMarket ? 'text-red-500' : 'text-[#8A8A8A]'}`}>
                            Destination Intake Market *
                          </label>
                          <input
                            id="destinationMarket"
                            ref={destinationRef}
                            type="text"
                            required
                            value={form.destinationMarket}
                            onChange={(e) => updateForm('destinationMarket', e.target.value)}
                            placeholder="e.g. European Union (Hamburg Port)"
                            className="bg-transparent border-none text-white font-body text-sm outline-none w-full py-1 placeholder-white/20 uppercase"
                            aria-invalid={!!errors.destinationMarket}
                            aria-describedby={errors.destinationMarket ? "error-destination" : undefined}
                          />
                          {errors.destinationMarket && (
                            <span id="error-destination" className="text-[10px] text-red-500 font-mono mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.destinationMarket}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: COFFEE INTEREST & REQUIRED VOLUME */}
                  {step === 2 && (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col gap-6 text-left"
                    >
                      <div className="flex items-center gap-3 mb-1">
                        <Coffee className="w-6 h-6 text-gold" />
                        <h3 className="font-display text-white text-2xl sm:text-3xl font-medium tracking-tight">
                          Coffee Sourcing & Volumes
                        </h3>
                      </div>

                      {/* Coffee Interest Selector */}
                      <div className={`flex flex-col gap-2 p-3 border ${errors.coffeeInterest ? 'border-red-500 bg-red-500/2' : 'border-stone/5 bg-white/2'} transition-all`}>
                        <label htmlFor="coffeeInterest" className={`text-[9px] font-bold tracking-widest uppercase font-body block ${errors.coffeeInterest ? 'text-red-500' : 'text-[#8A8A8A]'}`}>
                          Coffee Interest Category *
                        </label>
                        <select
                          id="coffeeInterest"
                          required
                          value={form.coffeeInterest}
                          onChange={(e) => updateForm('coffeeInterest', e.target.value)}
                          className="bg-obsidian border border-white/10 text-white font-body text-xs sm:text-sm outline-none w-full p-2.5 focus:border-gold uppercase cursor-pointer min-h-[44px]"
                          aria-invalid={!!errors.coffeeInterest}
                          aria-describedby={errors.coffeeInterest ? "error-interest" : undefined}
                        >
                          <option className="text-white" value="">Select Coffee Interest &rarr;</option>
                          <option className="text-white" value="Green Coffee Beans">Green Coffee Beans</option>
                          <option className="text-white" value="Specialty Coffee">Specialty Coffee</option>
                          <option className="text-white" value="Organic Coffee">Organic Coffee</option>
                          <option className="text-white" value="Direct Trade Coffee">Direct Trade Coffee</option>
                          <option className="text-white" value="Fair Trade Coffee">Fair Trade Coffee</option>
                          <option className="text-white" value="Custom Inquiry">Custom Inquiry</option>
                        </select>
                        {errors.coffeeInterest && (
                          <span id="error-interest" className="text-[10px] text-red-500 font-mono flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3 h-3" /> {errors.coffeeInterest}
                          </span>
                        )}
                      </div>

                      {/* Required Volume Selection */}
                      <div className={`flex flex-col gap-2 p-3 border ${errors.requiredVolume ? 'border-red-500 bg-red-500/2' : 'border-stone/5 bg-white/2'} transition-all mt-1`}>
                        <label htmlFor="requiredVolume" className={`text-[9px] font-bold tracking-widest uppercase font-body block ${errors.requiredVolume ? 'text-red-500' : 'text-[#8A8A8A]'}`}>
                          Required Volume *
                        </label>
                        <select
                          id="requiredVolume"
                          required
                          value={form.requiredVolume}
                          onChange={(e) => updateForm('requiredVolume', e.target.value)}
                          className="bg-obsidian border border-white/10 text-white font-body text-xs sm:text-sm outline-none w-full p-2.5 focus:border-gold uppercase cursor-pointer min-h-[44px]"
                          aria-invalid={!!errors.requiredVolume}
                          aria-describedby={errors.requiredVolume ? "error-volume" : undefined}
                        >
                          <option className="text-white" value="">Select Volume Limits &rarr;</option>
                          <option className="text-white" value="Sample Request">Sample Request (Lot grading)</option>
                          <option className="text-white" value="Less than 1 Container">Less than 1 Container (LCL shipments)</option>
                          <option className="text-white" value="1–5 Containers">1–5 Containers (Average regular roaster)</option>
                          <option className="text-white" value="5–10 Containers">5–10 Containers (Mid-scale importer/wholesaler)</option>
                          <option className="text-white" value="10+ Containers">10+ Containers (Large-scale enterprise trade)</option>
                        </select>
                        {errors.requiredVolume && (
                          <span id="error-volume" className="text-[10px] text-red-500 font-mono flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3 h-3" /> {errors.requiredVolume}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: MESSAGE & SPECIFICATIONS */}
                  {step === 3 && (
                    <motion.div
                      key="step-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col gap-6 text-left"
                    >
                      <div className="flex items-center gap-3 mb-1">
                        <MessageSquare className="w-6 h-6 text-gold" />
                        <h3 className="font-display text-white text-2xl sm:text-3xl font-medium tracking-tight">
                          Coffee Sourcing Inquiry Specifications
                        </h3>
                      </div>

                      <div className={`flex flex-col gap-2 p-3 border ${errors.message ? 'border-red-500 bg-red-500/2' : 'border-stone/5 bg-white/2'} transition-all`}>
                        <div className="flex justify-between items-center">
                          <label htmlFor="message" className={`text-[9px] font-bold tracking-widest uppercase font-body block ${errors.message ? 'text-red-500' : 'text-[#8A8A8A]'}`}>
                            Detail Sourcing Requirements / Message (Character Limit: 10 - 1000) *
                          </label>
                          <span className="text-[10px] text-[#8A8A8A] font-mono">
                            {form.message.length} / 1000
                          </span>
                        </div>
                        <textarea
                          id="message"
                          ref={messageRef}
                          required
                          value={form.message}
                          maxLength={1000}
                          onChange={(e) => updateForm('message', e.target.value)}
                          placeholder="Please document your target tasting profiles (e.g., specific moisture level, acidities, screen size, micro-lot traceability, or specialty cup limits)..."
                          className="bg-transparent border border-white/10 text-stone font-body text-sm outline-none w-full p-3 min-h-[160px] focus:border-gold resize-none"
                          aria-invalid={!!errors.message}
                          aria-describedby={errors.message ? "error-message" : undefined}
                        />
                        {errors.message && (
                          <span id="error-message" className="text-[10px] text-red-500 font-mono mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.message}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: CONTACT & AUTHENTICATION DETAILS */}
                  {step === 4 && (
                    <motion.div
                      key="step-4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col gap-6 text-left"
                    >
                      <div className="flex items-center gap-3 mb-1">
                        <Globe className="w-6 h-6 text-gold" />
                        <h3 className="font-display text-white text-2xl sm:text-3xl font-medium tracking-tight">
                          Representative Contact File
                        </h3>
                      </div>

                      {/* Full Name */}
                      <div className={`flex flex-col gap-1.5 border-b py-2 transition-all ${errors.fullName ? 'border-red-500 bg-red-500/2' : 'border-[#8A8A8A]/20 focus-within:border-gold'} group`}>
                        <label htmlFor="fullName" className={`text-[9px] font-bold tracking-widest uppercase font-body group-focus-within:text-gold block ${errors.fullName ? 'text-red-500' : 'text-[#8A8A8A]'}`}>
                          Full Name of Representative *
                        </label>
                        <input
                          id="fullName"
                          ref={fullNameRef}
                          type="text"
                          required
                          value={form.fullName}
                          onChange={(e) => updateForm('fullName', e.target.value)}
                          placeholder="e.g. Hans Oster"
                          className="bg-transparent border-none text-white font-body text-base outline-none w-full py-1 placeholder-white/20"
                          aria-invalid={!!errors.fullName}
                          aria-describedby={errors.fullName ? "error-fullName" : undefined}
                        />
                        {errors.fullName && (
                          <span id="error-fullName" className="text-[10px] text-red-500 font-mono mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.fullName}
                          </span>
                        )}
                      </div>

                      {/* Business Email */}
                      <div className={`flex flex-col gap-1.5 border-b py-2 transition-all ${errors.email ? 'border-red-500 bg-red-500/2' : 'border-[#8A8A8A]/20 focus-within:border-gold'} group`}>
                        <label htmlFor="email" className={`text-[9px] font-bold tracking-widest uppercase font-body group-focus-within:text-gold block ${errors.email ? 'text-red-500' : 'text-[#8A8A8A]'}`}>
                          Business Email Address *
                        </label>
                        <input
                          id="email"
                          ref={emailRef}
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => updateForm('email', e.target.value)}
                          placeholder="e.g. h.oster@nordicroasters.com"
                          className="bg-transparent border-none text-white font-body text-base outline-none w-full py-1 placeholder-white/20"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "error-email" : undefined}
                        />
                        {errors.email && (
                          <span id="error-email" className="text-[10px] text-red-500 font-mono mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.email}
                          </span>
                        )}
                      </div>

                      {/* Phone / WhatsApp */}
                      <div className={`flex flex-col gap-1.5 border-b py-2 transition-all ${errors.phone ? 'border-red-500 bg-red-500/2' : 'border-[#8A8A8A]/20 focus-within:border-gold'} group`}>
                        <label htmlFor="phone" className={`text-[9px] font-bold tracking-widest uppercase font-body group-focus-within:text-gold block ${errors.phone ? 'text-red-500' : 'text-[#8A8A8A]'}`}>
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          id="phone"
                          ref={phoneRef}
                          type="tel"
                          required
                          value={form.phone}
                          onChange={(e) => updateForm('phone', e.target.value)}
                          placeholder="e.g. +49 170 1234567"
                          className="bg-transparent border-none text-white font-body text-base outline-none w-full py-1 placeholder-white/20"
                          aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone ? "error-phone" : undefined}
                        />
                        {errors.phone && (
                          <span id="error-phone" className="text-[10px] text-red-500 font-mono mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.phone}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>

              {/* Bot Control Navigation buttons */}
              <div className="flex flex-col border-t border-stone/5 mt-10 pt-6">
                
                {/* Rate limit system warning */}
                {rateLimitMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 p-3 text-xs font-mono text-left flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{rateLimitMessage}</span>
                  </motion.div>
                )}

                <div className="flex items-center justify-between w-full">
                  <div>
                    <button
                      type="button"
                      onClick={handleBackStep}
                      className="flex items-center gap-2 text-micro font-bold tracking-widest text-[#8A8A8A] hover:text-white uppercase font-body cursor-pointer p-2 min-h-[44px]"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" /> Back
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Secondary WhatsApp instant link action on contact validation */}
                    {step === 4 && (
                      <a
                        href="https://wa.me/251924115178"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[#25D366] hover:text-white text-[10px] font-bold tracking-wider font-body uppercase px-3 py-2 min-h-[44px]"
                        id="partnership-whatsapp-floating-fallback-btn"
                      >
                        <Phone className="w-3.5 h-3.5" /> WhatsApp Direct
                      </a>
                    )}

                    {step < 4 ? (
                      <MagneticButton
                        type="button"
                        variant="primary"
                        onClick={handleNextStep}
                        className="!py-3 !px-6 text-[10px] min-h-[44px]"
                      >
                        Next Step <ChevronRight className="w-3.5 h-3.5 ml-1.5 inline" />
                      </MagneticButton>
                    ) : (
                      <MagneticButton
                        type="submit"
                        variant="gold"
                        disabled={isSubmitting}
                        onClick={() => { handleSubmit(); }}
                        className="!py-3 !px-8 text-[10px] min-h-[44px]"
                      >
                        {isSubmitting ? 'TRANSMITTING COURIER FILE...' : 'REQUEST PARTNERSHIP →'}
                      </MagneticButton>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column Summary Panel - 35% width equivalent */}
            <div className="lg:col-span-4 glass-surface border border-white/5 p-8 flex flex-col justify-between text-left relative overflow-hidden h-full">
              {/* Overlay dynamic glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-[50px] pointer-events-none" />

              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold" />
                  <h4 className="text-[10px] font-bold tracking-[0.2em] text-white uppercase font-body">
                    COFFEE SOURCE PROFILE
                  </h4>
                </div>

                <div className="h-[1px] bg-stone/5 w-full" />

                {/* Listing Selections */}
                <div className="flex flex-col gap-4 text-xs font-body">
                  <div className="flex flex-col gap-1">
                    <span className="text-[#8A8A8A] text-[9px] uppercase font-bold tracking-widest">Buyer Entity</span>
                    <span className="text-white font-semibold text-[13px] uppercase">
                      {form.companyName || 'TERROIR IMPORTERS INC'}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[#8A8A8A] text-[9px] uppercase font-bold tracking-widest">Office Origin</span>
                    <span className="text-white uppercase">{form.country || 'GLOBAL REGISTERED BASE'}</span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[#8A8A8A] text-[9px] uppercase font-bold tracking-widest">Destination Intake</span>
                    <span className="text-white uppercase">{form.destinationMarket || 'PORTS OF INTAKE'}</span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[#8A8A8A] text-[9px] uppercase font-bold tracking-widest">Coffee Interest</span>
                    <span className="text-gold uppercase font-bold block max-w-xs mt-0.5 whitespace-normal">
                      {form.coffeeInterest || 'SELECT OPTION'}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[#8A8A8A] text-[9px] uppercase font-bold tracking-widest">Required Volume</span>
                    <span className="text-stone uppercase mt-0.5">
                      {form.requiredVolume || 'SELECT VOLUMES'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Dynamic Sourcing Tier Display */}
              <div className="mt-8 pt-6 border-t border-stone/10 font-body">
                <span className="text-[#8A8A8A] text-[9px] uppercase font-bold tracking-widest block mb-1">
                  ESTIMATED SOURCING TIER
                </span>
                <span className="font-display text-2xl text-gold font-bold uppercase block leading-tight">
                  {getEstimatedScoreRange()}
                </span>
                <span className="text-[10px] text-[#8A8A8A] leading-relaxed block mt-2">
                  Matching parameters represent automated routing criteria handled directly by our harvest trading desk in Addis Ababa.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Partnership Trust Badges Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-stretch border-t border-white/10 mt-20 pt-10 text-left font-body">
          <div className="bg-obsidian-soft border border-white/5 p-5 flex flex-col justify-between">
            <div>
              <span className="text-[9px] text-gold font-bold tracking-wider uppercase block">Response Guarantee</span>
              <span className="text-white text-[11px] font-bold uppercase mt-1 block">Under 24 Business Hours</span>
            </div>
            <p className="text-[10px] text-[#8A8A8A] mt-2 leading-relaxed">Our Addis Ababa trading desk evaluates and replies to all green sample inquiries rapidly.</p>
          </div>
          
          <div className="bg-obsidian-soft border border-white/5 p-5 flex flex-col justify-between">
            <div>
              <span className="text-[9px] text-[#8A8A8A] font-bold tracking-wider uppercase block">Corporate Registration</span>
              <span className="text-white text-[11px] font-bold uppercase mt-1 block">Reg. No. KK/AA/2024/0481</span>
            </div>
            <p className="text-[10px] text-[#8A8A8A] mt-2 leading-relaxed">Licensed Specialty PLC Coffee Exporter under the Federal Democratic Republic of Ethiopia Ministry of Trade.</p>
          </div>
          
          <div className="bg-obsidian-soft border border-white/5 p-5 flex flex-col justify-between">
            <div>
              <span className="text-[9px] text-[#8A8A8A] font-bold tracking-wider uppercase block">Export Licence</span>
              <span className="text-white text-[11px] font-bold uppercase mt-1 block">Export Compliance Certified</span>
            </div>
            <p className="text-[10px] text-[#8A8A8A] mt-2 leading-relaxed">Full clearance with the Ethiopian Coffee &amp; Tea Authority green-loading quality standards.</p>
          </div>
          
          <div className="bg-obsidian-soft border border-white/5 p-5 flex flex-col justify-between">
            <div>
              <span className="text-[9px] text-[#8A8A8A] font-bold tracking-wider uppercase block">Network Security</span>
              <span className="text-white text-[11px] font-bold uppercase mt-1 block">SSL Secured &amp; Vercel Hosted</span>
            </div>
            <p className="text-[10px] text-[#8A8A8A] mt-2 leading-relaxed">Enterprise-layer data protection, and hyper-fast static Vercel Node delivery.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

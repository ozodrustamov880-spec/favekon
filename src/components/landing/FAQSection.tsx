import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'What is a favicon and why is it essential for my site?',
    answer:
      'A favicon (short for "favorite icon") is the small icon displayed next to your website title in browser tabs, bookmarks, history, and search engine results. It establishes trust, reinforces brand recall, and helps users quickly identify your tab among dozens of open browser windows.',
  },
  {
    question: 'Why do I need both favicon.ico and PNG files?',
    answer:
      'Classic Windows shortcuts, legacy browsers, and automated bots look specifically for the root /favicon.ico file. Modern mobile browsers (iOS Safari, Android Chrome) and high-density Retina displays require specific PNG sizes (like 180×180 and 192×192) for sharp home screen bookmarks and web app shortcuts. IconForge packages both so you are 100% covered.',
  },
  {
    question: 'How do I add the generated files to Next.js, Vite, or WordPress?',
    answer:
      'For Next.js (App Router or Pages Router) and Vite/React, simply place all generated files into your public/ folder. Then copy the HTML <head> snippet into your RootLayout or index.html. For WordPress, upload the icon via Customizer > Site Identity or place files in your active theme root directory.',
  },
  {
    question: 'Are my uploaded logos or pictures sent to a remote server?',
    answer:
      'No! Privacy and speed are top priorities. IconForge executes all image resizing, SVG sanitization, and ICO binary encoding directly inside your browser via the HTML5 Canvas API and Web Workers. Your images never leave your local device.',
  },
  {
    question: 'Why does my browser still show the old favicon after uploading?',
    answer:
      'Browsers cache favicons very aggressively to save bandwidth. To force an immediate refresh, do a hard refresh using Ctrl + F5 (Windows) or Cmd + Shift + R (Mac), or test your website in an Incognito / Private Browsing window.',
  },
  {
    question: 'What is site.webmanifest and why is it included?',
    answer:
      'site.webmanifest is a JSON file required by Android Chrome and Progressive Web Apps (PWAs). It tells the mobile operating system what icon to display on the user home screen, what color the status bar should be, and whether the web app should open full-screen.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 border-t border-slate-200/70 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200 dark:border-brand-900 mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Everything you need to know about favicon specifications, installation, and browser compatibility.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-semibold text-sm text-slate-800 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-brand-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


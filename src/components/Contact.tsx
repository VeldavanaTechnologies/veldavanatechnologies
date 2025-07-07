'use client';

import { Mail, Phone } from 'lucide-react';

export function Contact() {
  // Removed unused form state and handlers

  return (
    <section id="contact" className="relative py-20 bg-gradient-to-b from-black to-gray-900 overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 flex flex-col items-center">
        <div className="text-center mb-16 flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-center">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-center leading-relaxed">
            Whether you have a question or just want to say hello, we&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start w-full max-w-6xl mx-auto">
          <div className="space-y-12">
            <div className="text-gray-300 flex items-start gap-4">
              <Mail size={32} className="text-purple-400" />
              <div>
                <h3 className="text-xl font-bold">Email Us</h3>
                <p>veldavanatechnologies@gmail.com</p>
              </div>
            </div>
            <div className="text-gray-300 flex items-start gap-4">
              <Phone size={32} className="text-blue-400" />
              <div>
                <h3 className="text-xl font-bold">Call Us</h3>
                <p>+91 9733447070</p>
                <p>+91 7338157404</p>
              </div>
            </div>
          </div>
        </div>

      {/* Embedded Google Form for Get In Touch - now at the very bottom */}
      <div className="w-full flex justify-center items-center mt-16">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSemK4SI8cW4hNm7nDR43wmtki54IyfFAGMVDpNq8HDcrIEoSw/viewform?embedded=true"
          width="100%"
          height="700"
          style={{
            borderRadius: '18px',
            filter: 'drop-shadow(0 6px 48px rgba(124,58,237,0.18))',
            background: 'rgba(30, 27, 75, 0.10)',
            border: 'none',
            maxWidth: '900px',
            minWidth: '0',
            margin: '0 auto',
            display: 'block',
            boxSizing: 'border-box',
            aspectRatio: '16/9',
          }}
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          title="Get In Touch Google Form"
          allowFullScreen
        >
          Loading…
        </iframe>
      </div>
      </div>
    </section>
  );
}

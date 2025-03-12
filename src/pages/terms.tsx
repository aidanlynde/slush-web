import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';

export default function TermsPage() {
  return (
    <Layout>
      <section className="bg-gradient-to-r from-blue-500 to-orange-500">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Terms of Service
            </motion.h1>
            <motion.p 
              className="max-w-xl mt-5 mx-auto text-xl text-white opacity-90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Please read these terms carefully before using the Slush app.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-gray-50 rounded-lg p-8 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-3">
                Welcome to Slush. These Terms of Service ("Terms") govern your access to and use of the Slush website, mobile applications, and services ("Services"). By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Definitions</h2>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>"Company", "We", "Us", "Our" refers to Slush, the owner and operator of this application.</li>
                <li>"User", "You", "Your" refers to the individual accessing or using our Services.</li>
                <li>"Content" refers to any information, text, graphics, photos, or other materials uploaded, downloaded, or appearing on our Services.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Account Registration</h2>
              <p className="text-gray-700 mb-3">
                To access certain features of our Services, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
              </p>
              <p className="text-gray-700 mb-3">
                You are responsible for safeguarding your password and for all activities that occur under your account. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Content</h2>
              <p className="text-gray-700 mb-3">
                Our Services may allow you to post, link, store, share, and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the Content that you post on or through our Services, including its legality, reliability, and appropriateness.
              </p>
              <p className="text-gray-700 mb-3">
                By posting Content on or through our Services, you represent and warrant that:
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>The Content is yours and/or you have the right to use it and the right to grant us the rights and license as provided in these Terms.</li>
                <li>The posting of your Content on or through our Services does not violate the privacy rights, publicity rights, copyrights, contract rights, or any other rights of any person.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property</h2>
              <p className="text-gray-700 mb-3">
                Our Services and its original content, features, and functionality are and will remain the exclusive property of Slush and its licensors. Our Services are protected by copyright, trademark, and other laws of both the United States and foreign countries.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Prohibited Uses</h2>
              <p className="text-gray-700 mb-3">
                You may use our Services only for lawful purposes and in accordance with these Terms. You agree not to use our Services:
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
                <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.</li>
                <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter", "spam", or any other similar solicitation.</li>
                <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity.</li>
                <li>In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Third-Party Links</h2>
              <p className="text-gray-700 mb-3">
                Our Services may contain links to third-party websites or services that are not owned or controlled by Slush. The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Termination</h2>
              <p className="text-gray-700 mb-3">
                We may terminate or suspend your account and bar access to our Services immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-700 mb-3">
                In no event shall Slush, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Your access to or use of or inability to access or use our Services;</li>
                <li>Any conduct or content of any third party on our Services;</li>
                <li>Any content obtained from our Services; and</li>
                <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Governing Law</h2>
              <p className="text-gray-700 mb-3">
                These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
              <p className="text-gray-700 mb-3">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
              <p className="text-gray-700 mb-3">
                If you have any questions about these Terms, please contact us at <a href="mailto:slushcustomerservice@gmail.com" className="text-orange-500 hover:underline">slushcustomerservice@gmail.com</a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Disclaimer</h2>
              <p className="text-gray-700 mb-3">
                THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. SLUSH DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Agreement to Terms</h2>
              <p className="text-gray-700 mb-3">
                By using our Services, you acknowledge that you have read and understood these Terms and agree to be bound by them.
              </p>
            </section>

            <div className="mt-8 text-sm text-gray-500">
              Last Updated: March 12, 2025
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
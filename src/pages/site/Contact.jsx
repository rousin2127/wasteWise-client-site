import React, { useState } from 'react';
import PageBanner from '../../components/shared/PageBanner';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div>
      <PageBanner title="Contact Us" subtitle="Have questions? We'd love to hear from you." />
      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Get in Touch</h2>
            <p className="text-slate-600 mt-2">Reach out for support, partnership, or collector enrollment.</p>
          </div>

          {[
            { icon: '📍', title: 'Address', value: 'Dhaka, Bangladesh' },
            { icon: '📧', title: 'Email', value: 'support@wastewise.com' },
            { icon: '📞', title: 'Phone', value: '+880 1700-000000' },
            { icon: '🕐', title: 'Hours', value: 'Sat–Thu, 9AM – 6PM' },
          ].map((item) => (
            <div key={item.title} className="flex gap-4 items-start">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="font-semibold text-slate-800">{item.title}</p>
                <p className="text-slate-600">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-4">
          <h3 className="font-bold text-lg text-slate-800">Send a Message</h3>
          {sent && <p className="text-sm text-emerald-600 bg-emerald-50 p-3 rounded-lg">Message sent! We&apos;ll get back to you soon.</p>}
          <input
            className="input input-bordered w-full"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            className="input input-bordered w-full"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            className="input input-bordered w-full"
            placeholder="Subject"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            required
          />
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Your message"
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />
          <button type="submit" className="btn w-full bg-emerald-500 hover:bg-emerald-600 text-white border-0">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
